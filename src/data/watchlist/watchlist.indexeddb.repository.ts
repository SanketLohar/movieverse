import { openWatchlistDB, STORE_NAME } from "./watchlist.db";
import type { WatchlistItem } from "./watchlist.schema";
import type {
  WatchlistRepository,
  WatchlistChange,
} from "./watchlist.repository";

export class IndexedDBWatchlistRepository
  implements WatchlistRepository
{
  async getAll(): Promise<WatchlistItem[]> {
    const db = await openWatchlistDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        const items = (req.result ?? []).filter(
          (item) => !item.deleted
        );
        resolve(items);
      };

      req.onerror = () => reject(req.error);
    });
  }

  async getById(id: string): Promise<WatchlistItem | null> {
    const db = await openWatchlistDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);

      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => reject(req.error);
    });
  }

  async add(item: WatchlistItem): Promise<void> {
    const db = await openWatchlistDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.put(item);

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async remove(id: string): Promise<void> {
    const db = await openWatchlistDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);

      const req = store.get(id);
      req.onsuccess = () => {
        const item = req.result;
        if (!item) return resolve();

        item.deleted = true;
        item.updatedAt = Date.now();
        item.version += 1;

        store.put(item);
      };

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async applyRemoteChange(
    change: WatchlistChange
  ): Promise<void> {
    if (change.type === "add") {
      await this.add(change.item);
    }

    if (change.type === "remove") {
      await this.remove(change.id);
    }
  }
}
