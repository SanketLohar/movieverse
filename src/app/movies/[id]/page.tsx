import { notFound } from "next/navigation";
import { movies, type Movie } from "../../../lib/data";

type Props = {
  params: {
    id: string;
  };
};

export default function MovieDetailPage({ params }: Props) {
  const movie: Movie | undefined = movies.find(
    (m) => m.id === params.id
  );

  if (!movie) {
    notFound();
    return null;
  }

  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <p className="text-gray-600">Release Year: {movie.year}</p>
      <p>{movie.description}</p>
    </article>
  );
}
