import WatchlistToggle from "../../../components/WatchlistToggle";
import type { Movie } from "../../../data/movies/movie.schema";

export default function MovieCore({
  movie,
}: {
  movie: Movie;
}) {
  return (
    <header className="space-y-4">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold">
          {movie.title}
        </h1>

        <WatchlistToggle
          id={movie.id}
          type="movie"
        />
      </div>

      <p className="text-gray-600">
        Release Year: {movie.year}
      </p>
    </header>
  );
}
