import Link from "next/link";
import { movies } from "../../lib/data";

export default function MoviesPage() {
  return (
    <section className="space-y-6 py-6">
      <h1 className="text-2xl font-bold">Movies</h1>

      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {movies.map((movie) => (
          <li key={movie.id} className="rounded border p-4">
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-600">
              Release Year: {movie.year}
            </p>

            <Link
              href={`/movies/${movie.id}`}
              className="mt-2 inline-block text-blue-600 hover:underline"
            >
              View Details →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
