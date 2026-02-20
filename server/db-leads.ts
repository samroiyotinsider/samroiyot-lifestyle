import { getDb } from "./db";
import { leads, type Lead, type InsertLead } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

/**
 * Create a new lead from email signup
 */
export async function createLead(email: string, firstName?: string, interestLevel: "casual_visitor" | "serious_buyer" | "investor" = "casual_visitor"): Promise<Lead> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const unsubscribeToken = crypto.randomBytes(32).toString("hex");
  
  await db.insert(leads).values({
    email,
    firstName,
    interestLevel,
    unsubscribeToken,
  });
  
  const created = await getLeadByEmail(email);
  if (!created) throw new Error("Failed to create lead");
  return created;
}

/**
 * Get lead by email
 */
export async function getLeadByEmail(email: string): Promise<Lead | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(leads).where(eq(leads.email, email)).limit(1);
  return result[0];
}

/**
 * Get lead by ID
 */
export async function getLeadById(id: number): Promise<Lead | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return result[0];
}

/**
 * Get all leads (paginated)
 */
export async function getAllLeads(limit: number = 50, offset: number = 0): Promise<Lead[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(leads).limit(limit).offset(offset);
}

/**
 * Get lead count
 */
export async function getLeadCount(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: leads.id }).from(leads);
  return result.length;
}

/**
 * Mark email as sent
 */
export async function markEmailSent(leadId: number, emailNumber: 1 | 2 | 3 | 4): Promise<void> {
  const db = await getDb();
  if (!db) return;
  const fieldName = `email${emailNumber}Sent` as const;
  
  await db.update(leads).set({
    [fieldName]: new Date(),
  }).where(eq(leads.id, leadId));
}

/**
 * Mark email as opened
 */
export async function markEmailOpened(leadId: number, emailNumber: 1 | 2 | 3 | 4): Promise<void> {
  const db = await getDb();
  if (!db) return;
  const fieldName = `email${emailNumber}Opened` as const;
  
  await db.update(leads).set({
    [fieldName]: 1,
  }).where(eq(leads.id, leadId));
}

/**
 * Mark email link as clicked
 */
export async function markEmailLinkClicked(leadId: number, emailNumber: 1 | 2 | 3 | 4): Promise<void> {
  const db = await getDb();
  if (!db) return;
  const fieldName = `email${emailNumber}Clicked` as const;
  
  await db.update(leads).set({
    [fieldName]: 1,
  }).where(eq(leads.id, leadId));
}

/**
 * Mark YouTube link as clicked
 */
export async function markYoutubeClicked(leadId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(leads).set({
    youtubeClicked: 1,
  }).where(eq(leads.id, leadId));
}

/**
 * Mark property inquiry as submitted
 */
export async function markPropertyInquirySubmitted(leadId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(leads).set({
    propertyInquirySubmitted: 1,
  }).where(eq(leads.id, leadId));
}

/**
 * Mark affiliate link as clicked
 */
export async function markAffiliateLinkClicked(leadId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(leads).set({
    affiliateLinkClicked: 1,
  }).where(eq(leads.id, leadId));
}

/**
 * Unsubscribe lead
 */
export async function unsubscribeLead(unsubscribeToken: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  const result = await db.select().from(leads).where(eq(leads.unsubscribeToken, unsubscribeToken)).limit(1);
  
  if (!result[0]) return false;
  
  await db.update(leads).set({
    unsubscribed: 1,
  }).where(eq(leads.unsubscribeToken, unsubscribeToken));
  
  return true;
}

/**
 * Update lead interest level
 */
export async function updateLeadInterestLevel(leadId: number, interestLevel: "casual_visitor" | "serious_buyer" | "investor"): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(leads).set({
    interestLevel,
  }).where(eq(leads.id, leadId));
}

/**
 * Get active leads (not unsubscribed)
 */
export async function getActiveLeads(limit: number = 50, offset: number = 0): Promise<Lead[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(leads).where(eq(leads.unsubscribed, 0)).limit(limit).offset(offset);
}

/**
 * Get leads by interest level
 */
export async function getLeadsByInterestLevel(interestLevel: "casual_visitor" | "serious_buyer" | "investor", limit: number = 50, offset: number = 0): Promise<Lead[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(leads).where(eq(leads.interestLevel, interestLevel)).limit(limit).offset(offset);
}

/**
 * Export leads to CSV format
 */
export async function exportLeadsToCSV(): Promise<string> {
  const db = await getDb();
  if (!db) return "";
  const allLeads = await db.select().from(leads);
  
  const headers = ["ID", "Email", "First Name", "Interest Level", "Email 1 Sent", "Email 1 Opened", "Email 2 Sent", "Email 2 Opened", "Email 3 Sent", "Email 3 Opened", "Email 4 Sent", "Email 4 Opened", "YouTube Clicked", "Property Inquiry", "Affiliate Link Clicked", "Unsubscribed", "Created At"];
  
  const rows = allLeads.map(lead => [
    lead.id,
    lead.email,
    lead.firstName || "",
    lead.interestLevel,
    lead.email1Sent ? "Yes" : "No",
    lead.email1Opened ? "Yes" : "No",
    lead.email2Sent ? "Yes" : "No",
    lead.email2Opened ? "Yes" : "No",
    lead.email3Sent ? "Yes" : "No",
    lead.email3Opened ? "Yes" : "No",
    lead.email4Sent ? "Yes" : "No",
    lead.email4Opened ? "Yes" : "No",
    lead.youtubeClicked ? "Yes" : "No",
    lead.propertyInquirySubmitted ? "Yes" : "No",
    lead.affiliateLinkClicked ? "Yes" : "No",
    lead.unsubscribed ? "Yes" : "No",
    lead.createdAt.toISOString(),
  ]);
  
  const csv = [headers, ...rows].map((row: any[]) => row.map((cell: any) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
  return csv;
}
