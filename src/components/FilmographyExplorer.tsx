"use client";

import { useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { FilmographyItem } from "../lib/actors";

type Props = {
  items: FilmographyItem[];
};

export default function FilmographyExplorer({ items }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  const [year, setYear] = useState<number | "all">("all");
  const [role, setRole] = useState<string>("all");
  const [genre, setGenre] = useState<string>("all");

  const years = Array.from(new Set(items.map((i) => i.year))).sort(
    (a, b) => b - a
  );

  const roles = Array.from(
    new Set(items.map((i) => i.role.en))
  );

  const genres = Array.from(
    new Set(items.flatMap((i) => i.genre))
  );

  const filteredItems = items.filter((item) => {
    if (year !== "all" && item.year !== year) return false;
    if (role !== "all" && item.role.en !== role) return false;
    if (genre !== "all" && !item.genre.includes(genre)) return false;
    return true;
  });

  const rowVirtualizer = useVirtualizer({
    count: filteredItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 5,
  });

  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold">Filmography</h3>

      {/* Facet Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={year}
          onChange={(e) =>
            setYear(
              e.target.value === "all"
                ? "all"
                : Number(e.target.value)
            )
          }
        >
          <option value="all">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="all">All Roles</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="all">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Virtualized List */}
      <div
        ref={parentRef}
        className="h-[240px] overflow-auto rounded border"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((row) => {
            const item = filteredItems[row.index];

            return (
              <div
                key={item.id}
                className="absolute left-0 right-0 px-3 py-2"
                style={{
                  transform: `translateY(${row.start}px)`,
                }}
              >
                <strong>{item.title.en}</strong> ({item.year}) —{" "}
                {item.role.en}
                <span className="ml-2 text-sm text-gray-500">
                  [{item.genre.join(", ")}]
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
