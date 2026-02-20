import { getDb } from "./db";
import { leads } from "../drizzle/schema";
import { eq, like, and, count } from "drizzle-orm";

/**
 * Get total lead count
 */
export async function getTotalLeads(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;

  const result = await db
    .select({ count: count() })
    .from(leads);

  return result[0]?.count || 0;
}

/**
 * Get leads by interest level
 */
export async function getLeadsByInterestLevel(): Promise<{
  casual_visitor: number;
  serious_buyer: number;
  investor: number;
}> {
  const db = await getDb();
  if (!db) return { casual_visitor: 0, serious_buyer: 0, investor: 0 };

  const result = await db
    .select({
      interestLevel: leads.interestLevel,
      count: count(),
    })
    .from(leads)
    .groupBy(leads.interestLevel);

  const counts = {
    casual_visitor: 0,
    serious_buyer: 0,
    investor: 0,
  };

  result.forEach((row) => {
    counts[row.interestLevel as keyof typeof counts] = row.count;
  });

  return counts;
}

/**
 * Get leads by email domain
 */
export async function getLeadsByEmailDomain(): Promise<
  { domain: string; count: number }[]
> {
  const db = await getDb();
  if (!db) return [];

  const allLeads = await db.select().from(leads);

  const domainCounts: { [key: string]: number } = {};

  allLeads.forEach((lead) => {
    const domain = lead.email.split("@")[1] || "unknown";
    domainCounts[domain] = (domainCounts[domain] || 0) + 1;
  });

  return Object.entries(domainCounts)
    .map(([domain, count]) => ({ domain, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get email send statistics
 */
export async function getEmailStats(): Promise<{
  totalLeads: number;
  email1Sent: number;
  email2Sent: number;
  email3Sent: number;
  email4Sent: number;
  unsubscribed: number;
}> {
  const db = await getDb();
  if (!db) {
    return {
      totalLeads: 0,
      email1Sent: 0,
      email2Sent: 0,
      email3Sent: 0,
      email4Sent: 0,
      unsubscribed: 0,
    };
  }

  const allLeads = await db.select().from(leads);

  return {
    totalLeads: allLeads.length,
    email1Sent: allLeads.filter((l) => l.email1Sent).length,
    email2Sent: allLeads.filter((l) => l.email2Sent).length,
    email3Sent: allLeads.filter((l) => l.email3Sent).length,
    email4Sent: allLeads.filter((l) => l.email4Sent).length,
    unsubscribed: allLeads.filter((l) => l.unsubscribed).length,
  };
}

/**
 * Get recent leads (last N days)
 */
export async function getRecentLeads(days: number = 7): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const allLeads = await db.select().from(leads);

  return allLeads
    .filter((lead) => {
      const createdAt = lead.createdAt instanceof Date ? lead.createdAt : new Date(lead.createdAt);
      return createdAt >= cutoffDate;
    })
    .sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
}

/**
 * Search leads by email
 */
export async function searchLeads(query: string): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];

  const allLeads = await db.select().from(leads);

  return allLeads.filter(
    (lead) =>
      lead.email.toLowerCase().includes(query.toLowerCase()) ||
      (lead.firstName && lead.firstName.toLowerCase().includes(query.toLowerCase()))
  );
}

/**
 * Get leads by email domain (e.g., "gmail.com")
 */
export async function getLeadsByDomain(domain: string): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];

  const allLeads = await db.select().from(leads);

  return allLeads.filter((lead) => lead.email.endsWith(`@${domain}`));
}

/**
 * Get unsubscribed leads
 */
export async function getUnsubscribedLeads(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];

  const allLeads = await db.select().from(leads);
  return allLeads.filter((lead) => lead.unsubscribed);
}

/**
 * Export leads as CSV
 */
export async function exportLeadsAsCSV(): Promise<string> {
  const db = await getDb();
  if (!db) return "";

  const allLeads = await db.select().from(leads);

  const headers = [
    "Email",
    "First Name",
    "Interest Level",
    "Email 1 Sent",
    "Email 2 Sent",
    "Email 3 Sent",
    "Email 4 Sent",
    "Unsubscribed",
    "Created At",
  ];

  const rows = allLeads.map((lead) => [
    lead.email,
    lead.firstName || "",
    lead.interestLevel,
    lead.email1Sent ? "Yes" : "No",
    lead.email2Sent ? "Yes" : "No",
    lead.email3Sent ? "Yes" : "No",
    lead.email4Sent ? "Yes" : "No",
    lead.unsubscribed ? "Yes" : "No",
    lead.createdAt instanceof Date ? lead.createdAt.toISOString() : lead.createdAt,
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  return csv;
}
