"use client";

export default function MovieError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="py-10 text-center space-y-4">
      <h2 className="text-xl font-semibold">
        Something went wrong
      </h2>

      <p className="text-gray-600">
        We couldn’t load this movie right now.
      </p>

      <button
        onClick={reset}
        className="rounded border px-4 py-2 text-sm hover:bg-gray-100"
      >
        Try again
      </button>
    </section>
  );
}
