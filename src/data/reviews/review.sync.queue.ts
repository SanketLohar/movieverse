type PendingReview = {
  payload: any;
};

const KEY = "movieverse:review-sync-queue";

export function enqueueReview(payload: any) {
  const queue = loadQueue();
  queue.push({ payload });
  localStorage.setItem(KEY, JSON.stringify(queue));
}

export function loadQueue(): PendingReview[] {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function clearQueue() {
  localStorage.removeItem(KEY);
}
