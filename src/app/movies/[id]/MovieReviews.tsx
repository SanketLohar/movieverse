import { getMovieBundle } from "../../../data/movies/movie.repository";

export default async function MovieReviews({
  movieId,
}: {
  movieId: string;
}) {
  const bundle = await getMovieBundle(movieId);

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">
        Reviews
      </h2>

      <ul className="space-y-3">
        {bundle.reviews.map((r) => (
          <li
            key={r.id}
            className="rounded border p-3"
          >
            <p className="font-medium">
              {r.author}
            </p>
            <p className="text-sm text-gray-600">
              Rating: {r.rating}/5
            </p>
            <p className="mt-1 text-sm">
              {r.content}
            </p>
          </li>
        ))}

        {bundle.reviews.length === 0 && (
          <p className="text-gray-500">
            No reviews yet.
          </p>
        )}
      </ul>
    </section>
  );
}
