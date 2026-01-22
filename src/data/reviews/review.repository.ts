import type { ReviewEntity } from "./review.types";

const STORAGE_KEY = "movieverse:reviews";

/* ---------------------------------------
   Persistence helpers
---------------------------------------- */

function load(): ReviewEntity[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(data: ReviewEntity[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* ---------------------------------------
   In-memory cache
---------------------------------------- */

let reviewStore: ReviewEntity[] = load();

/* ---------------------------------------
   Queries
---------------------------------------- */

export function getReviewsByMovie(
  movieId: string
): ReviewEntity[] {
  return reviewStore.filter(
    (r) =>
      r.movieId === movieId &&
      r.deletedAt === null &&
      !r.moderation.isHidden
  );
}

export function getUserReview(
  movieId: string,
  userId: string
) {
  return reviewStore.find(
    (r) =>
      r.movieId === movieId &&
      r.userId === userId &&
      r.deletedAt === null
  );
}

export function getReviewById(id: string) {
  return reviewStore.find((r) => r.id === id);
}

/* ---------------------------------------
   Mutations
---------------------------------------- */

export function createReview(
  review: ReviewEntity
) {
  reviewStore.unshift(review);
  save(reviewStore);
  return review;
}

export function softDeleteReview(
  id: string
) {
  const review = reviewStore.find(
    (r) => r.id === id
  );

  if (!review) return;

  review.deletedAt = Date.now();
  review.updatedAt = Date.now();

  save(reviewStore);
}

export function voteReview(
  id: string,
  type: "up" | "down"
) {
  const review = reviewStore.find(
    (r) =>
      r.id === id &&
      r.deletedAt === null
  );

  if (!review) return;

  review.votes[type]++;
  save(reviewStore);
}
