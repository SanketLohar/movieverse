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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
    <section className="mx-auto max-w-5xl px-4 py-8 sm:py-12 space-y-8">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* =====================
          ACTOR HEADER
      ====================== */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Actor image */}
        <div className="relative w-full max-w-[220px] sm:max-w-[240px] aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={actor.profileImage}
            alt={actor.name.en}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 240px"
            className="object-cover"
          />
        </div>

        {/* Actor info */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold">
              {actor.name.en}
            </h1>

            <WatchlistToggle id={actor.id} type="actor" />
          </div>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
            {actor.bio.en}
          </p>
        </div>
      </header>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* =====================
          FILMOGRAPHY
      ====================== */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          Filmography
        </h2>

        <FilmographyClient items={actor.filmography} />
      </section>
    </section>
  );
}
