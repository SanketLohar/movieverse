"use client";

import { useState } from "react";
import Link from "next/link";
import LoginButton from "./auth/LoginButton";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-purple-600 text-lg"
        >
          MovieVerse
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/movies" className="hover:text-purple-600">
            Movies
          </Link>

          {/* ✅ FIXED ROUTE */}
          <Link href="/actor" className="hover:text-purple-600">
            Actors
          </Link>

          <Link href="/watchlist" className="hover:text-purple-600">
            Watchlist
          </Link>

          <LoginButton />
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden text-2xl"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile navigation */}
      {open && (
  <div className="md:hidden border-t bg-white px-4 py-6">
    <nav className="flex flex-col gap-2 text-sm">
      <Link
        href="/movies"
        onClick={() => setOpen(false)}
        className="rounded-lg px-3 py-2 hover:bg-gray-100"
      >
        Movies
      </Link>

      <Link
        href="/actor"
        onClick={() => setOpen(false)}
        className="rounded-lg px-3 py-2 hover:bg-gray-100"
      >
        Actors
      </Link>

      <Link
        href="/watchlist"
        onClick={() => setOpen(false)}
        className="rounded-lg px-3 py-2 hover:bg-gray-100"
      >
        Watchlist
      </Link>
    </nav>

    <div className="mt-4 border-t pt-4">
      <LoginButton />
    </div>
  </div>
)}

    </header>
  );
}
