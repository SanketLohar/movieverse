"use client";

import { useEffect, useState } from "react";
import { ReviewService } from "../../data/reviews/review.service";
import {
  getDraft,
  saveDraft,
  deleteDraft,
} from "../../data/reviews/review.draft.repository";

type Props = {
  movieId: string;
  userId: string;
  onSubmitted: () => void;
};

export default function ReviewEditor({
  movieId,
  userId,
  onSubmitted,
}: Props) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  /* Restore draft */
  useEffect(() => {
    getDraft(movieId, userId).then((draft) => {
      if (!draft) return;
      setText(draft.text);
      setRating(draft.rating);
    });
  }, [movieId, userId]);

  /* Autosave */
  useEffect(() => {
    const t = setTimeout(() => {
      saveDraft({
        movieId,
        userId,
        text,
        rating,
        savedAt: Date.now(),
      });
    }, 400);

    return () => clearTimeout(t);
  }, [text, rating, movieId, userId]);

  async function submit() {
    setError(null);
    setSuccess(null);

    const words = text.trim().split(/\s+/);

    if (words.length < 2 || text.trim().length < 10) {
      setError(
        "Review must contain at least 2 words and 10 characters."
      );
      return;
    }

    setLoading(true);

    try {
      await ReviewService.submitReview({
        movieId,
        userId,
        text,
        rating,
        savedAt: Date.now(),
      });

      await deleteDraft(movieId, userId);

      setText("");
      setRating(5);

      setSuccess("Review posted successfully.");
      onSubmitted();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-3 rounded-lg border p-4">
      <h3 className="font-semibold">Write a review</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder="Share your thoughts..."
        className="w-full resize-none rounded border p-2 text-sm"
      />

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p className="text-sm text-green-600">
          {success}
        </p>
      )}

      <div className="flex items-center justify-between">
        <select
          value={rating}
          onChange={(e) =>
            setRating(Number(e.target.value))
          }
          className="rounded border px-2 py-1 text-sm"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} ★
            </option>
          ))}
        </select>

        <button
          onClick={submit}
          disabled={loading}
          className="rounded bg-black px-4 py-1.5 text-sm text-white disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </section>
  );
}
