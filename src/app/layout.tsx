import "./globals.css";
import Header from "../components/Header";
import WatchlistHydrator from "../components/WatchlistHydrator";
import PageTransition from "../components/PageTransition";
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Client-side hydration */}
        <WatchlistHydrator />

        {/* Global header */}
        <Header />

        {/* Page transition wrapper */}
        <main className="mx-auto max-w-6xl p-4">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </body>
    </html>
  );
}
