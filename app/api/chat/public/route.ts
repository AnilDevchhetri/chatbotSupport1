import { error } from "console";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { db } from "@/db/client";
import { conversation, knowledge_source } from "@/db/schema";
import { messages as messagesTable } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { countCoverstaionToken } from "@/lib/countConversationtoken";
import { openai, summarizeConversation } from "@/lib/onepAi";

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
    const [existingConv] = await db
      .select()
      .from(conversation)
      .where(eq(conversation.id, sessionId))
      .limit(1);

    if (!existingConv) {
      const forwardedFor = req.headers.get("x-forwarded-for");
      const ip = forwardedFor ? forwardedFor.split(",")[0] : "Unknown IP";
      const visitorName = `#Visitor(${ip})`;

      await db.insert(conversation).values({
        id: sessionId,
        chatbot_id: widgetId,
        visitor_ip: ip,
        name: visitorName,
      });

      const previousMessages = messages.slice(0, -1);
      if (previousMessages.length > 0) {
        for (const msg of previousMessages) {
          await db.insert(messagesTable).values({
            conversation_id: sessionId,
            role: msg.role as "user" | "assistant",
            content: msg.content,
          });
        }
      }
    }
    if (lastMessage && lastMessage.role === "user") {
      await db.insert(messagesTable).values({
        conversation_id: sessionId,
        role: "user",
        content: lastMessage.content,
      });
    }
  } catch (error) {
    console.error("Database Persistence Error (User): ", error);
  }

  let context = "";
  if (knowlege_source_ids && knowlege_source_ids.length > 0) {
    try {
      const sources = await db
        .select({
          content: knowledge_source.content,
        })
        .from(knowledge_source)
        .where(inArray(knowledge_source.id, knowlege_source_ids));

      context = sources
        .map((s) => s.content)
        .filter(Boolean)
        .join("\n\n");
    } catch (error) {
      console.error("Rag Retrieval Error: ", error);
    }
  }

  //count the token
  const tokenCount = countCoverstaionToken(messages);
  if (tokenCount > 6000) {
    const recentMessages = messages.slice(-10);
    const olderMessages = messages.slice(0, -10);
    if (olderMessages.length > 0) {
      const summary = await summarizeConversation(olderMessages);
      context = `PREVIOUS CONVERSATION SUMMAR: \n ${summary}\n\n` + context;
      messages = recentMessages;
    }
  }

  const systemPrompt = `
      
      Rules:
      - Name → "use data we give you in context"
      - Role → "get role from the prompt data"
      - Keep replies VERY short (1–2 sentences)
      - Be conversational, not robotic
      - Ask questions if the request is unclear
      - Don’t give long explanations
      

      Escalation:
      - If unsure, say so and ask for details
      - If user wants a ticket, confirm creation

      Context:
      ${context}

      `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 200,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    });

    const reply =
      completion.choices[0].message.content ||
      "I'm Sorry, I could't generate a response.";

    try {
      await db.insert(messagesTable).values({
        conversation_id: sessionId,
        role: "assistant",
        content: reply,
      });
    } catch (error) {
      console.log("error on get response form ai", error);
      return NextResponse.json(
        {
          resposne: "An error occured while adding  reply in db..",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ response: reply });
  } catch (error) {
    console.log("error on get response form ai", error);
    return NextResponse.json(
      {
        resposne: "An error occured while processing your request.",
      },
      { status: 500 },
    );
  }
}
