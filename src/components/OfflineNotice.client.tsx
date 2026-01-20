"use client";

import { useNetworkStatus } from "../hooks/useNetworkStatus";

export default function OfflineNotice() {
  const { isOnline } = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="rounded-md border border-yellow-300 bg-yellow-50 px-4 py-2 text-sm text-yellow-800"
    >
      You’re offline. Showing cached data.
    </div>
  );
}
