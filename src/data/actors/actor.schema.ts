import { z } from "zod";

/* ---------------------------------------
   Localized text (i18n ready)
---------------------------------------- */

export const LocalizedTextSchema = z.object({
  en: z.string(),
  hi: z.string().optional(),
});

export type LocalizedText = z.infer<
  typeof LocalizedTextSchema
>;

/* ---------------------------------------
   Filmography item
---------------------------------------- */

export const FilmographyItemSchema = z.object({
  id: z.string(),
  title: LocalizedTextSchema,
  year: z.number(),
  role: LocalizedTextSchema,
  genre: z.array(z.string()),
});

export type FilmographyItem = z.infer<
  typeof FilmographyItemSchema
>;

/* ---------------------------------------
   Actor entity
---------------------------------------- */

export const ActorSchema = z.object({
  id: z.string(),
  name: LocalizedTextSchema,
  bio: LocalizedTextSchema,
  profileImage: z.string(),
  filmography: z.array(FilmographyItemSchema),
});

export type ActorEntity = z.infer<
  typeof ActorSchema
>;
