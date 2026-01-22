import type { ReviewEntity } from "./review.types";

export const reviewMockDb: ReviewEntity[] = [
  {
    id: "r1",
    movieId: "1",
    userId: "u1",

    content: {
      text: "An incredible movie with a complex and engaging storyline.",
      rating: 5
    },

    votes: {
      up: 12,
      down: 1
    },

    moderation: {
      isHidden: false,
      abuseFlags: 0,
      profanityDetected: false
    },

    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    updatedAt: Date.now() - 1000 * 60 * 60 * 12,

    deletedAt: null
  }
];
