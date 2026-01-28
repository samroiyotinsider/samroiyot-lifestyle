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