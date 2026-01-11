"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getWatchlistCount } from "../lib/watchlist";

export default function Header() {
  // ✅ Initialize synchronously (no effect setState)
  const [count, setCount] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    return getWatchlistCount();
  });

  useEffect(() => {
    // ✅ Event handler (setState allowed here)
    const update = () => {
      setCount(getWatchlistCount());
    };

    // Same-tab updates
    window.addEventListener("watchlist-change", update);

    // Cross-tab updates
    window.addEventListener("storage", update);

    return () => {
      window.removeEventListener("watchlist-change", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold text-purple-600">
          MovieVerse
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6 items-center text-sm font-medium">
          <Link href="/movies" className="hover:text-purple-600">
            Movies
          </Link>

          <Link href="/actor" className="hover:text-purple-600">
            Actors
          </Link>

          <Link
            href="/watchlist"
            className="relative hover:text-purple-600"
          >
            Watchlist
            {count > 0 && (
              <span className="absolute -top-2 -right-3 rounded-full bg-red-600 text-white text-xs px-2 py-0.5">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
