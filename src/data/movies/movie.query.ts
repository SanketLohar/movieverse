import { useQuery } from "@tanstack/react-query";
import { loadPopularMovies } from "./movie.service";
import { movieKeys } from "./movie.keys";
import type { MoviePage } from "./movie.types";

export function usePopularMovies(page: number) {
  return useQuery<MoviePage>({
    queryKey: movieKeys.page(page),
    queryFn: () => loadPopularMovies(page),

    staleTime: 1000 * 60 * 5,
    retry: 2,

    // ✅ v5 replacement for keepPreviousData
    placeholderData: (previousData) => previousData,

    refetchOnWindowFocus: true,
  });
}
