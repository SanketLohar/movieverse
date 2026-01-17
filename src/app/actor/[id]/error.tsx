"use client";

export default function ActorError({
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
        We couldn’t load this actor profile.
      </p>

      <button
        onClick={reset}
        className="rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
      >
        Try again
      </button>
    </section>
  );
}
