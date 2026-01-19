import { IndexedDBWatchlistRepository } from "./watchlist.indexeddb.repository";
import type { WatchlistItem } from "./watchlist.schema";
import { watchlistChannel } from "./watchlist.channel";

type Listener = () => void;

class WatchlistService {
  private repo = new IndexedDBWatchlistRepository();
  private cache = new Map<string, WatchlistItem>();

  private ready = false;
  private listeners = new Set<Listener>();

  /* ---------------- hydration ---------------- */

  async init() {
    const items = await this.repo.getAll();

    items.forEach((item) => {
      if (!item.deleted) {
        this.cache.set(item.id, item);
      }
    });

    this.ready = true;
    this.emit();

    watchlistChannel?.addEventListener("message", (e) => {
      const msg = e.data;

      if (msg.type === "upsert") {
        this.applyIncoming(msg.item);
      }

      if (msg.type === "remove") {
        this.applyIncoming({
          id: msg.id,
          deleted: true,
          updatedAt: Date.now(),
          version: Number.MAX_SAFE_INTEGER,
          addedAt: 0,
          type: "movie",
        });
      }
    });
  }

  /* ---------------- state ---------------- */

  isReady() {
    return this.ready;
  }

  getAll(): WatchlistItem[] {
    return Array.from(this.cache.values());
  }

  has(id: string): boolean {
    return this.cache.has(id);
  }

  /* ---------------- subscriptions ---------------- */

  subscribe(fn: Listener) {
  this.listeners.add(fn);
  return () => {
    this.listeners.delete(fn);
  };
}


  private emit() {
    this.listeners.forEach((fn) => fn());
  }

  /* ---------------- conflict resolution ---------------- */

  private shouldApply(
    incoming: WatchlistItem,
    existing?: WatchlistItem
  ) {
    if (!existing) return true;
    return incoming.updatedAt > existing.updatedAt;
  }

  private broadcast(item: WatchlistItem) {
    watchlistChannel?.postMessage({
      type: item.deleted ? "remove" : "upsert",
      ...(item.deleted ? { id: item.id } : { item }),
    });
  }

  /* ---------------- mutations ---------------- */

  async add(id: string, type: "movie" | "actor") {
    const now = Date.now();

    const incoming: WatchlistItem = {
      id,
      type,
      addedAt: now,
      updatedAt: now,
      deleted: false,
      version: (this.cache.get(id)?.version ?? 0) + 1,
    };

    const existing = this.cache.get(id);

    if (this.shouldApply(incoming, existing)) {
      this.cache.set(id, incoming);
      this.emit();
      this.broadcast(incoming);
    }

    try {
      await this.repo.add(incoming);
    } catch {
      if (existing) this.cache.set(id, existing);
      else this.cache.delete(id);
      this.emit();
    }
  }

  async remove(id: string) {
    const existing = this.cache.get(id);
    if (!existing) return;

    const incoming: WatchlistItem = {
      ...existing,
      deleted: true,
      updatedAt: Date.now(),
      version: existing.version + 1,
    };

    if (this.shouldApply(incoming, existing)) {
      this.cache.delete(id);
      this.emit();
      this.broadcast(incoming);
    }

    try {
      await this.repo.remove(id);
    } catch {
      this.cache.set(id, existing);
      this.emit();
    }
  }

  /* ---------------- cross-tab apply ---------------- */

  private applyIncoming(item: WatchlistItem) {
    const existing = this.cache.get(item.id);

    if (!this.shouldApply(item, existing)) return;

    if (item.deleted) {
      this.cache.delete(item.id);
    } else {
      this.cache.set(item.id, item);
    }

    this.emit();
  }
}

export const watchlistService = new WatchlistService();
