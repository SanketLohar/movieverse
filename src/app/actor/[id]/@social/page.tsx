import { Suspense } from "react";

export const revalidate = 3600;

async function SocialContent() {
  await new Promise((res) => setTimeout(res, 300));

  return (
    <section className="rounded-lg border p-4">
      <h2 className="mb-2 font-semibold">Social</h2>
      <ul className="space-y-1 text-sm">
        <li>Twitter: @actor</li>
        <li>Instagram: @actor_official</li>
        <li>IMDb: Actor Profile</li>
      </ul>
    </section>
  );
}

export default function SocialPage() {
  return (
    <Suspense fallback={<SocialSkeleton />}>
      <SocialContent />
    </Suspense>
  );
}

function SocialSkeleton() {
  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 h-4 w-1/3 bg-gray-300" />
      <div className="mb-2 h-3 w-full bg-gray-200" />
      <div className="h-3 w-4/6 bg-gray-200" />
    </div>
  );
}
