"use client";

export default function SimilarError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <section className="rounded-lg border p-4 text-sm">
      <p className="text-gray-600 mb-2">
        Could not load similar actors.
      </p>

      <button
        onClick={reset}
        className="text-purple-600 underline"
      >
        Retry
      </button>
    </section>
  );
}
