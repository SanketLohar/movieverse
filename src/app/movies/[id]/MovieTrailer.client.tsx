"use client";

import { useState } from "react";

type Props = {
  youtubeId: string;
  title: string;
};

export default function MovieTrailer({ youtubeId, title }: Props) {
  const [activated, setActivated] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      {!activated ? (
        <button
          type="button"
          onClick={() => setActivated(true)}
          className="group absolute inset-0 flex items-center justify-center"
          aria-label="Play trailer"
        >
          {/* thumbnail */}
          <img
            src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
            alt={`${title} trailer preview`}
            className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
          />

          {/* play button */}
          <div className="absolute flex h-20 w-20 items-center justify-center rounded-full bg-black/70 text-white text-3xl">
            ▶
          </div>
        </button>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}
