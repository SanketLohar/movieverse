import type { WatchlistItem } from "./watchlist.schema";

export type WatchlistChange =
  | { type: "add"; item: WatchlistItem }
  | { type: "remove"; id: string };

export interface WatchlistRepository {
  getAll(): Promise<WatchlistItem[]>;
  getById(id: string): Promise<WatchlistItem | null>;

  add(item: WatchlistItem): Promise<void>;
  remove(id: string): Promise<void>;

  applyRemoteChange(change: WatchlistChange): Promise<void>;
}
