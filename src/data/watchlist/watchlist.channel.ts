import type { WatchlistItem } from "./watchlist.schema";

export type WatchlistBroadcast =
  | { type: "upsert"; item: WatchlistItem }
  | { type: "remove"; id: string };

export const watchlistChannel =
  typeof window !== "undefined"
    ? new BroadcastChannel("movieverse-watchlist")
    : null;
