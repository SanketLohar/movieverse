import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { path } = body;

  if (!path) {
    return NextResponse.json(
      { message: "Path is required" },
      { status: 400 }
    );
  }

  // ✅ Force revalidation of the given path
  revalidatePath(path);

  return NextResponse.json({
    revalidated: true,
    path,
    timestamp: Date.now(),
  });
}
