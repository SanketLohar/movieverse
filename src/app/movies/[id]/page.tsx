import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getMovieById } from "../../../data/movies/movie.repository";
import WatchlistToggle from "../../../components/WatchlistToggle";

export const runtime = "edge";
export const revalidate = 60;

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MovieDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const movie = await getMovieById(id);

  if (!movie) {
    notFound();
  }

  return (
    <section className="space-y-6 py-8">
      {/* critical content */}
      <header className="flex items-center gap-4">
        <h1 className="text-3xl font-bold">
          {movie.title}
        </h1>

        <WatchlistToggle
          id={movie.id}
          type="movie"
        />
      </header>

      <p className="text-gray-600">
        Release Year: {movie.year}
      </p>

      {/* streamed below-the-fold */}
      <Suspense fallback={<MovieDescriptionSkeleton />}>
        <MovieDescription text={movie.description} />
      </Suspense>
    </section>
  );
}

/* ---------- streamed content ---------- */

function MovieDescription({
  text,
}: {
  text: string;
}) {
  return (
    <p className="max-w-2xl">
      {text}
    </p>
  );
}

function MovieDescriptionSkeleton() {
  return (
    <div className="space-y-2 animate-pulse max-w-2xl">
      <div className="h-4 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </div>
  );
}
