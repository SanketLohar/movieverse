import { IndexedDBWatchlistRepository } from "../data/watchlist/watchlist.indexeddb.repository";

const repo = new IndexedDBWatchlistRepository();

export async function getWatchlistCount(): Promise<number> {
  const items = await repo.getAll();
  return items.length;
}
