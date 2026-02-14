import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import {
  getAllEvents,
  getEventById,
  createEventBooking,
  getEventBookingsByEventId,
  updateEventBookingStatus,
  getAffiliateLinksByEventId,
} from "../db";

export const eventsRouter = router({
  /**
   * Get all events with optional filters
   */
  getAll: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        source: z.enum(["visitsamroiyot", "partner", "internal"]).optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      return await getAllEvents({
        category: input?.category,
        source: input?.source,
        published: true,
        startDate: input?.startDate,
        endDate: input?.endDate,
      });
    }),

  /**
   * Get single event by ID
   */
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await getEventById(input.id);
    }),

  /**
   * Get events by category
   */
  getByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ input }) => {
      return await getAllEvents({ category: input.category, published: true });
    }),

  /**
   * Get events from Visit Sam Roi Yot
   */
  getFromVisitSamRoiYot: publicProcedure.query(async () => {
    return await getAllEvents({ source: "visitsamroiyot", published: true });
  }),

  /**
   * Book an event - creates a booking and tracks commission
   */
  bookEvent: publicProcedure
    .input(
      z.object({
        eventId: z.number(),
        guestName: z.string().min(1),
        guestEmail: z.string().email(),
        guestPhone: z.string().optional(),
        numberOfGuests: z.number().int().min(1).default(1),
        affiliateLinkUsed: z.boolean().default(false),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const event = await getEventById(input.eventId);
      if (!event) {
        throw new Error("Event not found");
      }

      // Calculate commission
      const totalPrice = (event.price || 0) * input.numberOfGuests;
      const commissionAmount = Math.round(
        (totalPrice * event.commissionRate) / 100
      );

      // Create booking
      const booking = await createEventBooking({
        eventId: input.eventId,
        userId: ctx.user?.id,
        guestName: input.guestName,
        guestEmail: input.guestEmail,
        guestPhone: input.guestPhone,
        numberOfGuests: input.numberOfGuests,
        totalPrice: totalPrice,
        totalPriceUsd: event.priceUsd
          ? Math.round((totalPrice / (event.price || 1)) * event.priceUsd)
          : undefined,
        commissionAmount: commissionAmount,
        commissionAmountUsd: event.priceUsd
          ? Math.round(
              (commissionAmount / (event.price || 1)) * event.priceUsd
            )
          : undefined,
        affiliateLinkUsed: input.affiliateLinkUsed ? 1 : 0,
        status: "pending",
        notes: input.notes,
      });

      // Generate booking reference
      const bookingRef = `EVT-${input.eventId}-${booking.id}-${Date.now().toString(36).toUpperCase()}`;
      await updateEventBookingStatus(booking.id, "confirmed");

      return {
        id: booking.id,
        bookingReference: bookingRef,
        totalPrice,
        commissionAmount,
        status: "confirmed",
        message: `Booking confirmed! Your booking reference is ${bookingRef}. We'll contact you shortly.`,
      };
    }),

  /**
   * Get bookings for an event (admin only)
   */
  getBookings: protectedProcedure
    .input(z.object({ eventId: z.number() }))
    .query(async ({ input, ctx }) => {
      // Only admins can view all bookings
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }

      return await getEventBookingsByEventId(input.eventId);
    }),

  /**
   * Get affiliate links for an event
   */
  getAffiliateLinks: publicProcedure
    .input(z.object({ eventId: z.number() }))
    .query(async ({ input }) => {
      return await getAffiliateLinksByEventId(input.eventId);
    }),

  /**
   * Get events dashboard stats (admin only)
   */
  getDashboardStats: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const allEvents = await getAllEvents({ published: true });

    // Calculate stats
    const totalEvents = allEvents.length;
    const visitSamRoiYotEvents = allEvents.filter(
      (e) => e.source === "visitsamroiyot"
    ).length;
    const partnerEvents = allEvents.filter((e) => e.source === "partner").length;
    const internalEvents = allEvents.filter(
      (e) => e.source === "internal"
    ).length;

    return {
      totalEvents,
      visitSamRoiYotEvents,
      partnerEvents,
      internalEvents,
      categories: Array.from(new Set(allEvents.map((e) => e.category))),
    };
  }),
});
