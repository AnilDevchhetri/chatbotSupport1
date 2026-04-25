import { db } from "@/db/client";
import { chatBotMetadata, knowledge_source } from "@/db/schema";
import { isAuthorized } from "@/lib/isAuthorized";
import { count, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await isAuthorized();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const bots = await db
      .select()
      .from(chatBotMetadata)
      .where(eq(chatBotMetadata.user_email, user.email));
    const bodIds = bots?.map((b) => b.id);

    const ks = await db
      .select({
        type: knowledge_source.type,
        count: count(),
      })
      .from(knowledge_source)
      .where(eq(knowledge_source.user_email, user.email))
      .groupBy(knowledge_source.type);
  } catch (error) {}
}
