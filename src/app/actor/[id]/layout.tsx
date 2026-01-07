type Props = {
  children: React.ReactNode;
  awards: React.ReactNode;
  social: React.ReactNode;
  similar: React.ReactNode;
};

export default function ActorLayout({
  children,
  awards,
  social,
  similar,
}: Props) {
  return (
    <section>
      <div>{children}</div>

      <hr />

      <div style={{ display: "flex", gap: "16px" }}>
        <div style={{ flex: 1 }}>{awards}</div>
        <div style={{ flex: 1 }}>{social}</div>
        <div style={{ flex: 1 }}>{similar}</div>
      </div>
    </section>
  );
}
