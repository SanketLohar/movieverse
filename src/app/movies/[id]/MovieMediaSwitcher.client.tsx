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
    <section className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setMode("trailer")}
          className={`px-3 py-1 text-sm ${
            mode === "trailer"
              ? "border-b-2 border-yellow-400 font-medium"
              : "text-gray-500"
          }`}
        >
          Official Trailer
        </button>

        <button
          onClick={() => setMode("images")}
          className={`px-3 py-1 text-sm ${
            mode === "images"
              ? "border-b-2 border-yellow-400 font-medium"
              : "text-gray-500"
          }`}
        >
          Stills & Photos
        </button>
      </div>

      {/* MEDIA STAGE (this fixes everything) */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        {mode === "trailer" ? (
          <MovieTrailer youtubeId={trailerId} title={title} />
        ) : (
          <MovieCarousel images={images} />
        )}
      </div>
    </section>
  );
}
