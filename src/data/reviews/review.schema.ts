import { z } from "zod";

export const ReviewSchema = z.object({
  id: z.string(),
  movieId: z.string(),
  userId: z.string(),

  content: z.object({
    text: z.string().min(10),
    rating: z.number().min(1).max(5),
  }),

  votes: z.object({
    up: z.number(),
    down: z.number(),
  }),

  // ✅ THIS FIXES ALL ERRORS
  userVotes: z.record(
    z.string(),
    z.enum(["up", "down"])
  ),

  moderation: z.object({
    isHidden: z.boolean(),
    abuseFlags: z.number(),
    profanityDetected: z.boolean(),
  }),

  createdAt: z.number(),
  updatedAt: z.number(),
  deletedAt: z.number().nullable(),
});

export const ReviewDraftSchema = z.object({
  movieId: z.string(),
  userId: z.string(),
  text: z.string(),
  rating: z.number(),
  savedAt: z.number(),
});
