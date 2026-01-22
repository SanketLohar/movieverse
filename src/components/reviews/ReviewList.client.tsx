"use client";

import { useEffect, useMemo, useState } from "react";
import { ReviewService } from "../../data/reviews/review.service";
import { sortReviews } from "../../data/reviews/review.ranking";
import type { ReviewEntity } from "../../data/reviews/review.types";
import ReviewItem from "./ReviewItem.client";
import { dummyReviews } from "../../data/reviews/review.seed";

type Props = {
  movieId: string;
  currentUserId: string;
};

export default function ReviewList({
  movieId,
  currentUserId,
}: Props) {
  const [reviews, setReviews] = useState<ReviewEntity[]>([]);
  const [sort, setSort] =
    useState<"helpful" | "recent" | "controversial">("helpful");

  const [ratingFilter, setRatingFilter] =
    useState<number | "all">("all");

  const [onlyMine, setOnlyMine] = useState(false);

  /* ---------------------------------------
     Load reviews (real + dummy)
  ---------------------------------------- */
  useEffect(() => {
    ReviewService.getMovieReviews(movieId).then((real) => {
      const seeded = dummyReviews.filter(
        (r) => r.movieId === movieId
      );

      setReviews([
        ...real,
        ...seeded.filter(
          (d) => !real.some((r) => r.id === d.id)
        ),
      ]);
    });
  }, [movieId]);

  /* ---------------------------------------
     Filters
  ---------------------------------------- */
  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      if (r.deletedAt) return false;

      if (
        ratingFilter !== "all" &&
        r.content.rating !== ratingFilter
      ) {
        return false;
      }

      if (onlyMine && r.userId !== currentUserId) {
        return false;
      }

      return true;
    });
  }, [reviews, ratingFilter, onlyMine, currentUserId]);

  /* ---------------------------------------
     Sorting
  ---------------------------------------- */
  const sorted = useMemo(() => {
    return sortReviews(filtered, sort);
  }, [filtered, sort]);

  /* ---------------------------------------
     UI
  ---------------------------------------- */
  return (
    <section className="space-y-4">
      {/* ================= Filters ================= */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div>
          <span className="mr-1 text-gray-600">Sort:</span>
          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value as any)
            }
            className="rounded border px-2 py-1"
          >
            <option value="helpful">Most helpful</option>
            <option value="recent">Most recent</option>
            <option value="controversial">
              Controversial
            </option>
          </select>
        </div>

        <div>
          <span className="mr-1 text-gray-600">
            Rating:
          </span>
          <select
            value={ratingFilter}
            onChange={(e) =>
              setRatingFilter(
                e.target.value === "all"
                  ? "all"
                  : Number(e.target.value)
              )
            }
            className="rounded border px-2 py-1"
          >
            <option value="all">All</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} ★
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={onlyMine}
            onChange={(e) =>
              setOnlyMine(e.target.checked)
            }
          />
          My reviews
        </label>
      </div>

      {/* ================= Empty states ================= */}
      {reviews.length === 0 && (
        <p className="text-sm text-gray-500">
          No reviews yet. Be the first to review.
        </p>
      )}

      {onlyMine &&
        filtered.length === 0 &&
        reviews.length > 0 && (
          <p className="text-sm text-gray-500">
            You haven’t posted any review yet.
          </p>
        )}

      {!onlyMine &&
        sorted.length === 0 &&
        reviews.length > 0 && (
          <p className="text-sm text-gray-500">
            No reviews match the selected filters.
          </p>
        )}

      {/* ================= Review list ================= */}
      <ul className="space-y-4">
        {sorted.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            currentUserId={currentUserId}
            onChange={(deletedId) => {
              if (deletedId) {
                setReviews((prev) =>
                  prev.filter((r) => r.id !== deletedId)
                );
                return;
              }

              ReviewService.getMovieReviews(
                movieId
              ).then((real) => {
                const seeded = dummyReviews.filter(
                  (r) => r.movieId === movieId
                );

                setReviews([
                  ...real,
                  ...seeded.filter(
                    (d) =>
                      !real.some((r) => r.id === d.id)
                  ),
                ]);
              });
            }}
          />
        ))}
      </ul>
    </section>
  );
}
