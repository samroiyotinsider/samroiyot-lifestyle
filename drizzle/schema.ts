import { integer, text, timestamp, varchar, pgTable, pgEnum } from "drizzle-orm/pg-core";

/**
 * Core user table backing simple password auth (no OAuth).
 * Extend this file with additional tables as your product grows.
 */
export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: varchar("username", { length: 64 }).notNull().unique(),
  email: varchar("email", { length: 320 }),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(), // bcrypt hash
  role: varchar("role", { length: 20 }).default("user").notNull(), // "user" or "admin"
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Property listings table
 */
export const properties = pgTable("properties", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  titleTh: varchar("titleTh", { length: 255 }),
  description: text("description").notNull(),
  descriptionTh: text("descriptionTh"),
  propertyType: varchar("propertyType", { length: 50 }).notNull(), // "condo", "house", "villa", "land"
  price: integer("price").notNull(), // Price in THB
  priceUsd: integer("priceUsd"), // Price in USD for convenience
  priceEur: integer("priceEur"), // Price in EUR
  sizeSqm: integer("sizeSqm"), // Size in square meters
  sizeRai: varchar("sizeRai", { length: 50 }), // For land: "1 Rai 2 Ngan 41 sq.wah"
  bedrooms: integer("bedrooms"),
  bathrooms: varchar("bathrooms", { length: 10 }), // Store as string to support decimals like "2.5"
  // Features as JSON array: ["seaView", "beachfront", "pool", "mountainView", "renovated", "furnished"]
  features: text("features").notNull(),
  // Images as JSON array of URLs
  images: text("images").notNull(),
  videoUrl: varchar("videoUrl", { length: 500 }),
  latitude: varchar("latitude", { length: 50 }),
  longitude: varchar("longitude", { length: 50 }),
  address: text("address"),
  addressTh: text("addressTh"),
  fazwazUrl: varchar("fazwazUrl", { length: 500 }),
  status: varchar("status", { length: 50 }).default("available").notNull(), // "available", "sold", "pending"
  listingType: varchar("listingType", { length: 50 }).default("sale").notNull(), // "sale", "rent"
  featured: integer("featured").default(0).notNull(), // 1 for featured, 0 for normal
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Property = typeof properties.$inferSelect;
export type InsertProperty = typeof properties.$inferInsert;

/**
 * Property inquiries and lead capture
 */
export const inquiries = pgTable("inquiries", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  propertyId: integer("propertyId"), // NULL for general inquiries
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  message: text("message").notNull(),
  inquiryType: varchar("inquiryType", { length: 50 }).notNull(), // "property", "concierge", "general"
  status: varchar("status", { length: 50 }).default("new").notNull(), // "new", "contacted", "closed"
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = typeof inquiries.$inferInsert;

/**
 * Lifestyle content articles
 */
export const lifestyleArticles = pgTable("lifestyleArticles", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  titleTh: varchar("titleTh", { length: 255 }),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  excerptTh: text("excerptTh"),
  content: text("content").notNull(),
  contentTh: text("contentTh"),
  coverImage: varchar("coverImage", { length: 500 }),
  category: varchar("category", { length: 100 }),
  published: integer("published").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type LifestyleArticle = typeof lifestyleArticles.$inferSelect;
export type InsertLifestyleArticle = typeof lifestyleArticles.$inferInsert;

/**
 * Events table
 */
export const events = pgTable("events", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  titleTh: varchar("titleTh", { length: 255 }),
  description: text("description"),
  descriptionTh: text("descriptionTh"),
  category: varchar("category", { length: 100 }),
  source: varchar("source", { length: 100 }), // "manual", "facebook", "visitsamroiyot"
  sourceId: varchar("sourceId", { length: 255 }).unique(), // External ID if from scraper
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate"),
  location: varchar("location", { length: 255 }),
  locationTh: varchar("locationTh", { length: 255 }),
  image: varchar("image", { length: 500 }),
  link: varchar("link", { length: 500 }),
  published: integer("published").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

/**
 * Event bookings
 */
export const eventBookings = pgTable("eventBookings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  eventId: integer("eventId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  numberOfAttendees: integer("numberOfAttendees").default(1).notNull(),
  specialRequests: text("specialRequests"),
  status: varchar("status", { length: 50 }).default("pending").notNull(), // "pending", "confirmed", "completed", "cancelled"
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type EventBooking = typeof eventBookings.$inferSelect;
export type InsertEventBooking = typeof eventBookings.$inferInsert;

/**
 * Affiliate links
 */
export const affiliateLinks = pgTable("affiliateLinks", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  eventId: integer("eventId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  commission: varchar("commission", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type AffiliateLink = typeof affiliateLinks.$inferSelect;
export type InsertAffiliateLink = typeof affiliateLinks.$inferInsert;

/**
 * Email leads and subscribers
 */
export const leads = pgTable("leads", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  firstName: varchar("firstName", { length: 100 }),
  lastName: varchar("lastName", { length: 100 }),
  phone: varchar("phone", { length: 50 }),
  interestLevel: varchar("interestLevel", { length: 50 }).default("casual_visitor").notNull(), // "casual_visitor", "serious_buyer", "investor"
  unsubscribeToken: varchar("unsubscribeToken", { length: 255 }).unique(),
  subscribed: integer("subscribed").default(1).notNull(),
  source: varchar("source", { length: 100 }), // "website", "facebook", "referral", etc.
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;
