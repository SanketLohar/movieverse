import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ActorService } from "../../../data/actors/actor.service";
import FilmographyClient from "../../../components/FilmographyClient";
import WatchlistToggle from "../../../components/WatchlistToggle";
import { buildPersonJsonLd } from "../../../lib/seo/person.schema";

export const runtime = "edge";
export const revalidate = 60;

type Props = {
  params: Promise<{
    id: string;
  }>;
};

/* ---------- SEO ---------- */

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const actor = await ActorService.getActor(id);

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

  const actor = await ActorService.getActor(id);

  if (!actor) notFound();
  const jsonLd = buildPersonJsonLd(actor);

  return (
    <section className="space-y-10 py-10 sm:py-14">
      {/* JSON-LD */}
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
  sizes="(max-width: 640px) 100vw, 240px"
  className="rounded-lg object-cover"
/>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">
              {actor.name.en}
            </h1>

            {/* ✅ CORRECT PLACE */}
            <WatchlistToggle
              id={actor.id}
              type="actor"
            />
          </div>

          <p className="text-gray-600 max-w-2xl">
            {actor.bio.en}
          </p>
        </div>
      </header>

      <FilmographyClient items={actor.filmography} />
    </section>
  );
}
