import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { getDb, getAllEvents, createEvent, getEventBySourceId, updateEvent } from "./db";
import { InsertEvent } from "../drizzle/schema";

describe("Events API", () => {
  const testEventData: InsertEvent = {
    title: "Test Event",
    titleTh: "กิจกรรมทดสอบ",
    category: "Adventure",
    startDate: new Date("2026-02-15T10:00:00Z"),
    endDate: new Date("2026-02-15T12:00:00Z"),
    location: "Test Location",
    locationTh: "สถานที่ทดสอบ",
    price: 500,
    priceUsd: 14,
    organizer: "Test Organizer",
    organizerPhone: "+66812345678",
    organizerEmail: "test@example.com",
    source: "internal",
    sourceId: `test-event-${Date.now()}`,
    commissionRate: 25,
    published: 1,
  };

  describe("Event Creation and Retrieval", () => {
    it("should create an event", async () => {
      const result = await createEvent(testEventData);
      expect(result).toBeDefined();
      expect(result[0]?.insertId).toBeGreaterThan(0);
    });

    it("should retrieve an event by source ID", async () => {
      // First create an event
      await createEvent(testEventData);

      // Then retrieve it
      const event = await getEventBySourceId(testEventData.sourceId!);
      expect(event).toBeDefined();
      expect(event?.title).toBe(testEventData.title);
      expect(event?.source).toBe("internal");
      expect(event?.commissionRate).toBe(25);
    });

    it("should retrieve all events", async () => {
      const events = await getAllEvents({ published: true });
      expect(Array.isArray(events)).toBe(true);
      expect(events.length).toBeGreaterThanOrEqual(0);
    });

    it("should filter events by category", async () => {
      // Create test event
      await createEvent(testEventData);

      // Filter by category
      const events = await getAllEvents({ category: "Adventure", published: true });
      expect(Array.isArray(events)).toBe(true);
      const hasAdventure = events.some((e) => e.category === "Adventure");
      expect(hasAdventure).toBe(true);
    });

    it("should filter events by source", async () => {
      // Create test event
      await createEvent(testEventData);

      // Filter by source
      const events = await getAllEvents({ source: "internal", published: true });
      expect(Array.isArray(events)).toBe(true);
      const hasInternal = events.some((e) => e.source === "internal");
      expect(hasInternal).toBe(true);
    });
  });

  describe("Event Commission Calculation", () => {
    it("should have correct commission rate", async () => {
      const result = await createEvent(testEventData);
      const eventId = Number(result[0]?.insertId);

      const event = await getEventBySourceId(testEventData.sourceId!);
      expect(event?.commissionRate).toBe(25);

      // Verify commission calculation
      const totalPrice = event?.price || 0;
      const commission = Math.round((totalPrice * event!.commissionRate) / 100);
      expect(commission).toBe(125); // 25% of 500
    });
  });

  describe("Event Pricing", () => {
    it("should store both THB and USD prices", async () => {
      await createEvent(testEventData);

      const event = await getEventBySourceId(testEventData.sourceId!);
      expect(event?.price).toBe(500); // THB
      expect(event?.priceUsd).toBe(14); // USD
    });
  });

  describe("Event Source Tracking", () => {
    it("should track event source correctly", async () => {
      const vsynEvent: InsertEvent = {
        ...testEventData,
        source: "visitsamroiyot",
        sourceId: `vsyn-${Date.now()}`,
      };

      await createEvent(vsynEvent);

      const event = await getEventBySourceId(vsynEvent.sourceId!);
      expect(event?.source).toBe("visitsamroiyot");
    });

    it("should track partner events", async () => {
      const partnerEvent: InsertEvent = {
        ...testEventData,
        source: "partner",
        sourceId: `partner-${Date.now()}`,
      };

      await createEvent(partnerEvent);

      const event = await getEventBySourceId(partnerEvent.sourceId!);
      expect(event?.source).toBe("partner");
    });
  });

  describe("Event Bilingual Support", () => {
    it("should store Thai titles", async () => {
      await createEvent(testEventData);

      const event = await getEventBySourceId(testEventData.sourceId!);
      expect(event?.titleTh).toBe("กิจกรรมทดสอบ");
      expect(event?.locationTh).toBe("สถานที่ทดสอบ");
    });
  });

  describe("Event Contact Information", () => {
    it("should store organizer contact details", async () => {
      await createEvent(testEventData);

      const event = await getEventBySourceId(testEventData.sourceId!);
      expect(event?.organizer).toBe("Test Organizer");
      expect(event?.organizerPhone).toBe("+66812345678");
      expect(event?.organizerEmail).toBe("test@example.com");
    });
  });
});
