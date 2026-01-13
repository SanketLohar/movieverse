import { notFound } from "next/navigation";
import Image from "next/image";

import FilmographyExplorer from "../../../components/FilmographyExplorer";
import { getActorById } from "../../../lib/data-source/actor.repo";

export const runtime = "edge";
export const revalidate = 60;

export default async function ActorProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const actor = await getActorById(params.id);

  if (!actor) {
    notFound();
  }

  return (
    <section className="space-y-6 py-6">
      <div className="flex gap-6 items-start">
        <Image
          src={actor.profileImage}
          alt={actor.name.en}
          width={220}
          height={300}
          priority
          className="rounded-lg object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold">{actor.name.en}</h1>
          <p className="mt-2 max-w-xl text-gray-600">
            {actor.bio.en}
          </p>
        </div>
      </div>

      <FilmographyExplorer items={actor.filmography} />
    </section>
  );
}
