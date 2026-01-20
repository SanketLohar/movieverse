export default function LoadingMoviePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_350px]">

          {/* Main column */}
          <div className="space-y-14">

            {/* Title */}
            <div className="space-y-3">
              <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
            </div>

            {/* Media */}
            <div className="aspect-video w-full animate-pulse rounded-xl bg-gray-200" />

            {/* Description */}
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-4/6 animate-pulse rounded bg-gray-100" />
            </div>

          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="h-96 animate-pulse rounded-xl bg-gray-100" />
          </aside>

        </div>
      </div>
    </main>
  );
}
