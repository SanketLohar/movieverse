import type { ReviewEntity } from "./review.types";

/* ---------------------------------------
   Wilson score interval
---------------------------------------- */

/**
 * Wilson score lower bound
 * Used by Reddit, IMDb, StackOverflow
 */
export function wilsonScore(
  up: number,
  down: number,
  z = 1.96 // 95% confidence
): number {
  const n = up + down;

  if (n === 0) return 0;

  const phat = up / n;

  return (
    (phat +
      (z * z) / (2 * n) -
      z *
        Math.sqrt(
          (phat * (1 - phat) +
            (z * z) / (4 * n)) /
            n
        )) /
    (1 + (z * z) / n)
  );
}

/* ---------------------------------------
   Review ranking helpers
---------------------------------------- */

export function scoreReview(
  review: ReviewEntity
): number {
  return wilsonScore(
    review.votes.up,
    review.votes.down
  );
}

/* ---------------------------------------
   Controversial score
---------------------------------------- */

export function controversialScore(
  review: ReviewEntity
): number {
  const up = review.votes.up;
  const down = review.votes.down;

  if (up === 0 || down === 0) return 0;

  return (
    Math.min(up, down) /
    Math.max(up, down)
  );
}

/* ---------------------------------------
   Sorting strategies
---------------------------------------- */

export type ReviewSort =
  | "helpful"
  | "recent"
  | "controversial";

export function sortReviews(
  reviews: ReviewEntity[],
  sort: ReviewSort
): ReviewEntity[] {
  const copy = [...reviews];

  switch (sort) {
    case "helpful":
      return copy.sort(
        (a, b) =>
          scoreReview(b) - scoreReview(a)
      );

    case "recent":
      return copy.sort(
        (a, b) =>
          b.createdAt - a.createdAt
      );

    case "controversial":
      return copy.sort(
        (a, b) =>
          controversialScore(b) -
          controversialScore(a)
      );

    default:
      return copy;
  }
}
