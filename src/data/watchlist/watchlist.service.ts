import { IndexedDBWatchlistRepository } from "./watchlist.indexeddb.repository";
import type { WatchlistItem } from "./watchlist.schema";
import { watchlistChannel } from "./watchlist.channel";

type Listener = () => void;
type MutationSource = "local" | "remote";

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
        this.applyIncoming(msg.item, "remote");
      }

      if (msg.type === "remove") {
        this.applyIncoming(
          {
            id: msg.id,
            type: "movie",
            addedAt: 0,
            updatedAt: Date.now(),
            deleted: true,
            version: Number.MAX_SAFE_INTEGER,
          },
          "remote"
        );
      }
    });
  }

  /* ---------------- state ---------------- */

  isReady() {
    return this.ready;
  }

  getAll() {
    return Array.from(this.cache.values());
  }

  has(id: string) {
    return this.cache.has(id);
  }

  /* ---------------- subscriptions ---------------- */

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit() {
    this.listeners.forEach((fn) => fn());
  }

  forceEmit() {
    this.emit();
  }

  /* ---------------- conflict resolution ---------------- */

  private shouldApply(
    incoming: WatchlistItem,
    existing?: WatchlistItem,
    source: MutationSource = "remote"
  ) {
    if (source === "local") return true;
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

    if (this.shouldApply(incoming, existing, "local")) {
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

    if (this.shouldApply(incoming, existing, "local")) {
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

  /* ---------------- clear all ---------------- */

  async clear() {
    const items = Array.from(this.cache.values());

    // optimistic UI
    this.cache.clear();
    this.emit();

    // broadcast removals
    items.forEach((item) => {
      this.broadcast({
        ...item,
        deleted: true,
        updatedAt: Date.now(),
        version: item.version + 1,
      });
    });

    try {
      await this.repo.clear();
    } catch {
      // rollback
      items.forEach((item) => {
        this.cache.set(item.id, item);
      });
      this.emit();
    }
  }

  /* ---------------- remote sync ---------------- */

  private applyIncoming(
    item: WatchlistItem,
    source: MutationSource
  ) {
    const existing = this.cache.get(item.id);

    if (!this.shouldApply(item, existing, source)) return;

    if (item.deleted) this.cache.delete(item.id);
    else this.cache.set(item.id, item);

    this.emit();
  }
}

export const watchlistService = new WatchlistService();
