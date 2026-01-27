"use client";

import { useState } from "react";
import MovieTrailer from "./MovieTrailer.client";
import MovieCarousel from "./MovieCarousel.client";

type Props = {
  trailerId: string;
  images: string[];
  title: string;
};

export default function MovieMediaSwitcher({
  trailerId,
  images,
  title,
}: Props) {
  const [mode, setMode] = useState<"trailer" | "images">("trailer");

  return (
    <section className="space-y-3">
      {/* Tabs */}
      <div className="flex border-b text-sm font-medium">
        <button
          type="button"
          onClick={() => setMode("trailer")}
          className={`
            flex-1 py-3 text-center transition
            ${
              mode === "trailer"
                ? "border-b-2 border-yellow-400 text-black"
                : "text-gray-500 hover:text-gray-700"
            }
          `}
        >
          Trailer
        </button>

        <button
          type="button"
          onClick={() => setMode("images")}
          className={`
            flex-1 py-3 text-center transition
            ${
              mode === "images"
                ? "border-b-2 border-yellow-400 text-black"
                : "text-gray-500 hover:text-gray-700"
            }
          `}
        >
          Photos
        </button>
      </div>

      {/* Media container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        {mode === "trailer" ? (
          <MovieTrailer
            youtubeId={trailerId}
            title={title}
          />
        ) : (
          <MovieCarousel images={images} />
        )}
      </div>
    </section>
  );
}
