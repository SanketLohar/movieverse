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
    <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
      <div>{children}</div>

      <aside className="space-y-6">
        {awards}
        {social}
        {similar}
      </aside>
    </div>
  );
}
