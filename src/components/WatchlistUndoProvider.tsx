"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type UndoPayload = {
  label: string;
  onUndo: () => void;
};

type UndoContextValue = {
  show: (payload: UndoPayload) => void;
};

const UndoContext =
  createContext<UndoContextValue | null>(null);

export function WatchlistUndoProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [undo, setUndo] =
    useState<UndoPayload | null>(null);

  function show(payload: UndoPayload) {
    setUndo(payload);

    // auto-dismiss after 4s
    setTimeout(() => {
      setUndo(null);
    }, 4000);
  }

  function handleUndo() {
    undo?.onUndo();
    setUndo(null);
  }

  return (
    <UndoContext.Provider value={{ show }}>
      {children}

      {/* Toast UI */}
      {undo && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 rounded-lg border bg-white px-4 py-2 shadow-lg">
          <span className="text-sm">
            {undo.label}
          </span>

          <button
            onClick={handleUndo}
            className="text-sm font-semibold text-blue-600"
          >
            Undo
          </button>
        </div>
      )}
    </UndoContext.Provider>
  );
}

/* ---------- hook ---------- */

export function useWatchlistUndo() {
  const ctx = useContext(UndoContext);

  if (!ctx) {
    throw new Error(
      "useWatchlistUndo must be used inside WatchlistUndoProvider"
    );
  }

  return ctx;
}
