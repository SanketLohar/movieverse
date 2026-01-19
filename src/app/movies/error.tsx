"use client";

export default function MoviesError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <section className="py-10 text-center space-y-4">
      <h2 className="text-xl font-semibold">
        Movies unavailable
      </h2>

      <p className="text-gray-600">
        Please try again later.
      </p>

      <button
        onClick={reset}
        className="rounded border px-4 py-2 text-sm"
      >
        Retry
      </button>
    </section>
  );
}
