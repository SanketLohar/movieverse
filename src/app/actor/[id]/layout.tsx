import { Suspense } from "react";

export default function ActorLayout({
  children,
  awards,
  social,
  similar,
}: {
  children: React.ReactNode;
  awards: React.ReactNode;
  social: React.ReactNode;
  similar: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 min-w-0">
          {children}
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <Suspense fallback={<div>Loading…</div>}>{awards}</Suspense>
          <Suspense fallback={<div>Loading…</div>}>{social}</Suspense>
          <Suspense fallback={<div>Loading…</div>}>{similar}</Suspense>
        </aside>
      </div>
    </section>
  );
}
