import * as cheerio from "cheerio";
import { getDb, createEvent, getEventBySourceId, updateEvent } from "../db";
import { InsertEvent } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Scraper for visitsamroiyot.com events
 * Fetches the events page and extracts event data
 */

interface ScrapedEvent {
  title: string;
  category: string;
  startDate: Date;
  endDate?: Date;
  location: string;
  price?: number;
  organizer?: string;
  sourceId: string; // Unique identifier from source
}

export async function scrapeVisitSamRoiYotEvents(): Promise<void> {
  try {
    console.log("[Scraper] Starting Visit Sam Roi Yot events scrape...");

    const response = await fetch("https://www.visitsamroiyot.com/whats-on/");
    if (!response.ok) {
      throw new Error(`Failed to fetch events page: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const scrapedEvents: ScrapedEvent[] = [];

    // Parse event items from the page
    // The events are structured in divs with specific classes
    const eventElements = $("a[href*='event']").closest("div");

    eventElements.each((index: number, element: any) => {
      try {
        const $element = $(element);

        // Extract event title
        const titleElement = $element.find("a").first();
        const title = titleElement.text().trim();

        if (!title) return; // Skip if no title

        // Extract category from labels
        const categoryElement = $element.find("a").eq(1);
        const category = categoryElement.text().trim() || "Day Time";

        // Extract date and time from the event element
        // Look for date patterns like "10 FEBRUARY 2026" and "15:00 - 17:00"
        const eventText = $element.text();
        const dateMatch = eventText.match(/(\d{1,2})\s+([A-Z]+)\s+(\d{4})/);
        const timeMatch = eventText.match(/(\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})/);

        if (!dateMatch) return; // Skip if no date found

        const [, day, month, year] = dateMatch;
        const monthMap: Record<string, number> = {
          JANUARY: 0,
          FEBRUARY: 1,
          MARCH: 2,
          APRIL: 3,
          MAY: 4,
          JUNE: 5,
          JULY: 6,
          AUGUST: 7,
          SEPTEMBER: 8,
          OCTOBER: 9,
          NOVEMBER: 10,
          DECEMBER: 11,
        };

        const monthIndex = monthMap[month];
        if (monthIndex === undefined) return;

        const startDate = new Date(
          parseInt(year),
          monthIndex,
          parseInt(day),
          timeMatch ? parseInt(timeMatch[1]) : 0,
          timeMatch ? parseInt(timeMatch[2]) : 0
        );

        // Extract location from the event element
        const locationElement = $element.find("a").eq(2);
        const location = locationElement.text().trim() || "Sam Roi Yot";

        // Extract price if present
        const priceText = eventText.match(/THB\s*([\d,]+)/);
        const price = priceText ? parseInt(priceText[1].replace(/,/g, "")) : undefined;

        // Extract organizer name if present (usually after location)
        const organizerElement = $element.find("a").eq(3);
        const organizer = organizerElement.text().trim() || undefined;

        // Create unique source ID from title + date
        const sourceId = `vsy-${title.toLowerCase().replace(/\s+/g, "-")}-${startDate.getTime()}`;

        scrapedEvents.push({
          title,
          category,
          startDate,
          location,
          price,
          organizer,
          sourceId,
        });
      } catch (error) {
        console.error(`[Scraper] Error parsing event element:`, error);
      }
    });

    console.log(`[Scraper] Found ${scrapedEvents.length} events`);

    // Insert or update events in database
    for (const scrapedEvent of scrapedEvents) {
      try {
        // Check if event already exists
        const existingEvent = await getEventBySourceId(scrapedEvent.sourceId);

        const eventData: InsertEvent = {
          title: scrapedEvent.title,
          category: scrapedEvent.category,
          startDate: scrapedEvent.startDate,
          endDate: scrapedEvent.endDate,
          location: scrapedEvent.location,
          price: scrapedEvent.price,
          organizer: scrapedEvent.organizer,
          source: "visitsamroiyot",
          sourceId: scrapedEvent.sourceId,
          commissionRate: 25, // Default 25% commission
          published: 1,
          lastScrapedAt: new Date(),
        };

        if (existingEvent) {
          // Update existing event
          await updateEvent(existingEvent.id, {
            ...eventData,
            updatedAt: new Date(),
          });

          console.log(`[Scraper] Updated event: ${scrapedEvent.title}`);
        } else {
          // Insert new event
          await createEvent(eventData);
          console.log(`[Scraper] Inserted event: ${scrapedEvent.title}`);
        }
      } catch (error) {
        console.error(`[Scraper] Error inserting event:`, error);
      }
    }

    console.log("[Scraper] Visit Sam Roi Yot events scrape completed");
  } catch (error) {
    console.error("[Scraper] Error scraping Visit Sam Roi Yot:", error);
    throw error;
  }
}

/**
 * Schedule the scraper to run daily at 2 AM
 */
export function scheduleVisitSamRoiYotScraper(): void {
  // Run immediately on startup
  scrapeVisitSamRoiYotEvents().catch(console.error);

  // Schedule daily at 2 AM (02:00)
  const now = new Date();
  const scheduledTime = new Date();
  scheduledTime.setHours(2, 0, 0, 0);

  // If it's already past 2 AM today, schedule for tomorrow
  if (now > scheduledTime) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const timeUntilNextRun = scheduledTime.getTime() - now.getTime();

  console.log(
    `[Scraper] Scheduled next run in ${Math.round(timeUntilNextRun / 1000 / 60)} minutes`
  );

  setTimeout(() => {
    scrapeVisitSamRoiYotEvents().catch(console.error);

    // Then schedule it to run every 24 hours
    setInterval(() => {
      scrapeVisitSamRoiYotEvents().catch(console.error);
    }, 24 * 60 * 60 * 1000);
  }, timeUntilNextRun);
}
