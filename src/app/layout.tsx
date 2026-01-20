import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import WatchlistHydrator from "../components/WatchlistHydrator";
import { WatchlistUndoProvider } from "../components/WatchlistUndoProvider";

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
        <WatchlistHydrator />

        <WatchlistUndoProvider>
          <Header />
          <main className="flex-1">{children}</main>
        </WatchlistUndoProvider>
      </body>
    </html>
  );
}
