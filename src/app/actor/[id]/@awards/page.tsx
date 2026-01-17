import { Suspense } from "react";

export const revalidate = 3600;

async function AwardsContent() {
  // Simulated async fetch
  await new Promise((res) => setTimeout(res, 300));

  return (
    <section className="rounded-lg border p-4">
      <h2 className="mb-2 font-semibold">Awards</h2>
      <ul className="list-disc pl-4 text-sm">
        <li>Academy Award (2016)</li>
        <li>Golden Globe Award</li>
        <li>BAFTA Award</li>
      </ul>
    </section>
  );
}

export default function AwardsPage() {
  return (
    <Suspense fallback={<AwardsSkeleton />}>
      <AwardsContent />
    </Suspense>
  );
}

function AwardsSkeleton() {
  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 h-4 w-1/3 bg-gray-300" />
      <div className="mb-2 h-3 w-full bg-gray-200" />
      <div className="h-3 w-5/6 bg-gray-200" />
    </div>
  );
}
