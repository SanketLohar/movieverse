"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getWatchlist, type WatchlistItem } from "../../lib/watchlist";

export default function WatchlistPage() {
  const [items] = useState<WatchlistItem[]>(getWatchlist());

  return (
    <section className="space-y-6 py-8">
      <h1 className="text-2xl font-bold">Your Watchlist</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">No movies in your watchlist yet.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((m) => (
            <li key={m.id} className="rounded border p-3">
              <Link
                href={`/movies/${m.id}`}
                className="font-medium hover:underline"
              >
                {m.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
