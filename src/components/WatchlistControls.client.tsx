"use client";

import { watchlistService } from "../data/watchlist/watchlist.service";

export default function WatchlistControls({
  onCleared,
}: {
  onCleared: () => void;
}) {
  async function clearAll() {
    if (!confirm("Clear entire watchlist?")) return;

    await watchlistService.clear();
    onCleared();
  }

  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={clearAll}
        className="text-sm text-red-600 hover:underline"
      >
        Clear watchlist
      </button>
    </div>
  );
}
