import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== "admin-secret") {
    return NextResponse.json(
      { message: "Invalid secret" },
      { status: 401 }
    );
  }

  revalidateTag("actor");

  return NextResponse.json({
    revalidated: true,
    now: Date.now()
  });
}
