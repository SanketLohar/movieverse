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
    <section className="space-y-10">
      {children}

      <div className="grid gap-6 md:grid-cols-3">
        <div>{awards}</div>
        <div>{social}</div>
        <div>{similar}</div>
      </div>
    </section>
  );
}
