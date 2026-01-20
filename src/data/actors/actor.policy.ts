import type { ActorEntity } from "./actor.schema";

/**
 * Actor access policy layer
 * Simulates backend authorization rules
 */
export class ActorPolicy {
  /**
   * Type-safe access rule
   * Narrows ActorEntity | null → ActorEntity
   */
  static canRead(
    actor: ActorEntity | null
  ): actor is ActorEntity {
    if (!actor) return false;

    // Future-ready rules:
    // - publication status
    // - geo restrictions
    // - age rating
    // - role-based access

    return true;
  }
}
