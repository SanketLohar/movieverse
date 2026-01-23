"use client";

import Image from "next/image";
import { watchlistService } from "../data/watchlist/watchlist.service";

type Props = {
  movie: {
    id: string;
    title: string;
    poster?: string;
  };
  onRemoved: () => void;
};

export default function WatchlistItem({
  movie,
  onRemoved,
}: Props) {
  async function remove() {
    await watchlistService.remove(movie.id);
    onRemoved();
  }

  return (
    <article className="relative rounded-lg border p-3 bg-white">
      {movie.poster && (
        <Image
          src={movie.poster}
          alt={movie.title}
          width={120}
          height={180}
          className="rounded mb-2"
        />
      )}

      <p className="text-sm font-medium">
        {movie.title}
      </p>

      <button
        onClick={remove}
        className="mt-2 text-xs text-red-600 hover:underline"
        aria-label="Remove from watchlist"
      >
        Remove
      </button>
    </article>
  );
}
