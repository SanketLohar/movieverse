const LIMIT = 5;
const WINDOW = 60_000;

let timestamps: number[] = [];

export function canPerformAction() {
  const now = Date.now();

  timestamps = timestamps.filter(
    (t) => now - t < WINDOW
  );

  if (timestamps.length >= LIMIT) {
    return false;
  }

  timestamps.push(now);
  return true;
}
