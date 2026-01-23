import { getAllMovies } from "../../data/movies/movie.repository";
import PrefetchLink from "../../components/PrefetchLink";

export const runtime = "edge";
export const revalidate = 60;

export default async function MoviesPage() {
  const movies = await getAllMovies();

  return (
    <section className="space-y-10 py-10 sm:py-14">
      <header>
        <h1 className="text-2xl font-bold">Movies</h1>
        <p className="text-sm text-gray-600">
          Browse available movies
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="rounded-lg border p-4 transition hover:shadow-sm"
          >
            <h2 className="text-lg font-semibold">
              {movie.title}
            </h2>

            <p className="text-sm text-gray-600">
              Release Year: {movie.year}
            </p>

            {/* ✅ Phase 7.5.4 — hover/focus route prefetch */}
            <PrefetchLink
              href={`/movies/${movie.id}`}
              className="mt-3 inline-block text-blue-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              View Details →
            </PrefetchLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
