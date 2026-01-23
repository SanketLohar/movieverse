"use client";

import { useState } from "react";
import { usePopularMovies } from "../../data/movies/movie.query";

export default function MovieListClient() {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isFetching,
  } = usePopularMovies(page);

  if (isLoading) {
    return <p>Loading movies...</p>;
  }

  return (
    <section className="space-y-6">
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data?.results.map((movie) => (
          <li key={movie.id}>
            <p className="font-medium">
              {movie.title}
            </p>
          </li>
        ))}
      </ul>

      <div className="flex justify-center">
        <button
          onClick={() =>
            setPage((p) => p + 1)
          }
          disabled={isFetching}
          className="rounded border px-4 py-2 text-sm"
        >
          {isFetching
            ? "Loading..."
            : "Load more"}
        </button>
      </div>
    </section>
  );
}
