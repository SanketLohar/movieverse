import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getActorById } from "../../../data/actors/actor.repository";
import FilmographyClient from "../../../components/FilmographyClient";
import { buildPersonJsonLd } from "../../../lib/seo/person.schema";

export const runtime = "edge";
export const revalidate = 60;

type Props = {
  params: Promise<{
    id: string;
  }>;
};

/* ---------- SEO METADATA ---------- */

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { id } = await params;
  const actor = await getActorById(id);

  if (!actor) {
    return { title: "Actor not found | MovieVerse" };
  }

  return {
    title: `${actor.name.en} | MovieVerse`,
    description: actor.bio.en.slice(0, 160),
  };
}

/* ---------- PAGE ---------- */

export default async function ActorPage({ params }: Props) {
  const { id } = await params;

  const actor = await getActorById(id);

  if (!actor) {
    notFound();
  }

  const jsonLd = buildPersonJsonLd(actor);

  return (
    <section className="space-y-10 py-8">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <header className="flex flex-col gap-6 sm:flex-row">
        <Image
          src={actor.profileImage}
          alt={actor.name.en}
          width={240}
          height={320}
          priority
          className="rounded-lg object-cover"
        />

        <div className="space-y-3">
          <h1 className="text-2xl font-bold">
            {actor.name.en}
          </h1>

          <p className="text-gray-600">
            {actor.bio.en}
          </p>
        </div>
      </header>

      <FilmographyClient items={actor.filmography} />
    </section>
  );
}
