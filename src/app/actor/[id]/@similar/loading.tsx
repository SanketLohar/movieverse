export default function SimilarLoading() {
  return (
    <section className="rounded-lg border p-4 animate-pulse">
      <div className="mb-3 h-4 w-1/3 rounded bg-gray-200" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-5/6 rounded bg-gray-200" />
        <div className="h-3 w-4/6 rounded bg-gray-200" />
      </div>
    </section>
  );
}
