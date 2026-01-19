"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import MediaErrorBoundary from "./MediaErrorBoundary.client";

type Props = {
  trailerYoutubeId: string;
  images: string[];
};

type Tab = "trailer" | "images";

export default function MovieMedia({
  trailerYoutubeId,
  images,
}: Props) {
  const [mode, setMode] = useState<Tab>("images");
  const prefersReducedMotion = useReducedMotion();

  const trailerRef = useRef<HTMLButtonElement>(null);
  const imagesRef = useRef<HTMLButtonElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  // =====================================
  // Screen reader announcement
  // =====================================
  useEffect(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent =
        mode === "trailer"
          ? "Trailer tab selected"
          : "Images tab selected";
    }
  }, [mode]);

  // =====================================
  // Arrow key navigation (ARIA tabs)
  // =====================================
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    current: Tab
  ) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

    e.preventDefault();

    const next = current === "trailer" ? "images" : "trailer";

    setMode(next);

    requestAnimationFrame(() => {
      if (next === "trailer") {
        trailerRef.current?.focus();
      } else {
        imagesRef.current?.focus();
      }
    });
  };

  // =====================================
  // Image hover prefetch
  // =====================================
  const prefetchImage = (src: string) => {
    const img = new Image();
    img.src = src;
  };

  return (
    <section className="space-y-4">
      {/* Screen reader live region */}
      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* ===============================
          Tabs
      =============================== */}
      <div
  role="tablist"
  aria-label="Movie media"
  tabIndex={0}
  className="flex gap-2"
  onKeyDown={(e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

    e.preventDefault();

    setMode((prev) =>
      prev === "trailer" ? "images" : "trailer"
    );
  }}
>
  <button
    role="tab"
    aria-selected={mode === "trailer"}
    tabIndex={-1}
    onClick={() => setMode("trailer")}
    className={`rounded border px-3 py-1 text-sm ${
      mode === "trailer"
        ? "bg-black text-white"
        : "bg-white"
    }`}
  >
    Official Trailer
  </button>

  <button
    role="tab"
    aria-selected={mode === "images"}
    tabIndex={-1}
    onClick={() => setMode("images")}
    className={`rounded border px-3 py-1 text-sm ${
      mode === "images"
        ? "bg-black text-white"
        : "bg-white"
    }`}
  >
    Photos
  </button>
</div>


      {/* ===============================
          Media Panel
      =============================== */}
      <AnimatePresence mode="wait">
        {mode === "trailer" ? (
          <motion.div
            key="trailer"
            role="tabpanel"
            aria-labelledby="trailer"
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, y: 10 }
            }
            animate={
              prefersReducedMotion
                ? {}
                : { opacity: 1, y: 0 }
            }
            exit={
              prefersReducedMotion
                ? {}
                : { opacity: 0, y: -10 }
            }
            transition={{ duration: 0.25 }}
            className="aspect-video w-full overflow-hidden rounded-lg bg-black"
          >
            <MediaErrorBoundary
              fallback={
                <div className="flex h-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-500">
                  Trailer unavailable
                </div>
              }
            >
              <iframe
                src={`https://www.youtube.com/embed/${trailerYoutubeId}`}
                title="Movie trailer"
                className="h-full w-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </MediaErrorBoundary>
          </motion.div>
        ) : (
          <motion.div
            key="images"
            role="tabpanel"
            aria-labelledby="images"
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, y: 10 }
            }
            animate={
              prefersReducedMotion
                ? {}
                : { opacity: 1, y: 0 }
            }
            exit={
              prefersReducedMotion
                ? {}
                : { opacity: 0, y: -10 }
            }
            transition={{ duration: 0.25 }}
            className="flex gap-3 overflow-x-auto"
          >
            {images.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Movie still ${index + 1}`}
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
