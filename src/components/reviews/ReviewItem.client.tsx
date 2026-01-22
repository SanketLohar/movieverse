"use client";

import Image from "next/image";
import { useState } from "react";
import { ReviewService } from "../../data/reviews/review.service";
import type { ReviewEntity } from "../../data/reviews/review.types";
import { seedUsers } from "../../data/reviews/review.seed";

type Props = {
  review: ReviewEntity;
  currentUserId: string;
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
  const [message, setMessage] = useState<string | null>(
    null
  );

  async function vote(type: "up" | "down") {
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

  async function remove() {
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

  return (
    <article className="rounded-lg border bg-white p-4 shadow-sm space-y-3">
      <header className="flex items-start gap-3">
        <Image
          src={user.avatar}
          alt={user.name}
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

          <div className="text-yellow-500 text-sm">
            {"★".repeat(review.content.rating)}
            {"☆".repeat(
              5 - review.content.rating
            )}
          </div>
        </div>
      </header>

      <p className="text-sm text-gray-700 leading-relaxed">
        {review.content.text}
      </p>

      <footer className="flex items-center gap-4 text-sm text-gray-600">
        <button
          onClick={() => vote("up")}
          className="hover:text-black"
        >
          👍 {review.votes.up}
        </button>

        <button
          onClick={() => vote("down")}
          className="hover:text-black"
        >
          👎 {review.votes.down}
        </button>

        {review.userId === currentUserId && (
          <div className="ml-auto">
            {!confirm ? (
              <button
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
                  onClick={remove}
                  className="text-red-600"
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </footer>

      {message && (
        <p className="text-xs text-green-600">
          {message}
        </p>
      )}
    </article>
  );
}
