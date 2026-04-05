import { db } from "@/db/client";
import { metadata } from "@/db/schema";
import { isAuthorized } from "@/lib/isAuthorized";
import { eq, exists } from "drizzle-orm";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const user = await isAuthorized();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cookiesStore = await cookies();
    const metadataCookie = cookiesStore.get("metadata");
    if (metadataCookie?.value) {
      return NextResponse.json(
        {
          exists: true,
          source: "cookie",
          data: JSON.parse(metadataCookie.value),
        },
        { status: 200 },
      );
    }

    const [record] = await db
      .select()
      .from(metadata)
      .where(eq(metadata.user_email, user.email));

    if (record) {
      cookiesStore.set(
        "metadata",
        JSON.stringify({ business_name: record.business_name }),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        },
      );
    }

    return NextResponse.json(
      {
        exists: true,
        source: "database",
        data: record,
      },
      { status: 200 },
    );
    return NextResponse.json({ exists: false, data: null }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Metadata fetch error" },
      { status: 501 },
    );
  }
}
