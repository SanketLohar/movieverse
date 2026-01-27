"use client";

import { useMemo, useState } from "react";
import type { FilmographyItem } from "../data/actors/actor.schema";

type Props = {
  items: FilmographyItem[];
};

export default function FilmographyClient({ items }: Props) {
  const [year, setYear] = useState<string>("all");
  const [role, setRole] = useState<string>("all");
  const [genre, setGenre] = useState<string>("all");

  const years = useMemo<string[]>(() => {
    return Array.from(
      new Set(items.map((i) => i.year.toString()))
    ).sort((a, b) => Number(b) - Number(a));
  }, [items]);

  const roles = useMemo<string[]>(() => {
    return Array.from(
      new Set(items.map((i) => i.role.en))
    );
  }, [items]);

  const genres = useMemo<string[]>(() => {
    return Array.from(
      new Set(items.flatMap((i) => i.genre))
    );
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (year !== "all" && item.year.toString() !== year)
        return false;

      if (role !== "all" && item.role.en !== role)
        return false;

      if (genre !== "all" && !item.genre.includes(genre))
        return false;

      return true;
    });
  }, [items, year, role, genre]);

  return (
    <section className="space-y-5">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 text-sm">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="rounded-md border px-3 py-1.5 bg-white"
        >
          <option value="all">All Years</option>
          {years.map((y: string) => (
            <option key={y}>{y}</option>
          ))}
        </select>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-md border px-3 py-1.5 bg-white"
        >
          <option value="all">All Roles</option>
          {roles.map((r: string) => (
            <option key={r}>{r}</option>
          ))}
        </select>

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="rounded-md border px-3 py-1.5 bg-white"
        >
          <option value="all">All Genres</option>
          {genres.map((g: string) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Filmography list */}
      <ul className="space-y-3">
        {filtered.map((item) => (
          <li
            key={item.id}
            className="
              group
              rounded-xl
              border
              bg-white
              p-4
              transition
              hover:-translate-y-[2px]
              hover:shadow-md
              active:scale-[0.99]
            "
          >
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-gray-900">
                {item.title.en}{" "}
                <span className="font-normal text-gray-500">
                  ({item.year})
                </span>
              </h3>

              <p className="text-sm text-gray-600">
                Role:{" "}
                <span className="font-medium">
                  {item.role.en}
                </span>
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {item.genre.map((g: string) => (
                  <span
                    key={g}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-gray-500">
            No results found.
          </p>
        )}
      </ul>
    </section>
  );
}
