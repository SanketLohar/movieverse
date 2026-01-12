import { dbGetAll, dbPut, dbDelete } from "./watchlist-db";



export type WatchlistItem = {
  id: string;
  title: string;
};

const KEY = "movieverse_watchlist";

export function getWatchlist(): WatchlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function isInWatchlist(id: string): boolean {
  return getWatchlist().some((m) => m.id === id);
}

export function addToWatchlist(item: WatchlistItem): void {
  const list = getWatchlist();
  if (list.some((m) => m.id === item.id)) return;

  localStorage.setItem(KEY, JSON.stringify([...list, item]));
  notifyWatchlistChange();
  dbPut(item); // async, non-blocking
}

export function removeFromWatchlist(id: string): void {
  const list = getWatchlist().filter((m) => m.id !== id);
  localStorage.setItem(KEY, JSON.stringify(list));
  notifyWatchlistChange();
  dbDelete(id); // async, non-blocking
}



export function getWatchlistCount(): number {
  return getWatchlist().length;
}

export function notifyWatchlistChange() {
  window.dispatchEvent(new Event("watchlist-change"));
}
export async function hydrateFromDB() {
  const items = await dbGetAll();
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("watchlist-change"));
}
