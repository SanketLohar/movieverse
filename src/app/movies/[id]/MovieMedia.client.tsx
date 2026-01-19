"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type Props = {
  trailerYoutubeId: string;
  images: string[];
};

export default function MovieMedia({
  trailerYoutubeId,
  images,
}: Props) {
  const [mode, setMode] = useState<"trailer" | "images">("images");
  const prefersReducedMotion = useReducedMotion();

  // =====================================
  // Phase 3.4.2 — Hover image prefetch
  // =====================================
  const prefetchImage = (src: string) => {
    const img = new Image();
    img.src = src;
  };

  return (
    <section className="space-y-4">
      {/* ===============================
          Tabs
      =============================== */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode("trailer")}
          className={`rounded border px-3 py-1 text-sm transition ${
            mode === "trailer"
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          Trailer
        </button>

        <button
          onClick={() => setMode("images")}
          className={`rounded border px-3 py-1 text-sm transition ${
            mode === "images"
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          Images
        </button>
      </div>

      {/* ===============================
          Media Area
      =============================== */}
      <AnimatePresence mode="wait">
        {mode === "trailer" ? (
          <motion.div
            key="trailer"
            initial={
              prefersReducedMotion ? false : { opacity: 0, y: 10 }
            }
            animate={
              prefersReducedMotion ? {} : { opacity: 1, y: 0 }
            }
            exit={
              prefersReducedMotion ? {} : { opacity: 0, y: -10 }
            }
            transition={{ duration: 0.25 }}
            className="aspect-video w-full overflow-hidden rounded-lg bg-black"
          >
            <iframe
              src={`https://www.youtube.com/embed/${trailerYoutubeId}`}
              title="Movie trailer"
              className="h-full w-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </motion.div>
        ) : (
          <motion.div
            key="images"
            initial={
              prefersReducedMotion ? false : { opacity: 0, y: 10 }
            }
            animate={
              prefersReducedMotion ? {} : { opacity: 1, y: 0 }
            }
            exit={
              prefersReducedMotion ? {} : { opacity: 0, y: -10 }
            }
            transition={{ duration: 0.25 }}
            className="flex gap-3 overflow-x-auto"
          >
            {images.map((src, index) => (
              <img
                key={src}
                src={src}
                alt="Movie still"
                className="h-48 rounded-lg object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                onMouseEnter={() => prefetchImage(src)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
