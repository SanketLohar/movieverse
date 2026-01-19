const DB_NAME = "movieverse-db";
export const STORE_NAME = "watchlist";
const DB_VERSION = 2;

export function openWatchlistDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (db.objectStoreNames.contains(STORE_NAME)) {
        db.deleteObjectStore(STORE_NAME);
      }

      db.createObjectStore(STORE_NAME, {
        keyPath: "id",
      });
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
