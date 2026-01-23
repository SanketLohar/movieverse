"use client";

import { nanoid } from "nanoid";
import { useAuth } from "../../auth/useAuth";

export default function LoginButton() {
  const { login, logout, session } = useAuth();

  if (session) {
    return (
      <button
        onClick={logout}
        className="px-3 py-1 text-sm border rounded"
      >
        Logout
      </button>
    );
  }

  return (
    <button
      onClick={() =>
        login({
          id: nanoid(),
          name: "Movie User",
          avatar:
            "https://api.dicebear.com/7.x/identicon/svg"
        })
      }
      className="px-3 py-1 text-sm border rounded"
    >
      Login
    </button>
  );
}
