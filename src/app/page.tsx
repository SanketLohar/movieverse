import Link from "next/link";
import MovieListClient from "../components/movies/MovieList.client";

export default function HomePage() {
  return (
    <section className="space-y-10 py-10 sm:py-14">
      {/* Hero */}
      <div className="space-y-4">
        <h1
          className="
            bg-gradient-to-r from-red-500 via-pink-500 to-purple-500
            bg-clip-text  font-black
            text-4xl sm:text-5xl md:text-6xl
            leading-tight
          "
          style={{
            textShadow:
              "0 0 25px rgba(239,68,68,0.35), 0 0 45px rgba(236,72,153,0.25)",
          }}
        >
          Welcome to MovieVerse
        </h1>

        <p className="text-base sm:text-lg text-gray-600 max-w-xl">
          Explore movies, actors, and build your watchlist.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link
          href="/movies"
          className="
            inline-flex items-center justify-center
            rounded-lg bg-gradient-to-r from-red-600 to-red-700
            px-6 py-3 text-white font-semibold
            hover:shadow-lg hover:scale-[1.03]
            transition
          "
        >
          🎬 Browse Movies
        </Link>

        <Link
          href="/actor"
          className="
            inline-flex items-center justify-center
            rounded-lg bg-gradient-to-r from-blue-600 to-blue-700
            px-6 py-3 text-white font-semibold
            hover:shadow-lg hover:scale-[1.03]
            transition
          "
        >
          ⭐ Browse Actors
        </Link>
      </div>
    </section>
  );
}
