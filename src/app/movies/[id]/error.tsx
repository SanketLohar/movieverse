"use client";

import { useEffect } from "react";

export default function MovieError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Movie page error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto max-w-5xl px-4 py-24 text-center">
        <h1 className="mb-4 text-2xl font-semibold">
          Something went wrong
        </h1>

        <p className="mb-8 text-sm text-gray-600">
          We couldn’t load this movie right now.  
          Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="rounded-md bg-black px-6 py-2 text-sm text-white hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
        >
          Retry
        </button>
      </div>
    </main>
  );
}
