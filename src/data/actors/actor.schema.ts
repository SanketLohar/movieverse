import { z } from "zod";

/**
 * Localized string (i18n-ready)
 */
export const LocalizedTextSchema = z.object({
  en: z.string()
});

export type LocalizedText = z.infer<typeof LocalizedTextSchema>;

export const FilmographyItemSchema = z.object({
  id: z.string(),
  title: LocalizedTextSchema,
  year: z.number(),
  role: LocalizedTextSchema,
  genre: z.array(z.string())
});

export const ActorSchema = z.object({
  id: z.string(),
  name: LocalizedTextSchema,
  bio: LocalizedTextSchema,
  profileImage: z.string(),
  filmography: z.array(FilmographyItemSchema)
});

export type ActorEntity = z.infer<typeof ActorSchema>;
