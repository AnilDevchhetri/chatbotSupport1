import { db } from "@/db/client";
import { metadata } from "@/db/schema";
import { isAuthorized } from "@/lib/isAuthorized";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await isAuthorized();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { business_name, webiste_url, external_links } = await req.json();
  if (!business_name || !webiste_url) {
    return NextResponse.json(
      { error: "Missiong business name or webiste Url" },
      { status: 400 },
    );
  }

  const metaDataResponse = await db.insert(metadata).values({
    user_email: user.email,
    business_name,
    webiste_url,
    external_links,
  });

  (await cookies()).set("metadata", JSON.stringify({ business_name }));
  return NextResponse.json({ metaDataResponse }, { status: 201 });
}
