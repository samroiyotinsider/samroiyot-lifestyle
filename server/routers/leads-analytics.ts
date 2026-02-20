import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import {
  getTotalLeads,
  getLeadsByInterestLevel,
  getLeadsByEmailDomain,
  getEmailStats,
  getRecentLeads,
  searchLeads,
  getLeadsByDomain,
  getUnsubscribedLeads,
  exportLeadsAsCSV,
} from "../db-leads-analytics";

export const leadsAnalyticsRouter = router({
  /**
   * Get total lead count
   */
  getTotalCount: protectedProcedure.query(async () => {
    const total = await getTotalLeads();
    return { total };
  }),

  /**
   * Get leads by interest level
   */
  getByInterestLevel: protectedProcedure.query(async () => {
    const data = await getLeadsByInterestLevel();
    return data;
  }),

  /**
   * Get leads by email domain
   */
  getByEmailDomain: protectedProcedure.query(async () => {
    const data = await getLeadsByEmailDomain();
    return data;
  }),

  /**
   * Get email send statistics
   */
  getEmailStats: protectedProcedure.query(async () => {
    const stats = await getEmailStats();
    return stats;
  }),

  /**
   * Get recent leads
   */
  getRecent: protectedProcedure
    .input(
      z.object({
        days: z.number().default(7),
      })
    )
    .query(async ({ input }) => {
      const leads = await getRecentLeads(input.days);
      return leads;
    }),

  /**
   * Search leads
   */
  search: protectedProcedure
    .input(
      z.object({
        query: z.string(),
      })
    )
    .query(async ({ input }) => {
      const results = await searchLeads(input.query);
      return results;
    }),

  /**
   * Get leads by domain
   */
  getByDomain: protectedProcedure
    .input(
      z.object({
        domain: z.string(),
      })
    )
    .query(async ({ input }) => {
      const results = await getLeadsByDomain(input.domain);
      return results;
    }),

  /**
   * Get unsubscribed leads
   */
  getUnsubscribed: protectedProcedure.query(async () => {
    const results = await getUnsubscribedLeads();
    return results;
  }),

  /**
   * Export leads as CSV
   */
  exportCSV: protectedProcedure.mutation(async () => {
    const csv = await exportLeadsAsCSV();
    return { csv, success: true };
  }),
});
