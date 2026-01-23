"use client";

import { useEffect, useState } from "react";
import { watchlistService } from "../../data/watchlist/watchlist.service";
import type { WatchlistItem } from "../../data/watchlist/watchlist.schema";

import { movies } from "../../lib/data";
import { actors } from "../../lib/actors";

type ResolvedItem = {
  id: string;
  type: "movie" | "actor";
  title: string;
};

export default function WatchlistPage() {
  const [items, setItems] = useState<ResolvedItem[]>([]);
  const [ready, setReady] = useState(
    watchlistService.isReady()
  );

  function resolveItems(
    raw: WatchlistItem[]
  ): ResolvedItem[] {
    return raw
      .map((item) => {
        if (item.type === "movie") {
          const movie = movies.find(
            (m) => m.id === item.id
          );
          if (!movie) return null;

          return {
            id: item.id,
            type: "movie",
            title: movie.title,
          };
        }

        if (item.type === "actor") {
          const actor = actors.find(
            (a) => a.id === item.id
          );
          if (!actor) return null;

          return {
            id: item.id,
            type: "actor",
            title: actor.name.en,
          };
        }

        return null;
      })
      .filter(Boolean) as ResolvedItem[];
  }

  useEffect(() => {
    const sync = () => {
      setReady(watchlistService.isReady());
      const raw = watchlistService.getAll();
      setItems(resolveItems(raw));
    };

    const unsubscribe =
      watchlistService.subscribe(sync);

    if (watchlistService.isReady()) {
      sync();
    }

    return unsubscribe;
  }, []);

  if (!ready) {
    return (
      <p className="py-8 text-gray-500">
        Loading watchlist…
      </p>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-sm text-gray-500">
        Your watchlist is empty.  
        Start exploring movies and actors to add them here.
      </div>
    );
  }

  return (
    <section className="space-y-8 py-6">
      <h1 className="text-2xl font-bold">
        Your Watchlist
      </h1>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold">
                {item.title}
              </p>
              <p className="text-xs text-gray-500">
                {item.type === "movie"
                  ? "Movie"
                  : "Actor"}
              </p>
            </div>

            <button
              onClick={() =>
                watchlistService.remove(item.id)
              }
              className="text-sm text-red-600 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
