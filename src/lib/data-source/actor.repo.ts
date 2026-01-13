import { ACTORS } from "./actor.mock";
import { Actor } from "./actor.types";

export async function getActorById(
  id: string
): Promise<Actor | null> {
  return ACTORS.find((a) => a.id === id) ?? null;
}
