import { NextResponse } from "next/server";
import { getMovieById } from "../../../../data/movies/movie.repository";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const movie = await getMovieById(id);

  if (!movie) {
    return Response.json(
      { error: "Movie not found" },
      { status: 404 }
    );
  }

  return Response.json(movie);
}