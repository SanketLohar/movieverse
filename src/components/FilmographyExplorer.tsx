"use client";

import { useState } from "react";
import type { FilmographyItem } from "../lib/actors";

type Props = {
  items: FilmographyItem[];
};

export default function FilmographyExplorer({ items }: Props) {
  const [yearFilter, setYearFilter] = useState<number | "all">("all");

  const years = Array.from(new Set(items.map((i) => i.year)));

  const filteredItems =
    yearFilter === "all"
      ? items
      : items.filter((i) => i.year === yearFilter);

  return (
    <section>
      <h3>Filmography</h3>

      <label>
        Filter by year:{" "}
        <select
          value={yearFilter}
          onChange={(e) =>
            setYearFilter(
              e.target.value === "all"
                ? "all"
                : Number(e.target.value)
            )
          }
        >
          <option value="all">All</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>

      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong> ({item.year}) — {item.role}
          </li>
        ))}
      </ul>
    </section>
  );
}
