import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Property listings table
 */
export const properties = mysqlTable("properties", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleTh: varchar("titleTh", { length: 255 }),
  description: text("description").notNull(),
  descriptionTh: text("descriptionTh"),
  propertyType: mysqlEnum("propertyType", ["condo", "house", "villa", "land"]).notNull(),
  price: int("price").notNull(), // Price in THB
  priceUsd: int("priceUsd"), // Price in USD for convenience
  priceEur: int("priceEur"), // Price in EUR
  sizeSqm: int("sizeSqm"), // Size in square meters
  sizeRai: varchar("sizeRai", { length: 50 }), // For land: "1 Rai 2 Ngan 41 sq.wah"
  bedrooms: int("bedrooms"),
  bathrooms: int("bathrooms"),
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
  status: mysqlEnum("status", ["available", "sold", "pending"]).default("available").notNull(),
  listingType: mysqlEnum("listingType", ["sale", "rent"]).default("sale").notNull(),
  featured: int("featured").default(0).notNull(), // 1 for featured, 0 for normal
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Property = typeof properties.$inferSelect;
export type InsertProperty = typeof properties.$inferInsert;

/**
 * Property inquiries and lead capture
 */
export const inquiries = mysqlTable("inquiries", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId"), // NULL for general inquiries
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  message: text("message").notNull(),
  inquiryType: mysqlEnum("inquiryType", ["property", "concierge", "general"]).notNull(),
  status: mysqlEnum("status", ["new", "contacted", "closed"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = typeof inquiries.$inferInsert;

/**
 * Lifestyle content articles
 */
export const lifestyleArticles = mysqlTable("lifestyleArticles", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleTh: varchar("titleTh", { length: 255 }),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  excerptTh: text("excerptTh"),
  content: text("content").notNull(),
  contentTh: text("contentTh"),
  coverImage: varchar("coverImage", { length: 500 }),
  category: varchar("category", { length: 100 }),
  published: int("published").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LifestyleArticle = typeof lifestyleArticles.$inferSelect;
export type InsertLifestyleArticle = typeof lifestyleArticles.$inferInsert;

/**
 * Events from Visit Sam Roi Yot and local partners
 */
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleTh: varchar("titleTh", { length: 255 }),
  description: text("description"),
  descriptionTh: text("descriptionTh"),
  category: varchar("category", { length: 100 }).notNull(), // Adventure, Day Time, Eating Out, Live Music, Market, Night Time
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate"),
  location: text("location"),
  locationTh: text("locationTh"),
  latitude: varchar("latitude", { length: 50 }),
  longitude: varchar("longitude", { length: 50 }),
  price: int("price"), // Price in THB
  priceUsd: int("priceUsd"), // Price in USD
  organizer: varchar("organizer", { length: 255 }),
  organizerPhone: varchar("organizerPhone", { length: 50 }),
  organizerEmail: varchar("organizerEmail", { length: 320 }),
  youtubeUrl: varchar("youtubeUrl", { length: 500 }), // YouTube video preview
  affiliateLink: varchar("affiliateLink", { length: 500 }), // Affiliate link for booking
  source: mysqlEnum("source", ["visitsamroiyot", "partner", "internal"]).default("internal").notNull(),
  sourceId: varchar("sourceId", { length: 255 }), // ID from original source
  commissionRate: int("commissionRate").default(25).notNull(), // Commission percentage
  bookingUrl: varchar("bookingUrl", { length: 500 }), // URL to book through us
  published: int("published").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastScrapedAt: timestamp("lastScrapedAt"), // Track when we last updated from source
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

/**
 * Event bookings and commission tracking
 */
export const eventBookings = mysqlTable("eventBookings", {
  id: int("id").autoincrement().primaryKey(),
  eventId: int("eventId").notNull(),
  userId: int("userId"), // NULL for non-authenticated bookings
  guestName: varchar("guestName", { length: 255 }).notNull(),
  guestEmail: varchar("guestEmail", { length: 320 }).notNull(),
  guestPhone: varchar("guestPhone", { length: 50 }),
  numberOfGuests: int("numberOfGuests").default(1).notNull(),
  totalPrice: int("totalPrice"), // Total price in THB
  totalPriceUsd: int("totalPriceUsd"), // Total price in USD
  commissionAmount: int("commissionAmount"), // Our commission in THB
  commissionAmountUsd: int("commissionAmountUsd"), // Our commission in USD
  affiliateLinkUsed: int("affiliateLinkUsed").default(0).notNull(), // 1 if booked via affiliate link
  status: mysqlEnum("status", ["pending", "confirmed", "completed", "cancelled"]).default("pending").notNull(),
  bookingReference: varchar("bookingReference", { length: 100 }).unique(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EventBooking = typeof eventBookings.$inferSelect;
export type InsertEventBooking = typeof eventBookings.$inferInsert;

/**
 * Affiliate links and tracking
 */
export const affiliateLinks = mysqlTable("affiliateLinks", {
  id: int("id").autoincrement().primaryKey(),
  eventId: int("eventId"),
  propertyId: int("propertyId"),
  affiliateUrl: varchar("affiliateUrl", { length: 500 }).notNull(),
  affiliateNetwork: varchar("affiliateNetwork", { length: 100 }), // e.g., "booking.com", "airbnb", "custom"
  commissionPercentage: int("commissionPercentage").notNull(),
  clicks: int("clicks").default(0).notNull(),
  conversions: int("conversions").default(0).notNull(),
  revenue: int("revenue").default(0).notNull(), // Revenue in THB
  revenueUsd: int("revenueUsd").default(0).notNull(), // Revenue in USD
  active: int("active").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AffiliateLink = typeof affiliateLinks.$inferSelect;
export type InsertAffiliateLink = typeof affiliateLinks.$inferInsert;

/**
 * Email leads and subscribers from lead magnet
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  firstName: varchar("firstName", { length: 100 }),
  interestLevel: mysqlEnum("interestLevel", ["casual_visitor", "serious_buyer", "investor"]).default("casual_visitor").notNull(),
  unsubscribed: int("unsubscribed").default(0).notNull(),
  unsubscribeToken: varchar("unsubscribeToken", { length: 255 }).unique(),
  
  // Email tracking
  email1Sent: timestamp("email1Sent"),
  email1Opened: int("email1Opened").default(0).notNull(),
  email1Clicked: int("email1Clicked").default(0).notNull(),
  
  email2Sent: timestamp("email2Sent"),
  email2Opened: int("email2Opened").default(0).notNull(),
  email2Clicked: int("email2Clicked").default(0).notNull(),
  
  email3Sent: timestamp("email3Sent"),
  email3Opened: int("email3Opened").default(0).notNull(),
  email3Clicked: int("email3Clicked").default(0).notNull(),
  
  email4Sent: timestamp("email4Sent"),
  email4Opened: int("email4Opened").default(0).notNull(),
  email4Clicked: int("email4Clicked").default(0).notNull(),
  
  // Engagement tracking
  youtubeClicked: int("youtubeClicked").default(0).notNull(),
  propertyInquirySubmitted: int("propertyInquirySubmitted").default(0).notNull(),
  affiliateLinkClicked: int("affiliateLinkClicked").default(0).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;
