"use client";

import FilmographyExplorer from "./FilmographyExplorer";
import type { Actor } from "../lib/actors";

type Props = {
  items: Actor["filmography"];
};

export default function FilmographyClient({ items }: Props) {
  return <FilmographyExplorer items={items} />;
}
