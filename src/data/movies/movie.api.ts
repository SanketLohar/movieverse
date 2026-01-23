// src/data/movies/movie.api.ts

const TMDB_BASE = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;

export async function fetchPopularMovies(page: number) {
  const res = await fetch(
    `${TMDB_BASE}/movie/popular?api_key=${API_KEY}&page=${page}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return res.json();
}
