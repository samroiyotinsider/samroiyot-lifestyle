import { load as cheerioLoad } from "cheerio";
import { getDb, createEvent, getEventBySourceId, updateEvent } from "../db";
import { InsertEvent } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { cleanLocation, extractPhone, cleanOrganizer } from "../utils/locationCleaner";

/**
 * Scraper for visitsamroiyot.com events
 * Fetches the events page and extracts event data using Modern Events Calendar (MEC) structure
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
    const $ = cheerioLoad(html);

    const scrapedEvents: ScrapedEvent[] = [];
    const processedEventIds = new Set<string>();

    // Modern Events Calendar wraps events in <article> tags
    // Each article contains event details with data-event-id attributes
    const eventArticles = $("article");

    console.log(`[Scraper] Found ${eventArticles.length} article elements`);

    eventArticles.each((index: number, element: any) => {
      try {
        const $article = $(element);
        
        // Get event ID from any child element with data-event-id
        const eventIdElement = $article.find("[data-event-id]").first();
        const eventId = eventIdElement.attr("data-event-id");
        
        if (!eventId || processedEventIds.has(eventId)) {
          return; // Skip if no ID or already processed
        }
        
        processedEventIds.add(eventId);

        // Extract event title - use .mec-event-title class
        const titleElement = $article.find(".mec-event-title").first();
        const title = titleElement.text().trim();

        if (!title) {
          console.log(`[Scraper] No title found in article ${eventId}`);
          return;
        }

        // Get all text from the article for pattern matching
        const articleText = $article.text();

        // Extract date and time
        // Pattern: "09 February 2026" and "15:30 - 18:30"
        const dateMatch = articleText.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
        const timeMatch = articleText.match(/(\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})/);

        if (!dateMatch) {
          console.log(`[Scraper] No date found for event: ${title}`);
          return;
        }

        const [, day, monthStr, year] = dateMatch;
        const monthMap: Record<string, number> = {
          January: 0,
          February: 1,
          March: 2,
          April: 3,
          May: 4,
          June: 5,
          July: 6,
          August: 7,
          September: 8,
          October: 9,
          November: 10,
          December: 11,
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

        const monthIndex = monthMap[monthStr];
        if (monthIndex === undefined) {
          console.log(`[Scraper] Unknown month: ${monthStr}`);
          return;
        }

        const startDate = new Date(
          parseInt(year),
          monthIndex,
          parseInt(day),
          timeMatch ? parseInt(timeMatch[1]) : 0,
          timeMatch ? parseInt(timeMatch[2]) : 0
        );

        // Extract category - look for category labels
        let category = "Day Time"; // Default category
        const categoryMatch = articleText.match(/(Adventure|Day Time|Eating Out|Live Music|Market|Night Time)/);
        if (categoryMatch) {
          category = categoryMatch[1];
        }

        // Extract location - look for venue name or address
        let location = "Sam Roi Yot";
        
        // Try to find location in the article text
        // It's usually after the title or in a specific section
        const locationPatterns = [
          /(?:at|@|venue:)\s*([^,\n]+)/i,
          /([A-Za-z\s]+(?:Beach|Bar|Market|Restaurant|Venue|Club)[^,\n]*)/,
          /(?:Location:|Where:)\s*([^,\n]+)/i,
        ];

        for (const pattern of locationPatterns) {
          const match = articleText.match(pattern);
          if (match) {
            location = match[1].trim();
            break;
          }
        }
        
        // Clean up the location
        location = cleanLocation(location);

        // Extract price if present (THB format)
        let price: number | undefined;
        const priceMatch = articleText.match(/THB\s*([\d,]+)/);
        if (priceMatch) {
          price = parseInt(priceMatch[1].replace(/,/g, ""));
        }

        // Extract organizer name if present
        let organizer: string | undefined;
        let phone: string | undefined;
        const organizerMatch = articleText.match(/(?:by|@|Organizer:)\s*([A-Za-z\s0-9+\-\(\)]+?)(?:\n|,|$)/i);
        if (organizerMatch) {
          const rawOrganizer = organizerMatch[1].trim();
          phone = extractPhone(rawOrganizer);
          organizer = cleanOrganizer(rawOrganizer);
        }

        const sourceId = `visitsamroiyot-${eventId}`;

        scrapedEvents.push({
          title,
          category,
          startDate,
          location,
          price,
          organizer,
          sourceId,
        });

        console.log(`[Scraper] Extracted: ${title} (${category}) on ${dateMatch[1]} ${monthStr} ${year}`);
      } catch (error) {
        console.error(`[Scraper] Error parsing event:`, error);
      }
    });

    console.log(`[Scraper] Total extracted: ${scrapedEvents.length} events`);

    // Save events to database
    if (scrapedEvents.length > 0) {
      const db = await getDb();
      if (!db) {
        console.error("[Scraper] Database connection failed");
        return;
      }

      for (const event of scrapedEvents) {
        try {
          // Check if event already exists
          const existing = await getEventBySourceId(event.sourceId);

          if (existing) {
            // Update existing event
            await updateEvent(existing.id, {
              title: event.title,
              category: event.category,
              startDate: event.startDate,
              location: event.location,
              price: event.price,
              organizer: event.organizer,
              source: "visitsamroiyot",
              lastScrapedAt: new Date(),
            });
            console.log(`[Scraper] Updated event: ${event.title}`);
          } else {
            // Create new event
            await createEvent({
              title: event.title,
              category: event.category,
              startDate: event.startDate,
              location: event.location,
              price: event.price,
              organizer: event.organizer,
              source: "visitsamroiyot",
              sourceId: event.sourceId,
              lastScrapedAt: new Date(),
            });
            console.log(`[Scraper] Created event: ${event.title}`);
          }
        } catch (error) {
          console.error(`[Scraper] Error saving event ${event.title}:`, error);
        }
      }
    }

    console.log("[Scraper] Visit Sam Roi Yot events scrape completed");
  } catch (error) {
    console.error("[Scraper] Error during scrape:", error);
  }
}

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
