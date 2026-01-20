import { getActorById, getAllActors } from "./actor.repository";
import { ActorPolicy } from "./actor.policy";
import type { ActorEntity } from "./actor.schema";

/**
 * Actor service layer
 * Handles validation + orchestration
 */
export class ActorService {
  static async getActor(
    id: string
  ): Promise<ActorEntity | null> {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid actor id");
    }

    const actor = await getActorById(id);

    if (!ActorPolicy.canRead(actor)) {
      return null;
    }

    return actor;
  }

  static async getActors(): Promise<ActorEntity[]> {
    const actors = await getAllActors();

    return actors.filter(ActorPolicy.canRead);
  }
}
