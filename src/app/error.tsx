"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-white px-6 text-gray-900">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-2xl font-semibold">
            Something went wrong
          </h1>

          <p className="text-gray-600">
            An unexpected error occurred. Please try again.
          </p>

          <button
            onClick={reset}
            className="rounded-md bg-black px-5 py-2 text-white transition hover:bg-gray-800"
          >
            Try again
          </button>
          
        </div>
      </body>
    </html>
  );
}
