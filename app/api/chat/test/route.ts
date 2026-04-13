import { db } from "@/db/client";
import { knowledge_source } from "@/db/schema";
import { countCoverstaionToken } from "@/lib/countConversationtoken";
import { isAuthorized } from "@/lib/isAuthorized";
import { summarizeConversation } from "@/lib/onepAi";
import { inArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import openai from "openai";
import OpenAi from "openai";
export async function POST(req: Request) {
  const user = await isAuthorized();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let { messages, knowledge_source_ids } = await req.json();

  let context = "";

  if (knowledge_source_ids && knowledge_source_ids.length > 0) {
    const sources = await db
      .select({
        content: knowledge_source_ids.content,
      })
      .from(knowledge_source)
      .where(inArray(knowledge_source.id, knowledge_source_ids));

    context = sources
      .map((s) => s.content)
      .filter(Boolean)
      .join("\n\n");
  }
  const tokenCount = countCoverstaionToken(messages);

  if (tokenCount > 6000) {
    const recentMessages = messages.slice(-10);
    const olderMessages = messages.slice(0, -10);

    if (olderMessages.length > 0) {
      const summery = await summarizeConversation(olderMessages);
      context = `PREVIOUS CONVERSTAION SUMMAR: \n ${summery} \n\n` + context;

      messages = recentMessages;
    }
  }

  const systemPrompt = `
      You are Sarah, a friendly customer support assistant.

      Rules:
      - Name → "I'm Sarah"
      - Role → "Customer support specialist"
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
      model: "gpt-5-nano",
      temperature: 1.0,
      max_tokens: 700,
      messages: [],
    });
  } catch {}

  //RAG = Rertriavla Augemented Genrative
}
