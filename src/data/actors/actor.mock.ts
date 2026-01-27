import { ActorSchema, type ActorEntity } from "./actor.schema";
import { actors } from "../../lib/actors";

/* ---------------------------------------
   Parsed mock data (runtime-safe)
---------------------------------------- */

export const actorMockData: ActorEntity[] = actors.map(
  (actor) => ActorSchema.parse(actor)
);
