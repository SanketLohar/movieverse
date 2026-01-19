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
    <html lang="en" className="antialiased">
      <body className="flex min-h-screen flex-col bg-white text-gray-900">
        {/* Hydrate IndexedDB → memory */}
        <WatchlistHydrator />

        {/* Undo system MUST wrap toggles */}
        <WatchlistUndoProvider>
          <Header />
          
          {/* REMOVED: max-w-6xl mx-auto
             WHY: The page.tsx now handles the container. 
             This prevents the "double margin" issue that made your page small.
          */}
          <main className="flex-1">
            {children}
          </main>
        </WatchlistUndoProvider>
      </body>
    </html>
  );
}