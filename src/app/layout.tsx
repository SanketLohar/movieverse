import "../app/globals.css";
import Header from "../components/Header";
import WatchlistHydrator from "../components/WatchlistHydrator";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Client-side IndexedDB → LocalStorage hydration */}
        <WatchlistHydrator />

        {/* Global navigation */}
        <Header />

        {/* Page content */}
        <main className="mx-auto max-w-6xl p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
