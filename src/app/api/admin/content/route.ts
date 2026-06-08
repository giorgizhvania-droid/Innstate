import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getContent, saveContent, type Content } from "@/lib/content";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getContent());
}

function isValidContent(value: unknown): value is Content {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  if (!Array.isArray(v.destinations) || !Array.isArray(v.deals)) return false;
  return v.destinations.every(
    (d) =>
      d &&
      typeof d.slug === "string" &&
      typeof d.name === "string" &&
      typeof d.country === "string" &&
      typeof d.image === "string" &&
      typeof d.dealsCount === "number"
  ) && v.deals.every(
    (d) =>
      d &&
      typeof d.slug === "string" &&
      typeof d.hotelName === "string" &&
      typeof d.destinationSlug === "string" &&
      typeof d.location === "string" &&
      typeof d.image === "string" &&
      typeof d.description === "string"
  );
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValidContent(body)) {
    return NextResponse.json({ error: "Invalid content shape" }, { status: 400 });
  }

  await saveContent(body);
  return NextResponse.json({ ok: true });
}
