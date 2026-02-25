import { z } from "zod";
// import { notifyOwner } from "./notification"; // Disabled - user requested no emails
import { adminProcedure, publicProcedure, router } from "./trpc";

export const systemRouter = router({
  health: publicProcedure
    .input(
      z.object({
        timestamp: z.number().min(0, "timestamp cannot be negative"),
      })
    )
    .query(() => ({
      ok: true,
    })),

  // notifyOwner disabled - user requested to stop all emails
  // notifyOwner: adminProcedure
  //   .input(
  //     z.object({
  //       title: z.string().min(1, "title is required"),
  //       content: z.string().min(1, "content is required"),
  //     })
  //   )
  //   .mutation(async ({ input }) => {
  //     const delivered = await notifyOwner(input);
  //     return {
  //       success: delivered,
  //     } as const;
  //   }),
});
