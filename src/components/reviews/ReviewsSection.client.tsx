"use client";

import { useState } from "react";
import ReviewEditor from "./ReviewEditor.client";
import ReviewList from "./ReviewList.client";
import { useAuth } from "../../auth/useAuth";

export default function ReviewsSection({
  movieId,
}: {
  movieId: string;
}) {
  const { session } = useAuth();

  // ✅ undefined when not logged in
  const userId = session?.user.id;

  const [key, setKey] = useState(0);

  return (
    <section className="space-y-6 border-t pt-10">
      <ReviewEditor
        movieId={movieId}
        onSubmitted={() =>
          setKey((k) => k + 1)
        }
      />

      <ReviewList
        key={key}
        movieId={movieId}
        currentUserId={userId}
      />
    </section>
  );
}
