"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { watchlistService } from "../data/watchlist/watchlist.service";
import { useWatchlistUndo } from "./WatchlistUndoProvider";

type Props = {
  id: string;
  type: "movie" | "actor";
};

export default function WatchlistToggle({ id, type }: Props) {
  const undo = useWatchlistUndo();
  const reduceMotion = useReducedMotion();

  const [ready, setReady] = useState(
    watchlistService.isReady()
  );
  const [active, setActive] = useState(false);

  /* ---------------- SYNC WITH SERVICE ---------------- */

  useEffect(() => {
    const unsubscribe = watchlistService.subscribe(() => {
      setReady(watchlistService.isReady());
      setActive(watchlistService.has(id));
    });

    if (watchlistService.isReady()) {
      setReady(true);
      setActive(watchlistService.has(id));
    }

    return unsubscribe;
  }, [id]);

  /* ---------------- TOGGLE ---------------- */

  async function toggle() {
  if (active) {
    await watchlistService.remove(id);

    undo.show({
      label: "Removed from watchlist",
      onUndo: () => {
        watchlistService.add(id, type);
        watchlistService.forceEmit();
      },
    });
  } else {
    await watchlistService.add(id, type);

    undo.show({
      label: "Added to watchlist",
      onUndo: () => {
        watchlistService.remove(id);
        watchlistService.forceEmit();
      },
    });
  }
}


  /* ---------------- LOADING ---------------- */

  if (!ready) {
    return (
      <button
        disabled
        className="rounded border px-3 py-1 text-sm opacity-50"
      >
        Loading…
      </button>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <motion.button
  onClick={toggle}
  aria-pressed={active}
  data-state={active ? "active" : "inactive"}
  whileTap={reduceMotion ? undefined : { scale: 0.92 }}
  whileHover={reduceMotion ? undefined : { scale: 1.05 }}
  transition={{
    type: "spring",
    stiffness: 420,
    damping: 22,
  }}
  className={`rounded border px-3 py-1 text-sm font-medium
    ${
      active
        ? "bg-yellow-200 border-yellow-400 text-yellow-900"
        : "bg-white border-gray-300 hover:bg-gray-50"
    }
  `}
>
  {/* visible UI */}
  {active ? "★ In Watchlist" : "☆ Add to Watchlist"}

  {/* hidden deterministic label for tests */}
  <span className="sr-only">
    {active ? "In Watchlist" : "Add to Watchlist"}
  </span>
</motion.button>

  );
}
