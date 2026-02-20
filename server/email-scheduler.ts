import { getDb } from "./db";
import { leads } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import {
  sendWelcomeEmail,
  sendPropertyPitchEmail,
  sendAffiliateEmail,
  sendReengagementEmail,
} from "./email-service";

const YOUTUBE_LINKS = [
  "https://www.youtube.com/watch?v=PLACEHOLDER_WHY_1",
  "https://www.youtube.com/watch?v=PLACEHOLDER_WHY_2",
  "https://www.youtube.com/watch?v=PLACEHOLDER_WHY_3",
  "https://www.youtube.com/watch?v=PLACEHOLDER_WHY_4",
];

const PROPERTY_VIDEO = "https://www.youtube.com/watch?v=PLACEHOLDER_MANGO_HILLS";

const AFFILIATE_LINKS = [
  { name: "Booking.com - Hotels & Accommodations", url: "https://booking.com/affiliate" },
  { name: "Agoda - Travel Deals", url: "https://agoda.com/affiliate" },
  { name: "Wise - International Money Transfers", url: "https://wise.com/invite" },
  { name: "Viator - Tours & Experiences", url: "https://viator.com/affiliates" },
  { name: "Klook - Activities & Tours", url: "https://affiliate.klook.com" },
  { name: "GetYourGuide - Tours & Activities", url: "https://affiliate.getyourguide.com" },
  { name: "SafetyWing - Travel Insurance", url: "https://safetywing.com/affiliates" },
];

const PDF_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663314810987/PqiyrVUHeoljDzMq.pdf";

/**
 * Send welcome email immediately after signup
 */
export async function sendWelcomeSequence(leadId: string, email: string, firstName: string): Promise<void> {
  console.log(`[Email Scheduler] Sending welcome email to ${email}`);
  await sendWelcomeEmail(email, firstName, PDF_URL, YOUTUBE_LINKS);

  // Mark email 1 as sent
  const db = await getDb();
  if (db) {
    const leadIdNum = parseInt(leadId, 10);
    await db
      .update(leads)
      .set({ email1Sent: new Date() })
      .where(eq(leads.id, leadIdNum));
  }
}

/**
 * Send property pitch email (Day 3)
 */
export async function sendPropertySequence(leadId: string, email: string, firstName: string): Promise<void> {
  console.log(`[Email Scheduler] Sending property pitch email to ${email}`);
  await sendPropertyPitchEmail(email, firstName, PROPERTY_VIDEO);

  const db = await getDb();
  if (db) {
    const leadIdNum = parseInt(leadId, 10);
    await db
      .update(leads)
      .set({ email2Sent: new Date() })
      .where(eq(leads.id, leadIdNum));
  }
}

/**
 * Send affiliate recommendations email (Day 7)
 */
export async function sendAffiliateSequence(leadId: string, email: string, firstName: string): Promise<void> {
  console.log(`[Email Scheduler] Sending affiliate recommendations to ${email}`);
  await sendAffiliateEmail(email, firstName, AFFILIATE_LINKS);

  const db = await getDb();
  if (db) {
    const leadIdNum = parseInt(leadId, 10);
    await db
      .update(leads)
      .set({ email3Sent: new Date() })
      .where(eq(leads.id, leadIdNum));
  }
}

/**
 * Send re-engagement email (Day 14)
 */
export async function sendReengagementSequence(leadId: string, email: string, firstName: string): Promise<void> {
  console.log(`[Email Scheduler] Sending re-engagement email to ${email}`);
  await sendReengagementEmail(email, firstName);

  const db = await getDb();
  if (db) {
    const leadIdNum = parseInt(leadId, 10);
    await db
      .update(leads)
      .set({ email4Sent: new Date() })
      .where(eq(leads.id, leadIdNum));
  }
}

/**
 * Process scheduled emails
 * This should be called by a cron job or scheduled task
 */
export async function processScheduledEmails(): Promise<void> {
  console.log("[Email Scheduler] Processing scheduled emails...");

  const db = await getDb();
  if (!db) {
    console.error("[Email Scheduler] Database not available");
    return;
  }

  const now = new Date();
  const allLeads = await db.select().from(leads);

  for (const lead of allLeads) {
    // Email 1: Welcome (sent immediately)
    if (!lead.email1Sent) {
      const leadId = lead.id as unknown as string;
      await sendWelcomeSequence(leadId, lead.email, lead.firstName || "Insider");
    }

    // Email 2: Property pitch (Day 3)
    if (lead.email1Sent && !lead.email2Sent) {
      const signupTime = lead.email1Sent instanceof Date ? lead.email1Sent : new Date(lead.email1Sent);
      const daysSinceSignup = Math.floor(
        (now.getTime() - signupTime.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceSignup >= 3) {
        const leadId = lead.id as unknown as string;
        await sendPropertySequence(leadId, lead.email, lead.firstName || "Insider");
      }
    }

    // Email 3: Affiliate recommendations (Day 7)
    if (lead.email2Sent && !lead.email3Sent) {
      const signupTime = lead.email1Sent instanceof Date ? lead.email1Sent : new Date(lead.email1Sent || Date.now());
      const daysSinceSignup = Math.floor(
        (now.getTime() - signupTime.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceSignup >= 7) {
        const leadId = lead.id as unknown as string;
        await sendAffiliateSequence(leadId, lead.email, lead.firstName || "Insider");
      }
    }

    // Email 4: Re-engagement (Day 14)
    if (lead.email3Sent && !lead.email4Sent) {
      const signupTime = lead.email1Sent instanceof Date ? lead.email1Sent : new Date(lead.email1Sent || Date.now());
      const daysSinceSignup = Math.floor(
        (now.getTime() - signupTime.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceSignup >= 14) {
        const leadId = lead.id as unknown as string;
        await sendReengagementSequence(leadId, lead.email, lead.firstName || "Insider");
      }
    }
  }

  console.log("[Email Scheduler] Scheduled email processing complete");
}
