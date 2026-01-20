import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";

import { getMovieById } from "../../../data/movies/movie.repository";
import MovieCore from "./MovieCore";
import MovieDescription from "./MovieDescription";
import MovieMediaSwitcher from "./MovieMediaSwitcher.client";
import { preloadAdjacentMovies } from "../../../lib/prefetch";



export const runtime = "edge";
export const revalidate = 60;

/* ---------------------------------------
   Phase 5.1–5.3 Metadata
---------------------------------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const movie = await getMovieById(id);

  if (!movie) {
    return {
      title: "Movie not found | MovieVerse",
    };
  }

  const url = `https://movieverse.com/movies/${movie.id}`;

  return {
    title: `${movie.title} (${movie.year}) | MovieVerse`,
    description: movie.description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: `${movie.title} (${movie.year})`,
      description: movie.description,
      url,
      siteName: "MovieVerse",
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
   Page with JSON-LD
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

  const canonicalUrl = `https://movieverse.com/movies/${movie.id}`;

  // ✅ Phase 5.4 — JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    description: movie.description,
    datePublished: String(movie.year),
    url: canonicalUrl,
    trailer: {
      "@type": "VideoObject",
      name: `${movie.title} Official Trailer`,
      embedUrl: `https://www.youtube.com/embed/${movie.media.trailer}`,
    },
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* JSON-LD injected server-side */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_350px]">
          {/* Main column */}
          <div className="space-y-14">
            <MovieCore movie={movie} />

            <MovieMediaSwitcher
              title={movie.title}
              trailerId={movie.media.trailer}
              images={movie.media.stills}
            />

            <Suspense
              fallback={
                <div className="h-24 rounded bg-gray-100" />
              }
            >
              <MovieDescription description={movie.description} />
            </Suspense>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 h-96 rounded-xl border border-dashed bg-gray-50 p-8 text-center text-sm text-gray-400">
              Sidebar Area
              <br />
              (Phase 6)
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
