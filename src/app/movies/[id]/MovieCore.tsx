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
        {/* ✅ Hero image (LCP element) */}
        <Image
          src={heroImage}
          alt={movie.title}
          width={320}
          height={180}
          priority
          sizes="(max-width: 640px) 100vw, 320px"
          className="rounded-xl object-cover"
        />

        <div className="space-y-4">
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
        </div>
      </div>
    </header>
  );
}
