import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-4">
<h1 className="text-3xl font-bold text-red-500">
  Welcome to MovieVerse
</h1>
      <p className="text-gray-600">
        Explore movies, actors, and build your watchlist.
      </p>

      <Link
        href="/movies"
        className="inline-block rounded bg-black px-4 py-2 text-white"
      >
        Browse Movies
      </Link>
      <Link href="/actor">Browse Actors</Link>

    </section>
  );
}
