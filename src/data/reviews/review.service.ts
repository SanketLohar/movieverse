import { nanoid } from "nanoid";

import {
  getReviewsByMovie,
  getUserReview,
  getReviewById,
  createReview,
  softDeleteReview,
  voteReview
} from "./review.repository";

import type {
  ReviewEntity,
  ReviewDraft
} from "./review.types";

export class ReviewService {
  /* ---------------------------------------
     Queries
  ---------------------------------------- */

  static async getMovieReviews(
    movieId: string
  ): Promise<ReviewEntity[]> {
    return getReviewsByMovie(movieId);
  }

  /* ---------------------------------------
     Create review
  ---------------------------------------- */

  static async submitReview(
    draft: ReviewDraft
  ): Promise<ReviewEntity> {
    const text = draft.text.trim();

    if (text.split(/\s+/).length < 1) {
      throw new Error(
        "Review must contain at least one word."
      );
    }

    const existing = getUserReview(
      draft.movieId,
      draft.userId
    );

    if (existing) {
      throw new Error(
        "You have already reviewed this movie."
      );
    }

    const now = Date.now();

    const review: ReviewEntity = {
      id: nanoid(),
      movieId: draft.movieId,
      userId: draft.userId,

      content: {
        text,
        rating: draft.rating
      },

      votes: {
        up: 0,
        down: 0
      },

      moderation: {
        isHidden: false,
        abuseFlags: 0,
        profanityDetected: false
      },

      createdAt: now,
      updatedAt: now,
      deletedAt: null
    };

    return createReview(review);
  }

  /* ---------------------------------------
     Delete review
  ---------------------------------------- */

  static async deleteReview(
    reviewId: string,
    userId: string
  ): Promise<void> {
    const review = getReviewById(reviewId);

    if (!review) {
      throw new Error("Review not found");
    }

    if (review.userId !== userId) {
      throw new Error("Permission denied");
    }

    if (review.deletedAt !== null) {
      return;
    }

    softDeleteReview(reviewId);
  }

  /* ---------------------------------------
     Vote review
  ---------------------------------------- */

  static async vote(
    reviewId: string,
    userId: string,
    type: "up" | "down"
  ): Promise<void> {
    const review = getReviewById(reviewId);

    if (!review) return;

    if (review.deletedAt !== null) return;

    if (review.userId === userId) {
      throw new Error(
        "You cannot vote your own review."
      );
    }

    voteReview(reviewId, type);
  }
}
