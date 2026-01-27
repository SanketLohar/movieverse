import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";

import { getMovieById } from "../../../data/movies/movie.repository";
import MovieCore from "./MovieCore";
import MovieDescription from "./MovieDescription";
import MovieMediaSwitcher from "./MovieMediaSwitcher.client";
import ReviewsSection from "../../../components/reviews/ReviewsSection.client";
import { preloadAdjacentMovies } from "../../../lib/prefetch";

export const runtime = "edge";
export const revalidate = 60;

/* ---------------------------------------
   Metadata
---------------------------------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const movie = await getMovieById(id);

  if (!movie) {
    return { title: "Movie not found | MovieVerse" };
  }

  const url = `https://movieverse.com/movies/${movie.id}`;

  return {
    title: `${movie.title} (${movie.year}) | MovieVerse`,
    description: movie.description,
    alternates: { canonical: url },

    openGraph: {
      title: `${movie.title} (${movie.year})`,
      description: movie.description,
      url,
      type: "video.movie",
    },

    twitter: {
      card: "summary_large_image",
      title: `${movie.title} (${movie.year})`,
      description: movie.description,
    },
  };
}

/* ---------------------------------------
   Page
---------------------------------------- */

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await preloadAdjacentMovies(id);

  const movie = await getMovieById(id);
  if (!movie) notFound();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="space-y-14">
          {/* Core */}
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <MovieCore movie={movie} />
          </section>

          {/* Media */}
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <MovieMediaSwitcher
              title={movie.title}
              trailerId={movie.media.trailer}
              images={movie.media.stills}
            />
          </section>

          {/* Description */}
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <Suspense
              fallback={
                <div className="h-24 animate-pulse rounded bg-gray-100" />
              }
            >
              <MovieDescription description={movie.description} />
            </Suspense>
          </section>

          {/* Reviews */}
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <ReviewsSection movieId={movie.id} />
          </section>
        </div>
      </div>
    </main>
  );
}
