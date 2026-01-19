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
  const [items, setItems] = useState<ResolvedItem[]>(
    []
  );
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
      <p className="py-8 text-gray-600">
        Your watchlist is empty.
      </p>
    );
  }

  return (
    <section className="py-8 space-y-4">
      <h1 className="text-2xl font-bold">
        Your Watchlist
      </h1>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded border p-3"
          >
            <div className="font-semibold">
              {item.title}
            </div>

            {/* <div className="text-xs text-gray-400">
  {item.type === "movie" ? "Movie" : "Actor"}
</div> */}

          </li>
        ))}
      </ul>
    </section>
  );
}
