import { getMovieById } from "../data/movies/movie.repository";

/**
 * Preload adjacent movie data
 */
export async function preloadAdjacentMovies(id: string) {
  const numericId = Number(id);

  if (Number.isNaN(numericId)) return;

  const prev = String(numericId - 1);
  const next = String(numericId + 1);

  // Warm server cache
  getMovieById(prev).catch(() => {});
  getMovieById(next).catch(() => {});
}
