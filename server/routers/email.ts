import { publicProcedure } from "../_core/trpc";
import { processScheduledEmails } from "../email-scheduler";

export const emailRouter = {
  /**
   * Manually trigger email processing
   * (In production, this would be called by a cron job)
   */
  processScheduledEmails: publicProcedure.mutation(async () => {
    try {
      await processScheduledEmails();
      return { success: true, message: "Email processing completed" };
    } catch (error) {
      console.error("[Email Router] Error processing emails:", error);
      return { success: false, message: "Error processing emails" };
    }
  }),

  /**
   * Get email statistics
   */
  getStats: publicProcedure.query(async () => {
    try {
      // This would query the leads table for stats
      // For now, return placeholder
      return {
        success: true,
        totalLeads: 0,
        email1Sent: 0,
        email2Sent: 0,
        email3Sent: 0,
        email4Sent: 0,
      };
    } catch (error) {
      console.error("[Email Router] Error getting stats:", error);
      return { success: false, message: "Error getting stats" };
    }
  }),
};
