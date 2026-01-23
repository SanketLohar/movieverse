const channel = new BroadcastChannel("movieverse-reviews");

export function notifyReviewUpdate() {
  channel.postMessage("updated");
}

export function onReviewUpdate(cb: () => void) {
  channel.onmessage = () => cb();
}
