import { unstable_cache } from "next/cache";
import { actorMockData } from "./actor.mock";
import type { ActorEntity } from "./actor.schema";

export const getActorById = (id: string) =>
  unstable_cache(
    async () => {
      return actorMockData.find(a => a.id === id) ?? null;
    },
    [`actor-${id}`],
    {
      revalidate: 60,
      tags: ["actors", `actor-${id}`],
    }
  )();


export const getAllActors = unstable_cache(
  async (): Promise<ActorEntity[]> => {
    return actorMockData;
  },
  ["actors-all"],
  {
    revalidate: 60,
    tags: ["actors"],
  }
);
