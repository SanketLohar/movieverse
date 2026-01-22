import type { z } from "zod";
import {
  ReviewSchema,
  ReviewDraftSchema,
} from "./review.schema";

/* ---------------------------------------
   Canonical review types (Zod-derived)
---------------------------------------- */

// Full persisted review entity
export type ReviewEntity = z.infer<typeof ReviewSchema>;

// Draft used while writing / autosave
export type ReviewDraft = z.infer<typeof ReviewDraftSchema>;
