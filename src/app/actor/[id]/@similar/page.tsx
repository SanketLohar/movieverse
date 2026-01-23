import { Suspense } from "react";

export const revalidate = 3600;

async function SimilarContent() {
  await new Promise((res) => setTimeout(res, 300));

  const similarActors: string[] = [];

  if (similarActors.length === 0) {
    return (
      <section className="rounded-lg border p-4 text-sm text-gray-500">
        No similar actors found.
      </section>
    );
  }

  return (
    <section className="rounded-lg border p-4">
      <h2 className="mb-2 font-semibold">
        Similar Actors
      </h2>
      <ul className="list-disc pl-4 text-sm">
        {similarActors.map((actor) => (
          <li key={actor}>{actor}</li>
        ))}
      </ul>
    </section>
  );
}

export default function SimilarPage() {
  return (
    <Suspense fallback={<SimilarSkeleton />}>
      <SimilarContent />
    </Suspense>
  );
}

function SimilarSkeleton() {
  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 h-4 w-1/3 bg-gray-300" />
      <div className="mb-2 h-3 w-full bg-gray-200" />
      <div className="h-3 w-5/6 bg-gray-200" />
    </div>
  );
}
