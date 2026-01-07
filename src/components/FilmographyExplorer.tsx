"use client";

import { useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { FilmographyItem } from "../lib/actors";

type Props = {
  items: FilmographyItem[];
};

export default function FilmographyExplorer({ items }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [yearFilter, setYearFilter] = useState<number | "all">("all");

  const years = Array.from(new Set(items.map((i) => i.year)));

  const filteredItems =
    yearFilter === "all"
      ? items
      : items.filter((i) => i.year === yearFilter);

  const rowVirtualizer = useVirtualizer({
    count: filteredItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 5,
  });

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

      <div
        ref={parentRef}
        style={{
          height: "200px",
          overflow: "auto",
          border: "1px solid #ccc",
          marginTop: "8px",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const item = filteredItems[virtualRow.index];

            return (
              <div
                key={item.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  padding: "4px 8px",
                  boxSizing: "border-box",
                }}
              >
                <strong>{item.title}</strong> ({item.year}) — {item.role}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
