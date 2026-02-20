import { publicProcedure, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import {
  createLead,
  getLeadByEmail,
  getLeadById,
  getAllLeads,
  getLeadCount,
  markEmailSent,
  markEmailOpened,
  markEmailLinkClicked,
  markYoutubeClicked,
  markPropertyInquirySubmitted,
  markAffiliateLinkClicked,
  unsubscribeLead,
  updateLeadInterestLevel,
  getActiveLeads,
  getLeadsByInterestLevel,
  exportLeadsToCSV,
} from "../db-leads";

export const leadsRouter = {
  /**
   * Signup for lead magnet (public)
   */
  signup: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string().optional(),
        interestLevel: z.enum(["casual_visitor", "serious_buyer", "investor"]).default("casual_visitor"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Check if lead already exists
        const existing = await getLeadByEmail(input.email);
        if (existing) {
          return {
            success: true,
            message: "Already subscribed",
            leadId: existing.id,
          };
        }

        const lead = await createLead(input.email, input.firstName, input.interestLevel);
        return {
          success: true,
          message: "Successfully subscribed to Sam Roi Yot Insider",
          leadId: lead.id,
        };
      } catch (error) {
        console.error("[Leads] Signup error:", error);
        return {
          success: false,
          message: "Failed to subscribe. Please try again.",
        };
      }
    }),

  /**
   * Get lead by ID (protected)
   */
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await getLeadById(input.id);
    }),

  /**
   * Get all leads (protected - admin only)
   */
  getAll: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      const leads = await getAllLeads(input.limit, input.offset);
      const count = await getLeadCount();
      return {
        leads,
        total: count,
        limit: input.limit,
        offset: input.offset,
      };
    }),

  /**
   * Get active leads (protected - admin only)
   */
  getActive: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return await getActiveLeads(input.limit, input.offset);
    }),

  /**
   * Get leads by interest level (protected - admin only)
   */
  getByInterestLevel: protectedProcedure
    .input(
      z.object({
        interestLevel: z.enum(["casual_visitor", "serious_buyer", "investor"]),
        limit: z.number().default(50),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return await getLeadsByInterestLevel(input.interestLevel, input.limit, input.offset);
    }),

  /**
   * Mark email as sent (protected - admin only)
   */
  markEmailSent: protectedProcedure
    .input(
      z.object({
        leadId: z.number(),
        emailNumber: z.enum(["1", "2", "3", "4"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      await markEmailSent(input.leadId, parseInt(input.emailNumber) as 1 | 2 | 3 | 4);
      return { success: true };
    }),

  /**
   * Mark email as opened (public - tracking pixel)
   */
  markEmailOpened: publicProcedure
    .input(
      z.object({
        leadId: z.number(),
        emailNumber: z.enum(["1", "2", "3", "4"]),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await markEmailOpened(input.leadId, parseInt(input.emailNumber) as 1 | 2 | 3 | 4);
        return { success: true };
      } catch (error) {
        console.error("[Leads] Mark email opened error:", error);
        return { success: false };
      }
    }),

  /**
   * Mark email link as clicked (public - link tracking)
   */
  markEmailLinkClicked: publicProcedure
    .input(
      z.object({
        leadId: z.number(),
        emailNumber: z.enum(["1", "2", "3", "4"]),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await markEmailLinkClicked(input.leadId, parseInt(input.emailNumber) as 1 | 2 | 3 | 4);
        return { success: true };
      } catch (error) {
        console.error("[Leads] Mark email link clicked error:", error);
        return { success: false };
      }
    }),

  /**
   * Mark YouTube link as clicked (public)
   */
  markYoutubeClicked: publicProcedure
    .input(z.object({ leadId: z.number() }))
    .mutation(async ({ input }) => {
      try {
        await markYoutubeClicked(input.leadId);
        return { success: true };
      } catch (error) {
        console.error("[Leads] Mark YouTube clicked error:", error);
        return { success: false };
      }
    }),

  /**
   * Mark property inquiry as submitted (public)
   */
  markPropertyInquirySubmitted: publicProcedure
    .input(z.object({ leadId: z.number() }))
    .mutation(async ({ input }) => {
      try {
        await markPropertyInquirySubmitted(input.leadId);
        return { success: true };
      } catch (error) {
        console.error("[Leads] Mark property inquiry error:", error);
        return { success: false };
      }
    }),

  /**
   * Mark affiliate link as clicked (public)
   */
  markAffiliateLinkClicked: publicProcedure
    .input(z.object({ leadId: z.number() }))
    .mutation(async ({ input }) => {
      try {
        await markAffiliateLinkClicked(input.leadId);
        return { success: true };
      } catch (error) {
        console.error("[Leads] Mark affiliate link clicked error:", error);
        return { success: false };
      }
    }),

  /**
   * Unsubscribe from emails (public)
   */
  unsubscribe: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const success = await unsubscribeLead(input.token);
        return {
          success,
          message: success ? "Unsubscribed successfully" : "Invalid unsubscribe token",
        };
      } catch (error) {
        console.error("[Leads] Unsubscribe error:", error);
        return {
          success: false,
          message: "Failed to unsubscribe",
        };
      }
    }),

  /**
   * Update lead interest level (protected - admin only)
   */
  updateInterestLevel: protectedProcedure
    .input(
      z.object({
        leadId: z.number(),
        interestLevel: z.enum(["casual_visitor", "serious_buyer", "investor"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      await updateLeadInterestLevel(input.leadId, input.interestLevel);
      return { success: true };
    }),

  /**
   * Export leads to CSV (protected - admin only)
   */
  exportCSV: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }
    const csv = await exportLeadsToCSV();
    return { csv };
  }),
};
