"use client";

import { useState } from "react";
import ReviewEditor from "./ReviewEditor.client";
import ReviewList from "./ReviewList.client";

export default function ReviewsSection({
  movieId
}: {
  movieId: string;
}) {
  const [key, setKey] = useState(0);

  return (
    <section className="space-y-6 border-t pt-10">
      <ReviewEditor
        movieId={movieId}
        userId="u1"
        onSubmitted={() =>
          setKey((k) => k + 1)
        }
      />

      <ReviewList
        key={key}
        movieId={movieId}
        currentUserId="u1"
      />
    </section>
  );
}
