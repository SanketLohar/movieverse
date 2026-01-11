import Link from "next/link";
import { actors } from "../../lib/actors";

export const runtime = "edge";
export const revalidate = 60;

export default function ActorsPage() {
  const lang = "en";

  return (
    <section className="space-y-6 py-8">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Actors
        </h1>
        <p className="text-gray-600">
          Browse popular actors
        </p>
      </div>

      {/* Actors list */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {actors.map((actor) => (
          <li
            key={actor.id}
            className="rounded-lg border p-4 hover:shadow-sm transition"
          >
            <Link
              href={`/actor/${actor.id}`}
              className="block font-medium text-purple-600 hover:underline"
            >
              {actor.name[lang] ?? actor.name.en}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
