import type { z } from "zod";
import {
  ReviewSchema,
  ReviewDraftSchema,
} from "./review.schema";

export type ReviewEntity = z.infer<typeof ReviewSchema>;
export type ReviewDraft = z.infer<typeof ReviewDraftSchema>;
