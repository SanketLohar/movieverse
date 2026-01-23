import type { ReviewEntity } from "./review.types";

const STORAGE_KEY = "movieverse:reviews";

/* ---------------------------------------
   Load + migrate
---------------------------------------- */

function load(): ReviewEntity[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as ReviewEntity[];

    // ✅ MIGRATION: add userVotes if missing
    return parsed.map((r) => ({
      ...r,
      userVotes: r.userVotes ?? {},
    }));
  } catch {
    return [];
  }
}

function save(data: ReviewEntity[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}

/* ---------------------------------------
   In-memory store
---------------------------------------- */

let reviewStore: ReviewEntity[] = load();

/* ---------------------------------------
   Queries
---------------------------------------- */

export function getReviewsByMovie(movieId: string) {
  return reviewStore.filter(
    (r) =>
      r.movieId === movieId &&
      r.deletedAt === null
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

export function createReview(review: ReviewEntity) {
  reviewStore.unshift({
    ...review,
    userVotes: review.userVotes ?? {},
  });

  save(reviewStore);
  return review;
}

export function softDeleteReview(id: string) {
  const r = reviewStore.find(
    (x) => x.id === id
  );
  if (!r) return;

  r.deletedAt = Date.now();
  r.updatedAt = Date.now();
  save(reviewStore);
}

export function voteReview(
  id: string,
  userId: string,
  type: "up" | "down"
) {
  const review = reviewStore.find(
    (r) =>
      r.id === id &&
      r.deletedAt === null
  );

  if (!review) return;

  // ✅ safety guarantee
  review.userVotes ??= {};

  const previous =
    review.userVotes[userId];

  if (previous === "up") review.votes.up--;
  if (previous === "down") review.votes.down--;

  if (previous === type) {
    delete review.userVotes[userId];
    save(reviewStore);
    return;
  }

  review.userVotes[userId] = type;
  review.votes[type]++;
  save(reviewStore);
}
