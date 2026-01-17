import { unstable_cache } from "next/cache";
import { actorMockData } from "./actor.mock";
import type { ActorEntity } from "./actor.schema";

export const getActorById = unstable_cache(
  async (id: string): Promise<ActorEntity | null> => {
    const actor = actorMockData.find((a) => a.id === id);
    return actor ?? null;
  },
  ["actor-by-id"],
  {
    revalidate: 60,
    tags: ["actor"]
  }
);

export const getAllActors = unstable_cache(
  async (): Promise<ActorEntity[]> => {
    return actorMockData;
  },
  ["actors-all"],
  {
    revalidate: 60,
    tags: ["actors"]
  }
);
