import type { Session } from "./auth.types";

const SESSION_KEY = "movieverse:session";

export function saveSession(session: Session) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session)
  );
}

export function loadSession(): Session | null {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
