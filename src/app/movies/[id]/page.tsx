import { notFound } from "next/navigation";
import { movies } from "../../../lib/data";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MovieDetailPage({ params }: Props) {
  // ✅ REQUIRED in Next.js 16
  const { id } = await params;

  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    notFound();
  }

  return (
    <section className="space-y-4 py-8">
      <h1 className="text-3xl font-bold">{movie.title}</h1>

      <p className="text-gray-600">
        Release Year: {movie.year}
      </p>

      <p className="max-w-2xl">{movie.description}</p>
    </section>
  );
}
