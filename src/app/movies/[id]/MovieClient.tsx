"use client";

import { useMovieRefresh } from "../../../hooks/useMovieRefresh";
import MovieCore from "./MovieCore";
import MovieMediaSwitcher from "./MovieMediaSwitcher.client";
import MovieDescription from "./MovieDescription";

type Props = {
  movie: any;
};

export default function MovieClient({ movie }: Props) {
  const { movie: liveMovie, isRefreshing } =
    useMovieRefresh(movie);

  return (
    <div className="space-y-10">
      <MovieCore movie={liveMovie} />

      {isRefreshing && (
        <p className="text-xs text-gray-400">
          Updating information…
        </p>
      )}

      <MovieMediaSwitcher
        title={liveMovie.title}
        trailerId={liveMovie.media.trailer}
        images={liveMovie.media.stills}
      />

      <MovieDescription
        description={liveMovie.description}
      />
    </div>
  );
}
