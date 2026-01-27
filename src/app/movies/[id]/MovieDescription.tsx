type Props = {
  description: string;
};

export default function MovieDescription({
  description,
}: Props) {
  return (
<p className="text-gray-700 leading-relaxed text-sm sm:text-base">
      {description}
    </p>
  );
}
