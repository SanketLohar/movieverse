import { z } from "zod";

export const MovieSchema = z.object({
id: z.string(),
title: z.string(),
year: z.number(),
description: z.string(),
});

export type Movie = z.infer<typeof MovieSchema>;
