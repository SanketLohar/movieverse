import { NextRequest, NextResponse } from "next/server";
import { getMovieById } from "../../../../data/movies/movie.repository";

export const runtime = "edge";

function generateETag(data: unknown) {
  return `"${Buffer.from(JSON.stringify(data)).toString("base64")}"`;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const movie = await getMovieById(id);

  if (!movie) {
    return NextResponse.json(
      { message: "Movie not found" },
      { status: 404 }
    );
  }

  const etag = generateETag(movie);

  const ifNoneMatch = req.headers.get("if-none-match");

  // ✅ Conditional request
  if (ifNoneMatch === etag) {
    return new NextResponse(null, {
      status: 304,
      headers: {
        ETag: etag,
      },
    });
  }

  return NextResponse.json(movie, {
    headers: {
      "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      ETag: etag,
    },
  });
}
