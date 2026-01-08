import { notFound } from "next/navigation";
import { actors, type Actor } from "../../../lib/actors";
import FilmographyExplorer from "../../../components/FilmographyExplorer";

export const runtime = "edge";
export const revalidate = 60;

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ActorProfilePage({ params }: Props) {
  const { id } = await params;

  const actor: Actor | undefined = actors.find(
    (a) => a.id === id
  );

  if (!actor) {
    notFound();
  }

  const lang = "en";
  const name = actor.name[lang] ?? actor.name.en;
  const bio = actor.bio[lang] ?? actor.bio.en;

  return (
    <section>
      <h1>{name}</h1>
      <p>{bio}</p>

      <FilmographyExplorer items={actor.filmography} />
    </section>
  );
}
