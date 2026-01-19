"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
};

export default function MovieCarousel({ images }: Props) {
  const [index, setIndex] = useState(0);

  return (
    <>
      <Image
        src={images[index]}
        alt="Movie still"
        fill
        className="object-cover"
        priority
      />

      {/* thumbnails */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setIndex(i)}
            className={`relative h-16 w-24 overflow-hidden rounded ${
              i === index
                ? "ring-2 ring-yellow-400"
                : "opacity-70"
            }`}
          >
            <Image
              src={img}
              alt="thumbnail"
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </>
  );
}
