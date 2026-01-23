"use client";

import Link from "next/link";
import LoginButton from "./auth/LoginButton";

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex gap-6">
        <Link href="/" className="font-bold text-purple-600">
          MovieVerse
        </Link>

        <Link href="/movies">Movies</Link>
        <Link href="/actor">Actors</Link>
        <Link href="/watchlist">Watchlist</Link>
        <LoginButton />

      </div>
      
    </header>
    
  );
  
}
