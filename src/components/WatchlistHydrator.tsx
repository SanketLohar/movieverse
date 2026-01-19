"use client";

import { useEffect } from "react";
import { watchlistService } from "../data/watchlist/watchlist.service";

export default function WatchlistHydrator() {
  useEffect(() => {
    watchlistService.init();
  }, []);

  return null;
}
