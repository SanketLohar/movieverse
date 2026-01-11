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

  // ✅ Properly typed JSON-LD (fixes red underline)
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    description: bio,
    image: actor.profileImage,
    knowsFor: actor.filmography.map(
      (f) => f.title[lang] ?? f.title.en
    ),
  };

  return (
    <section className="space-y-8 py-8">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* Actor Header */}
      <header className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          {name}
        </h1>
        <p className="text-gray-600 max-w-2xl">
          {bio}
        </p>
      </header>

      {/* Filmography */}
      <div>
        <FilmographyExplorer items={actor.filmography} />
      </div>
    </section>
  );
}
