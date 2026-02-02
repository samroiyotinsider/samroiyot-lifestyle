import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { Context } from "./_core/context";

describe("Inquiry Creation", () => {
  it("should create a property inquiry successfully", async () => {
    const mockContext: Context = {
      user: null,
      req: {} as any,
      res: {} as any,
    };

    const caller = appRouter.createCaller(mockContext);

    const inquiry = await caller.inquiries.create({
      propertyId: 1,
      name: "Test User",
      email: "test@example.com",
      phone: "+1234567890",
      message: "I'm interested in this property. Please contact me.",
      inquiryType: "property",
    });

    expect(inquiry).toBeDefined();
    expect(inquiry.id).toBeGreaterThan(0);
    expect(inquiry.name).toBe("Test User");
    expect(inquiry.email).toBe("test@example.com");
    expect(inquiry.inquiryType).toBe("property");
  });

  it("should create a concierge inquiry successfully", async () => {
    const mockContext: Context = {
      user: null,
      req: {} as any,
      res: {} as any,
    };

    const caller = appRouter.createCaller(mockContext);

    const inquiry = await caller.inquiries.create({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "I need help with visa services.",
      inquiryType: "concierge",
    });

    expect(inquiry).toBeDefined();
    expect(inquiry.id).toBeGreaterThan(0);
    expect(inquiry.name).toBe("Jane Doe");
    expect(inquiry.inquiryType).toBe("concierge");
  });

  it("should create a general inquiry successfully", async () => {
    const mockContext: Context = {
      user: null,
      req: {} as any,
      res: {} as any,
    };

    const caller = appRouter.createCaller(mockContext);

    const inquiry = await caller.inquiries.create({
      name: "John Smith",
      email: "john@example.com",
      phone: "+9876543210",
      message: "I have a general question about Sam Roi Yot.",
      inquiryType: "general",
    });

    expect(inquiry).toBeDefined();
    expect(inquiry.id).toBeGreaterThan(0);
    expect(inquiry.name).toBe("John Smith");
    expect(inquiry.inquiryType).toBe("general");
  });

  it("should validate email format", async () => {
    const mockContext: Context = {
      user: null,
      req: {} as any,
      res: {} as any,
    };

    const caller = appRouter.createCaller(mockContext);

    await expect(
      caller.inquiries.create({
        name: "Test User",
        email: "invalid-email",
        message: "Test message",
        inquiryType: "general",
      })
    ).rejects.toThrow();
  });
});
