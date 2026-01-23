import { nanoid } from "nanoid";
import {
  getReviewsByMovie,
  getUserReview,
  getReviewById,
  createReview,
  softDeleteReview,
  voteReview,
} from "./review.repository";

import type {
  ReviewEntity,
  ReviewDraft,
} from "./review.types";

export class ReviewService {
  static async getMovieReviews(movieId: string) {
    return getReviewsByMovie(movieId);
  }

  static async submitReview(
    draft: ReviewDraft
  ): Promise<ReviewEntity> {
    const existing = getUserReview(
      draft.movieId,
      draft.userId
    );

    if (existing)
      throw new Error(
        "You have already reviewed this movie."
      );

    const now = Date.now();

    const review: ReviewEntity = {
      id: nanoid(),
      movieId: draft.movieId,
      userId: draft.userId,

      content: {
        text: draft.text.trim(),
        rating: draft.rating,
      },

      votes: { up: 0, down: 0 },

      userVotes: {},

      moderation: {
        isHidden: false,
        abuseFlags: 0,
        profanityDetected: false,
      },

      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };

    return createReview(review);
  }

  static async deleteReview(
    reviewId: string,
    userId: string
  ) {
    const review = getReviewById(reviewId);
    if (!review) throw new Error("Not found");
    if (review.userId !== userId)
      throw new Error("Permission denied");

    softDeleteReview(reviewId);
  }

  static async vote(
    reviewId: string,
    userId: string,
    type: "up" | "down"
  ) {
    const review = getReviewById(reviewId);
    if (!review) return;

    if (review.userId === userId)
      throw new Error(
        "You cannot vote your own review."
      );

    voteReview(reviewId, userId, type);
  }
}
