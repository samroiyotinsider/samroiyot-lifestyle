import { and, desc, eq, gte, lte, like, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users,
  properties, InsertProperty,
  inquiries, InsertInquiry,
  lifestyleArticles, InsertLifestyleArticle,
  events, InsertEvent, Event,
  eventBookings, InsertEventBooking,
  affiliateLinks, InsertAffiliateLink
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Property queries
export async function getAllProperties(filters?: {
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  features?: string[];
  status?: string;
  listingType?: string;
}) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(properties);
  const conditions = [];

  if (filters?.propertyType) {
    conditions.push(eq(properties.propertyType, filters.propertyType as any));
  }
  if (filters?.minPrice) {
    conditions.push(gte(properties.price, filters.minPrice));
  }
  if (filters?.maxPrice) {
    conditions.push(lte(properties.price, filters.maxPrice));
  }
  if (filters?.status) {
    conditions.push(eq(properties.status, filters.status as any));
  }
  if (filters?.listingType) {
    conditions.push(eq(properties.listingType, filters.listingType as any));
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }

  const results = await query.orderBy(desc(properties.featured), desc(properties.createdAt));
  
  // Filter by features in application layer since JSON querying is complex
  if (filters?.features && filters.features.length > 0) {
    return results.filter(prop => {
      const propFeatures = JSON.parse(prop.features || '[]');
      return filters.features!.some(f => propFeatures.includes(f));
    });
  }

  return results;
}

export async function getPropertyById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(properties).where(eq(properties.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getFeaturedProperties(limit = 6) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(properties)
    .where(and(eq(properties.featured, 1), eq(properties.status, 'available')))
    .orderBy(desc(properties.createdAt))
    .limit(limit);
}

export async function createProperty(data: InsertProperty) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(properties).values(data);
  return result;
}

export async function updateProperty(id: number, data: Partial<InsertProperty>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(properties).set(data).where(eq(properties.id, id));
}

export async function deleteProperty(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(properties).where(eq(properties.id, id));
}

// Inquiry queries
export async function createInquiry(data: InsertInquiry) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(inquiries).values(data);
  const insertId = Number(result[0].insertId);
  
  // Fetch and return the created inquiry
  const created = await db.select().from(inquiries).where(eq(inquiries.id, insertId)).limit(1);
  return created[0];
}

export async function getAllInquiries() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
}

export async function getInquiryById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateInquiryStatus(id: number, status: 'new' | 'contacted' | 'closed') {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(inquiries).set({ status }).where(eq(inquiries.id, id));
}

// Lifestyle articles queries
export async function getAllLifestyleArticles(published = true) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(lifestyleArticles);
  
  if (published) {
    query = query.where(eq(lifestyleArticles.published, 1)) as any;
  }

  return query.orderBy(desc(lifestyleArticles.createdAt));
}

export async function getLifestyleArticleBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(lifestyleArticles)
    .where(eq(lifestyleArticles.slug, slug))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createLifestyleArticle(data: InsertLifestyleArticle) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(lifestyleArticles).values(data);
  return result;
}

export async function updateLifestyleArticle(id: number, data: Partial<InsertLifestyleArticle>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(lifestyleArticles).set(data).where(eq(lifestyleArticles.id, id));
}

// Event queries
export async function getAllEvents(filters?: {
  category?: string;
  source?: string;
  published?: boolean;
  startDate?: Date;
  endDate?: Date;
}) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(events);
  const conditions = [];

  if (filters?.category) {
    conditions.push(eq(events.category, filters.category));
  }
  if (filters?.source) {
    conditions.push(eq(events.source, filters.source as any));
  }
  if (filters?.published !== undefined) {
    conditions.push(eq(events.published, filters.published ? 1 : 0));
  }
  if (filters?.startDate) {
    conditions.push(gte(events.startDate, filters.startDate));
  }
  if (filters?.endDate) {
    conditions.push(lte(events.startDate, filters.endDate));
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }

  return query.orderBy(desc(events.startDate));
}

export async function getEventById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(events).where(eq(events.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getEventBySourceId(sourceId: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(events).where(eq(events.sourceId, sourceId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createEvent(data: InsertEvent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(events).values(data);
  return result;
}

export async function updateEvent(id: number, data: Partial<InsertEvent>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(events).set(data).where(eq(events.id, id));
}

export async function deleteEvent(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(events).where(eq(events.id, id));
}

// Event booking queries
export async function createEventBooking(data: InsertEventBooking) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(eventBookings).values(data);
  const insertId = Number(result[0].insertId);
  
  const created = await db.select().from(eventBookings).where(eq(eventBookings.id, insertId)).limit(1);
  return created[0];
}

export async function getEventBookingsByEventId(eventId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(eventBookings).where(eq(eventBookings.eventId, eventId)).orderBy(desc(eventBookings.createdAt));
}

export async function updateEventBookingStatus(id: number, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(eventBookings).set({ status }).where(eq(eventBookings.id, id));
}

// Affiliate link queries
export async function createAffiliateLink(data: InsertAffiliateLink) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(affiliateLinks).values(data);
  return result;
}

export async function getAffiliateLinksByEventId(eventId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(affiliateLinks).where(eq(affiliateLinks.eventId, eventId));
}

export async function updateAffiliateLink(id: number, data: Partial<InsertAffiliateLink>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(affiliateLinks).set(data).where(eq(affiliateLinks.id, id));
}
