"use client";

import { useEffect } from "react";
import { hydrateFromDB } from "../lib/watchlist";

export default function WatchlistHydrator() {
  useEffect(() => {
    hydrateFromDB();
  }, []);

  return null; // no UI
}
