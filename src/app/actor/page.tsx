import Link from "next/link";
import { actors } from "../../lib/actors";

export const runtime = "edge";
export const revalidate = 60;

export default function ActorsPage() {
  const lang = "en";

  return (
    <section>
      <h1>Actors</h1>
      <p>Browse popular actors</p>

      <ul>
        {actors.map((actor) => (
          <li key={actor.id}>
            <Link href={`/actor/${actor.id}`}>
              {actor.name[lang] ?? actor.name.en}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
