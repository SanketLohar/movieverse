import Image from "next/image";
import WatchlistToggle from "../../../components/WatchlistToggle";
import type { Movie } from "../../../data/movies/movie.schema";

export default function MovieCore({
  movie,
}: {
  movie: Movie;
}) {
  const heroImage = movie.media.stills[0];

  return (
    <header className="space-y-6">
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Image */}
        <Image
          src={heroImage}
          alt={movie.title}
          width={480}
          height={270}
          priority
          sizes="(max-width: 640px) 100vw, 480px"
          className="w-full rounded-xl object-cover"
        />

        {/* Text */}
        <div className="flex flex-col gap-3 w-full">
          <h1 className="text-2xl sm:text-3xl font-bold">
            {movie.title}
          </h1>

          <p className="text-gray-600">
            Release Year: {movie.year}
          </p>

          <div className="pt-2">
            <WatchlistToggle
              id={movie.id}
              type="movie"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
