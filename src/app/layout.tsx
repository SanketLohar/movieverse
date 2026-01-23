import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "./providers";

import Header from "../components/Header";
import WatchlistHydrator from "../components/WatchlistHydrator";
import { WatchlistUndoProvider } from "../components/WatchlistUndoProvider";
import { AuthProvider } from "../auth/auth.context";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),

  title: {
    default: "MovieVerse",
    template: "%s | MovieVerse",
  },

  description:
    "Discover movies, actors, and build your personal watchlist with MovieVerse.",

  applicationName: "MovieVerse",

  keywords: [
    "movies",
    "actors",
    "film database",
    "watchlist",
    "movieverse",
  ],

  authors: [{ name: "MovieVerse Team" }],

  creator: "MovieVerse",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    siteName: "MovieVerse",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="flex min-h-screen flex-col bg-white text-gray-900">
        {/* Hydrates watchlist from localStorage */}
        <WatchlistHydrator />

        {/* Global providers */}
        <AuthProvider>
          <QueryProvider>
          <WatchlistUndoProvider>
            <Header />
<main className="flex-1 bg-gray-50">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
    {children}
  </div>
</main>
          </WatchlistUndoProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
