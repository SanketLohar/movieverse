"use client";

import { useState } from "react";
import ReviewEditor from "./ReviewEditor.client";
import ReviewList from "./ReviewList.client";
import { useAuth } from "../../auth/useAuth";

type Props = {
  movieId: string;
};

export default function ReviewsSection({
  movieId,
}: Props) {
  const { session } = useAuth();
  const userId = session?.user.id;

  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <section className="space-y-6">
      <ReviewEditor
        movieId={movieId}
        onSubmitted={() =>
          setRefreshKey((k) => k + 1)
        }
      />

      <ReviewList
        key={refreshKey}
        movieId={movieId}
        currentUserId={userId}
      />
    </section>
  );
}
