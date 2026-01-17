export default function ActorLoading() {
  return (
    <section className="space-y-10 py-8 animate-pulse">
      {/* Header skeleton */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Image placeholder */}
        <div className="h-[320px] w-[240px] rounded-lg bg-gray-200" />

        <div className="space-y-4 flex-1">
          <div className="h-8 w-2/3 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
          <div className="h-4 w-4/6 rounded bg-gray-200" />
        </div>
      </header>

      {/* Filmography skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-48 rounded bg-gray-200" />
        <div className="h-32 w-full rounded bg-gray-200" />
      </div>
    </section>
  );
}
