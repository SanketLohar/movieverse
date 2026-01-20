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

  let body: { actorId?: string };

  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const actorId = body.actorId;

  if (!actorId) {
    return NextResponse.json(
      { message: "actorId is required" },
      { status: 400 }
    );
  }

  // 🔁 Revalidate single actor page
  revalidateTag(`actor-${actorId}`);

  // 🔁 Revalidate actor listings
  revalidateTag("actors");

  return NextResponse.json({
    revalidated: true,
    actorId,
    timestamp: Date.now(),
  });
}
