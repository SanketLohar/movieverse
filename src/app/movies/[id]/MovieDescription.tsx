export default function MovieDescription({
  description,
}: {
  description: string;
}) {
  return (
    <p className="max-w-2xl">
      {description}
    </p>
  );
}
