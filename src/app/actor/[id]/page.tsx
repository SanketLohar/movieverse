import { notFound } from "next/navigation";
import { actors, type Actor } from "../../../lib/actors";

export const runtime = "edge";
export const revalidate = 60;

// ✅ Tag this page for on-demand revalidation
export const dynamic = "force-static";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ActorProfilePage({ params }: Props) {
  const { id } = await params;

  const actor: Actor | undefined = actors.find(
    (a: Actor) => a.id === id
  );

  if (!actor) {
    notFound();
    return null;
  }

  return (
    <section>
      <h1>{actor.name}</h1>
      <p>{actor.bio}</p>

      <h3>Known For</h3>
      <ul>
        {actor.knownFor.map((movie) => (
          <li key={movie}>{movie}</li>
        ))}
      </ul>
    </section>
  );
}
