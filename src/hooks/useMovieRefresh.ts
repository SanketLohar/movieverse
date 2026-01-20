"use client";

import { useEffect, useState } from "react";
import type { Movie } from "../data/movies/movie.schema";

export function useMovieRefresh(
  initialMovie: Movie
) {
  const [movie, setMovie] = useState<Movie>(initialMovie);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // do nothing if offline
    if (!navigator.onLine) return;

    let cancelled = false;

    async function refresh() {
      try {
        setIsRefreshing(true);

        const res = await fetch(
          `/api/movies/${initialMovie.id}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) return;

        const fresh = await res.json();

        if (!cancelled) {
          setMovie(fresh);
        }
      } catch {
        // silent failure
      } finally {
        if (!cancelled) {
          setIsRefreshing(false);
        }
      }
    }

    // slight delay avoids layout shift
    const timer = setTimeout(refresh, 800);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [initialMovie.id]);

  return { movie, isRefreshing };
}
