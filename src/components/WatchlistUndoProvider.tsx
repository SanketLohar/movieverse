"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

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
  const reduceMotion = useReducedMotion();

  // ✅ SINGLE undo state
  const [toast, setToast] =
    useState<UndoPayload | null>(null);

  function show(payload: UndoPayload) {
    setToast(payload);

    // auto-dismiss
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }

  return (
    <UndoContext.Provider value={{ show }}>
      {children}

      {/* ✅ Single undo toast */}
      <div
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence>
          {toast && (
            <motion.div
              key="undo-toast"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 24 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 24 }
              }
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 35,
              }}
              className="flex items-center gap-4 rounded-lg border bg-white px-4 py-2 shadow-lg"
            >
              <span className="text-sm">
                {toast.label}
              </span>

              <button
                onClick={() => {
                  toast.onUndo();
                  setToast(null);
                }}
                className="text-sm font-semibold text-blue-600"
              >
                Undo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
