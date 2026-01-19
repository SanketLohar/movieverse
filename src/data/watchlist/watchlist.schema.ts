import { z } from "zod";

export const WatchlistItemSchema = z.object({
  id: z.string(),
  type: z.enum(["movie", "actor"]),
  addedAt: z.number(),
  updatedAt: z.number(),
  deleted: z.boolean(),
  version: z.number()
});

export type WatchlistItem = z.infer<typeof WatchlistItemSchema>;
