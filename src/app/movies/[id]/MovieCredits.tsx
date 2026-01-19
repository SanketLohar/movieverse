import { getMovieBundle } from "../../../data/movies/movie.repository";

export default async function MovieCredits({
  movieId,
}: {
  movieId: string;
}) {
  const bundle = await getMovieBundle(movieId);

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">
        Cast
      </h2>

      <ul className="space-y-2">
        {bundle.credits.map((c) => (
          <li key={c.id}>
            <strong>{c.name}</strong>{" "}
            <span className="text-gray-500">
              — {c.role}
            </span>
          </li>
        ))}

        {bundle.credits.length === 0 && (
          <p className="text-gray-500">
            No credits available.
          </p>
        )}
      </ul>
    </section>
  );
}
