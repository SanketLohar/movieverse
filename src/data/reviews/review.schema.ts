import { z } from "zod";

/* ---------------------------------------
   Review content
---------------------------------------- */

export const ReviewContentSchema = z.object({
  text: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(2000, "Review too long"),

  rating: z.number().min(1).max(5)
});

/* ---------------------------------------
   Review moderation
---------------------------------------- */

export const ReviewModerationSchema = z.object({
  isHidden: z.boolean().default(false),
  abuseFlags: z.number().default(0),
  profanityDetected: z.boolean().default(false)
});

/* ---------------------------------------
   Review voting
---------------------------------------- */

export const ReviewVotesSchema = z.object({
  up: z.number().default(0),
  down: z.number().default(0)
});

/* ---------------------------------------
   Review entity (server truth)
---------------------------------------- */

export const ReviewSchema = z.object({
  id: z.string(),

  movieId: z.string(),
  userId: z.string(),

  content: ReviewContentSchema,

  votes: ReviewVotesSchema,

  moderation: ReviewModerationSchema,

  createdAt: z.number(),
  updatedAt: z.number(),

  deletedAt: z.number().nullable()
});

/* ---------------------------------------
   Draft review (IndexedDB)
---------------------------------------- */

export const ReviewDraftSchema = z.object({
  movieId: z.string(),
  userId: z.string(),

  text: z.string(),
  rating: z.number().min(1).max(5),

  savedAt: z.number()
});
export type Review = z.infer<typeof ReviewSchema>;
