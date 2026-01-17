import type { ActorEntity } from "../../data/actors/actor.schema";

export function buildPersonJsonLd(actor: ActorEntity) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://movieverse.com/actor/${actor.id}`,
    name: actor.name.en,
    description: actor.bio.en,
    image: actor.profileImage,
    jobTitle: "Actor",
    knowsAbout: actor.filmography.map((f) => f.title.en),
  };
}
