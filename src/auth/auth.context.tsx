"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  loadSession,
  saveSession,
  clearSession
} from "./auth.storage";

import type { Session, User } from "./auth.types";

type AuthContextType = {
  session: Session | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] =
    useState<Session | null>(null);

  useEffect(() => {
    const existing = loadSession();
    if (existing) setSession(existing);
  }, []);

  function login(user: User) {
    const session: Session = {
      user,
      loggedInAt: Date.now()
    };

    saveSession(session);
    setSession(session);
  }

  function logout() {
    clearSession();
    setSession(null);
  }

  return (
    <AuthContext.Provider
      value={{ session, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }
  return ctx;
}
