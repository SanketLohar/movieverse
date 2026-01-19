export default function MovieLoading() {
  return (
    <section className="space-y-6 py-8 animate-pulse">
      <div className="h-8 w-1/2 bg-gray-200 rounded" />
      <div className="h-4 w-32 bg-gray-200 rounded" />

      <div className="space-y-3 max-w-2xl">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    </section>
  );
}
