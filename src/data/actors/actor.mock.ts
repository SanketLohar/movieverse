import { ActorSchema, type ActorEntity } from "./actor.schema";
import { actors } from "../../lib/actors";

export const actorMockData: ActorEntity[] = actors.map((actor) =>
  ActorSchema.parse(actor)
);
