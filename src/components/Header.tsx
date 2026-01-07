import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">
          MovieVerse
        </Link>

        <div className="flex gap-4">
          <Link href="/movies" className="hover:underline">
            Movies
          </Link>
        </div>
      </nav>
    </header>
  );
}
