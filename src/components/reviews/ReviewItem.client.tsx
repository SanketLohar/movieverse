"use client";

import Image from "next/image";
import { useState } from "react";
import { ReviewService } from "../../data/reviews/review.service";
import type { ReviewEntity } from "../../data/reviews/review.types";
import { seedUsers } from "../../data/reviews/review.seed";

type Props = {
  review: ReviewEntity;
  currentUserId?: string;
  onChange: (deletedId?: string) => void;
};

/* ---------------------------------------
   Helpers
---------------------------------------- */

function timeAgo(timestamp: number) {
  const diff = Date.now() - timestamp;

  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

function getUser(userId: string) {
  return (
    seedUsers.find((u) => u.id === userId) ?? {
      id: userId,
      name: "Anonymous",
      avatar: "/avatars/default.png",
    }
  );
}

/* ---------------------------------------
   Component
---------------------------------------- */

export default function ReviewItem({
  review,
  currentUserId,
  onChange,
}: Props) {
  const user = getUser(review.userId);

  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // ✅ current user's vote
  const myVote =
    currentUserId &&
    review.userVotes[currentUserId];

  /* ---------------------------------------
     Vote
  ---------------------------------------- */

  async function vote(type: "up" | "down") {
    if (!currentUserId) {
      setMessage("Login required to vote.");
      return;
    }

    try {
      await ReviewService.vote(
        review.id,
        currentUserId,
        type
      );
      onChange();
    } catch (err) {
      setMessage((err as Error).message);
    }
  }

  /* ---------------------------------------
     Delete
  ---------------------------------------- */

  async function remove() {
    if (!currentUserId) {
      setMessage("Login required to delete review.");
      return;
    }

    try {
      await ReviewService.deleteReview(
        review.id,
        currentUserId
      );
      onChange(review.id);
    } catch (err) {
      setMessage((err as Error).message);
    }
  }

  /* ---------------------------------------
     UI
  ---------------------------------------- */

  return (
    <article className="space-y-3 rounded-lg border bg-white p-4 shadow-sm">
      {/* Header */}
      <header className="flex items-start gap-3">
        <Image
          src={user.avatar}
          alt={`${user.name} avatar`}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <strong className="text-sm">
              {user.name}
            </strong>
            <span className="text-xs text-gray-500">
              {timeAgo(review.createdAt)}
            </span>
          </div>

          <div
            className="text-yellow-500 text-sm"
            aria-label={`Rating ${review.content.rating} out of 5`}
          >
            {"★".repeat(review.content.rating)}
            {"☆".repeat(
              5 - review.content.rating
            )}
          </div>
        </div>
      </header>

      {/* Review text */}
      <p className="text-sm text-gray-700 leading-relaxed">
        {review.content.text}
      </p>

      {/* Actions */}
      <footer className="flex items-center gap-4 text-sm text-gray-600">
        <button
          aria-label="Upvote review"
          onClick={() => vote("up")}
          className={
            myVote === "up"
              ? "text-green-600 font-semibold"
              : "hover:text-black"
          }
        >
          👍 {review.votes.up}
        </button>

        <button
          aria-label="Downvote review"
          onClick={() => vote("down")}
          className={
            myVote === "down"
              ? "text-red-600 font-semibold"
              : "hover:text-black"
          }
        >
          👎 {review.votes.down}
        </button>

        {/* Owner actions */}
        {review.userId === currentUserId && (
          <div className="ml-auto">
            {!confirm ? (
              <button
                aria-label="Delete review"
                onClick={() => setConfirm(true)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs">
                  Delete review?
                </span>

                <button
                  aria-label="Confirm delete review"
                  onClick={remove}
                  className="text-red-600"
                >
                  Yes
                </button>

                <button
                  aria-label="Cancel delete review"
                  onClick={() =>
                    setConfirm(false)
                  }
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </footer>

      {/* Status message */}
      {message && (
        <p
          className="text-xs text-green-600"
          role="status"
        >
          {message}
        </p>
      )}
    </article>
  );
}
