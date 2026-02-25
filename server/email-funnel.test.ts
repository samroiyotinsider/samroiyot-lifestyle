import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { sendWelcomeEmail, sendPropertyPitchEmail, sendAffiliateEmail, sendReengagementEmail } from "./email-service";
import { sendWelcomeSequence, sendPropertySequence, sendAffiliateSequence, sendReengagementSequence } from "./email-scheduler";

describe("Email Funnel System", () => {
  const testEmail = "test@example.com";
  const testName = "Test User";
  const testLeadId = "1";

  describe("Email Service", () => {
    it("should send welcome email with PDF and YouTube links", async () => {
      const result = await sendWelcomeEmail(
        testEmail,
        testName,
        "https://example.com/guide.pdf",
        ["https://youtube.com/watch?v=1", "https://youtube.com/watch?v=2"]
      );
      expect(result).toBe(false); // Emails disabled per user request
    });

    it("should send property pitch email", async () => {
      const result = await sendPropertyPitchEmail(
        testEmail,
        testName,
        "https://youtube.com/watch?v=property"
      );
      expect(result).toBe(false); // Emails disabled per user request
    });

    it("should send affiliate recommendations email", async () => {
      const result = await sendAffiliateEmail(testEmail, testName, [
        { name: "Booking.com", url: "https://booking.com" },
        { name: "Agoda", url: "https://agoda.com" },
      ]);
      expect(result).toBe(false); // Emails disabled per user request
    });

    it("should send re-engagement email", async () => {
      const result = await sendReengagementEmail(testEmail, testName);
      expect(result).toBe(false); // Emails disabled per user request
    });
  });

  describe("Email Scheduler", () => {
    it("should send welcome sequence", async () => {
      // This should not throw
      await expect(
        sendWelcomeSequence(testLeadId, testEmail, testName)
      ).resolves.not.toThrow();
    });

    it("should send property sequence", async () => {
      await expect(
        sendPropertySequence(testLeadId, testEmail, testName)
      ).resolves.not.toThrow();
    });

    it("should send affiliate sequence", async () => {
      await expect(
        sendAffiliateSequence(testLeadId, testEmail, testName)
      ).resolves.not.toThrow();
    });

    it("should send re-engagement sequence", async () => {
      await expect(
        sendReengagementSequence(testLeadId, testEmail, testName)
      ).resolves.not.toThrow();
    });
  });

  describe("Email Content", () => {
    it("welcome email should contain PDF URL", async () => {
      const pdfUrl = "https://example.com/guide.pdf";
      const result = await sendWelcomeEmail(testEmail, testName, pdfUrl, []);
      expect(result).toBe(false); // Emails disabled per user request
    });

    it("property email should contain YouTube link", async () => {
      const youtubeUrl = "https://youtube.com/watch?v=property123";
      const result = await sendPropertyPitchEmail(testEmail, testName, youtubeUrl);
      expect(result).toBe(false); // Emails disabled per user request
    });

    it("affiliate email should contain multiple links", async () => {
      const affiliateLinks = [
        { name: "Booking.com", url: "https://booking.com/affiliate" },
        { name: "Agoda", url: "https://agoda.com/affiliate" },
        { name: "Wise", url: "https://wise.com/invite" },
      ];
      const result = await sendAffiliateEmail(testEmail, testName, affiliateLinks);
      expect(result).toBe(false); // Emails disabled per user request
    });
  });
});
