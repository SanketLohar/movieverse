"use client";

import { useEffect, useState } from "react";
import { ReviewService } from "../../data/reviews/review.service";
import {
  getDraft,
  saveDraft,
  deleteDraft,
} from "../../data/reviews/review.draft.repository";
import { useAuth } from "../../auth/useAuth";
import { canPerformAction } from "../../lib/rateLimiter";

type Props = {
  movieId: string;
  onSubmitted: () => void;
};

export default function ReviewEditor({
  movieId,
  onSubmitted,
}: Props) {
  const { session } = useAuth();
  const userId = session?.user.id ?? null;

  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  /* ---------------------------------------
     Restore draft
  ---------------------------------------- */

  useEffect(() => {
    if (!userId) return;

    getDraft(movieId, userId).then((draft) => {
      if (!draft) return;
      setText(draft.text);
      setRating(draft.rating);
    });
  }, [movieId, userId]);

  /* ---------------------------------------
     Autosave
  ---------------------------------------- */

  useEffect(() => {
    if (!userId) return;

    const t = setTimeout(() => {
      saveDraft({
        movieId,
        userId,
        text,
        rating,
        savedAt: Date.now(),
      });
    }, 600);

    return () => clearTimeout(t);
  }, [text, rating, movieId, userId]);

  /* ---------------------------------------
     Submit (rate limit here ONLY)
  ---------------------------------------- */

  async function submit() {
    if (!userId) return;

    if (!canPerformAction()) {
      setError("Too many actions. Please wait.");
      return;
    }

    setError(null);
    setSuccess(null);

    const trimmed = text.trim();
    const words = trimmed.split(/\s+/);

    if (words.length < 2 || trimmed.length < 10) {
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
        text: trimmed,
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

  /* ---------------------------------------
     Render
  ---------------------------------------- */

  if (!session) {
    return (
      <div className="rounded border p-4 text-sm text-gray-600">
        Login required to write a review.
      </div>
    );
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
        <p className="text-sm text-red-600">{error}</p>
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
