import Link from "next/link";

export default function MovieNotFound() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto max-w-5xl px-4 py-24 text-center">
        <h1 className="mb-4 text-3xl font-semibold">
          Movie not found
        </h1>

        <p className="mb-8 text-sm text-gray-600">
          The movie you’re looking for doesn’t exist or may have been removed.
        </p>

        <Link
          href="/movies"
          className="inline-block rounded-md bg-black px-6 py-2 text-sm text-white hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
        >
          Browse movies
        </Link>
      </div>
    </main>
  );
}
