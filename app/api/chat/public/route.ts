import { error } from "console";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function POST(req: Request) {
  const authHeader = req.headers.get("Authorization");

  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { error: "Missing session token" },
      { status: 401 },
    );
  }

  let sessionId: string | undefined;
  let widgetId: string | undefined;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    sessionId = payload.sessionId as string;
    widgetId = payload.widgetId as string;

    if (!sessionId || !widgetId) {
      throw new Error("Invalid Token Payload");
    }
  } catch (error) {
    console.error("Token Verification failed:", error);
    return NextResponse.json(
      { error: "Invalid or expired Session token" },
      { status: 401 },
    );
  }
  let { messages, knowlege_source_ids } = await req.json();

  const lastMessage = messages[messages.length - 1];

  if (!lastMessage || lastMessage.role !== "user") {
    //edge case: cleingt migth send empty r wiered stat, hdle gracefully
    console.log("No new user message detect or invliade format");
  }

  try {
  } catch (error) {}
}
