import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getMovieById } from "../../../data/movies/movie.repository";
import MovieCore from "./MovieCore";
import MovieDescription from "./MovieDescription";
import MovieMediaSwitcher from "./MovieMediaSwitcher.client";

export const runtime = "edge";
export const revalidate = 60;

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieById(id);

  if (!movie) notFound();

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      {/* Page container */}
      <div className="container mx-auto max-w-5xl px-4 py-12 md:px-6 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_350px] lg:gap-16">
          {/* ===============================
              MAIN CONTENT COLUMN
          =============================== */}
          <div className="space-y-14">
            {/* Movie identity block */}
            <section className="space-y-4">
              <MovieCore movie={movie} />
            </section>

            {/* Media surface */}
            <section
              aria-label="Media Gallery"
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6"
            >
              <MovieMediaSwitcher
                title={movie.title}
                trailerId={movie.media.trailer}
                images={movie.media.stills}
              />
            </section>

            {/* Description */}
            <section className="prose max-w-none">
              <Suspense
                fallback={
                  <div className="h-24 animate-pulse rounded-lg bg-gray-100" />
                }
              >
                <MovieDescription description={movie.description} />
              </Suspense>
            </section>
          </div>

          {/* ===============================
              SIDEBAR (PHASE 4 RESERVED)
          =============================== */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 h-96 w-full rounded-xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-400">
              Sidebar Area
              <br />
              (Reserved for Phase 4)
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
