import { notFound } from "next/navigation";
import { actors, type Actor } from "../../../lib/actors";

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
    (a: Actor) => a.id === id
  );

  if (!actor) {
    notFound();
    return null;
  }

  // ✅ JSON-LD structured data (Person)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: actor.name,
    description: actor.bio,
    image: actor.profileImage,
    knowsFor: actor.filmography.map((f) => f.title),
  };

  return (
    <section>
      {/* ✅ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <h1>{actor.name}</h1>
      <p>{actor.bio}</p>
    </section>
  );
}
