import { z } from "zod";

export const MovieSchema = z.object({
  id: z.string(),
  title: z.string(),
  year: z.number(),
  description: z.string(),

  media: z.object({
    trailer: z.string(),
    stills: z.array(z.string()),
  }),
});

export type Movie = z.infer<typeof MovieSchema>;
