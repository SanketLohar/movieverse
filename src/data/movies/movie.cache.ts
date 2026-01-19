const movieCache = new Map<string, Promise<any>>();

export function getCachedMovie<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  if (!movieCache.has(key)) {
    movieCache.set(key, fetcher());
  }

  return movieCache.get(key)!;
}
