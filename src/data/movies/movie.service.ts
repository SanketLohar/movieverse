import { getPopularMovies } from "./movie.repository";

export async function loadPopularMovies(page: number) {
  return getPopularMovies(page);
}
