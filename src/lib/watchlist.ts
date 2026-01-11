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
}

export function removeFromWatchlist(id: string): void {
  const list = getWatchlist().filter((m) => m.id !== id);
  localStorage.setItem(KEY, JSON.stringify(list));
  notifyWatchlistChange();
}


export function getWatchlistCount(): number {
  return getWatchlist().length;
}

export function notifyWatchlistChange() {
  window.dispatchEvent(new Event("watchlist-change"));
}
