import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { chatbotRouter } from "./chatbotRouter";
import { eventsRouter } from "./routers/events";
import { leadsRouter } from "./routers/leads";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as db from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  chatbot: chatbotRouter,
  events: eventsRouter,
  leads: leadsRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Admin-only procedure
  properties: router({
    list: publicProcedure
      .input(z.object({
        propertyType: z.string().optional(),
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
        features: z.array(z.string()).optional(),
        status: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        return db.getAllProperties(input);
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const property = await db.getPropertyById(input.id);
        if (!property) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Property not found' });
        }
        return property;
      }),
    
    featured: publicProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return db.getFeaturedProperties(input?.limit);
      }),
    
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        titleTh: z.string().optional(),
        description: z.string(),
        descriptionTh: z.string().optional(),
        propertyType: z.enum(['condo', 'house', 'villa', 'land']),
        price: z.number(),
        priceUsd: z.number().optional(),
        sizeSqm: z.number().optional(),
        sizeRai: z.string().optional(),
        bedrooms: z.number().optional(),
        bathrooms: z.number().optional(),
        features: z.array(z.string()),
        images: z.array(z.string()),
        videoUrl: z.string().optional(),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        address: z.string().optional(),
        addressTh: z.string().optional(),
        fazwazUrl: z.string().optional(),
        status: z.enum(['available', 'sold', 'pending']).optional(),
        featured: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        const data = {
          ...input,
          features: JSON.stringify(input.features),
          images: JSON.stringify(input.images),
        };
        return db.createProperty(data);
      }),
    
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        titleTh: z.string().optional(),
        description: z.string().optional(),
        descriptionTh: z.string().optional(),
        propertyType: z.enum(['condo', 'house', 'villa', 'land']).optional(),
        price: z.number().optional(),
        priceUsd: z.number().optional(),
        sizeSqm: z.number().optional(),
        sizeRai: z.string().optional(),
        bedrooms: z.number().optional(),
        bathrooms: z.number().optional(),
        features: z.array(z.string()).optional(),
        images: z.array(z.string()).optional(),
        videoUrl: z.string().optional(),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        address: z.string().optional(),
        addressTh: z.string().optional(),
        fazwazUrl: z.string().optional(),
        status: z.enum(['available', 'sold', 'pending']).optional(),
        featured: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        const { id, ...data } = input;
        const updateData: any = { ...data };
        if (data.features) updateData.features = JSON.stringify(data.features);
        if (data.images) updateData.images = JSON.stringify(data.images);
        return db.updateProperty(id, updateData);
      }),
    
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        return db.deleteProperty(input.id);
      }),
  }),

  inquiries: router({
    create: publicProcedure
      .input(z.object({
        propertyId: z.number().optional(),
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        message: z.string(),
        inquiryType: z.enum(['property', 'concierge', 'general']),
      }))
      .mutation(async ({ input }) => {
        const result = await db.createInquiry(input);
        
        // Send notification to owner
        const propertyInfo = input.propertyId 
          ? await db.getPropertyById(input.propertyId)
          : null;
        
        const title = `New ${input.inquiryType} inquiry from ${input.name}`;
        const content = `
Name: ${input.name}
Email: ${input.email}
${input.phone ? `Phone: ${input.phone}\n` : ''}${propertyInfo ? `Property: ${propertyInfo.title}\n` : ''}Message: ${input.message}`;
        
        await notifyOwner({ title, content });
        
        return result;
      }),
    
    list: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        return db.getAllInquiries();
      }),
    
    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['new', 'contacted', 'closed']),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        return db.updateInquiryStatus(input.id, input.status);
      }),
  }),

  lifestyle: router({
    list: publicProcedure
      .query(async () => {
        return db.getAllLifestyleArticles(true);
      }),
    
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const article = await db.getLifestyleArticleBySlug(input.slug);
        if (!article) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Article not found' });
        }
        return article;
      }),
    
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        titleTh: z.string().optional(),
        slug: z.string(),
        excerpt: z.string(),
        excerptTh: z.string().optional(),
        content: z.string(),
        contentTh: z.string().optional(),
        coverImage: z.string().optional(),
        category: z.string().optional(),
        published: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        return db.createLifestyleArticle(input);
      }),
  }),
});

export type AppRouter = typeof appRouter;
