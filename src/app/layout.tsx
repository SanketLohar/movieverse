import "./globals.css";
import Header from "../components/Header";
import WatchlistHydrator from "../components/WatchlistHydrator";
import { WatchlistUndoProvider } from "../components/WatchlistUndoProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Hydrate IndexedDB → memory */}
        <WatchlistHydrator />

        {/* Undo system MUST wrap toggles */}
        <WatchlistUndoProvider>
          <Header />

          <main className="mx-auto max-w-6xl p-4">
            {children}
          </main>
        </WatchlistUndoProvider>
      </body>
    </html>
  );
}
