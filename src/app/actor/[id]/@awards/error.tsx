"use client";

export default function AwardsError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <section className="rounded-lg border p-4 text-sm">
      <p className="text-gray-600 mb-2">
        Failed to load awards.
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
