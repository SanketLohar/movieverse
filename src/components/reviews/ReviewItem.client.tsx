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
  <article className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
    {/* Header */}
    <header className="flex items-start gap-4">
      <Image
        src={user.avatar}
        alt={user.name}
        width={44}
        height={44}
        className="rounded-full object-cover border"
      />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <strong className="text-sm font-semibold text-gray-900">
            {user.name}
          </strong>

          <span className="text-xs text-gray-500">
            {timeAgo(review.createdAt)}
          </span>
        </div>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-1 text-sm text-yellow-500">
          {"★".repeat(review.content.rating)}
          <span className="ml-2 text-xs text-gray-500">
            {review.content.rating}/5
          </span>
        </div>
      </div>
    </header>

    {/* Content */}
    <p className="mt-4 text-sm leading-relaxed text-gray-700">
      {review.content.text}
    </p>

    {/* Footer */}
    <footer className="mt-4 flex items-center justify-between text-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={() => vote("up")}
          className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-gray-100"
        >
          👍 <span>{review.votes.up}</span>
        </button>

        <button
          onClick={() => vote("down")}
          className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-gray-100"
        >
          👎 <span>{review.votes.down}</span>
        </button>
      </div>

      {review.userId === currentUserId && (
        <div>
          {!confirm ? (
            <button
              onClick={() => setConfirm(true)}
              className="text-xs text-red-600 hover:underline"
            >
              Delete
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs">
              <span>Delete?</span>
              <button
                onClick={remove}
                className="text-red-600"
              >
                Yes
              </button>
              <button onClick={() => setConfirm(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </footer>

    {message && (
      <p className="mt-2 text-xs text-red-500">
        {message}
      </p>
    )}
  </article>
);

}
