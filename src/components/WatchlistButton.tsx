"use client";

import { useState } from "react";
import {
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
  type WatchlistItem,
} from "../lib/watchlist";

type Props = {
  item: WatchlistItem;
};

export default function WatchlistButton({ item }: Props) {
  // ✅ Read from localStorage synchronously ONCE
  const [saved, setSaved] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return isInWatchlist(item.id);
  });

  function toggleWatchlist() {
    if (saved) {
      removeFromWatchlist(item.id);
      setSaved(false);
    } else {
      addToWatchlist(item);
      setSaved(true);
    }
  }

  return (
    <button
      onClick={toggleWatchlist}
      className={`rounded px-4 py-2 font-semibold transition-colors
        ${
          saved
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-200 text-gray-900 hover:bg-gray-300"
        }
      `}
      aria-live="polite"
    >
      {saved ? "✓ In Watchlist" : "+ Add to Watchlist"}
    </button>
  );
}
