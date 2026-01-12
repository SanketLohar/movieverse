import { notFound } from "next/navigation";
import WatchlistButton from "../../../components/WatchlistButton";
import { movies, type Movie } from "../../../lib/data";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MovieDetailPage({ params }: Props) {
  // ✅ unwrap params (REQUIRED in Next.js 16)
  const { id } = await params;

  const movie: Movie | undefined = movies.find(
    (m) => m.id === id
  );

  if (!movie) {
    notFound();
    return null;
  }

  return (
    <article className="space-y-4 py-6">
      <h1 className="text-2xl font-bold">{movie.title}</h1>

      <p className="text-gray-600">
        Release Year: {movie.year}
      </p>

      <p className="max-w-xl">
        {movie.description}
      </p>

      {/* ✅ Watchlist button */}
      <WatchlistButton
        item={{
          id: movie.id,
          title: movie.title,
        }}
      />
    </article>
  );
}
