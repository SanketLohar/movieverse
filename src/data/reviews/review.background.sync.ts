import { ReviewService } from "./review.service";
import { loadQueue, clearQueue } from "./review.sync.queue";

export function initReviewBackgroundSync() {
  window.addEventListener("online", async () => {
    const queue = loadQueue();
    if (!queue.length) return;

    for (const item of queue) {
      try {
        await ReviewService.submitReview(item.payload);
      } catch {
        return;
      }
    }

    clearQueue();
  });
}
