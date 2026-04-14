import OpenAi from "openai";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const customFetch = (url: RequestInfo | URL, init?: RequestInit) => {
  return fetch(url, {
    ...init,
    //@ts-ignore - node.js sepecif
    agent: url.toString().startsWith("https") ? agent : undefined,
  });
};

export const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
  fetch: customFetch,
  baseURL: process.env.OPENAI_BASE_URL,
});

export async function summarizeMarkdown(markDown: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano",
      temperature: 1.0,
      max_tokens: 700,
      messages: [
        {
          role: "system",
          content: `
                You are a strict data summarization engine for an AI chatbot.
                Your task:
                Transform the given input (website markdown, raw text, or CSV data) into a highly condensed, clean plain-text summary.
                Rules (VERY IMPORTANT):
                - Do NOT copy sentences directly from the input
                - Do NOT repeat content
                - Remove all unnecessary details, filler, and duplication
                - Keep only the most important facts and meaning
                - Rewrite everything in your own words
                - Output must be concise and information-dense
                - No markdown, no bullet points, no headings
                - No explanations about what you did
                - No introductory phrases like "This text is about"
                - No trailing commentary
                Style:
                - Write in simple, clear sentences
                - Make it readable for an AI knowledge base
                - Focus on meaning, not wording,
                - The Final output must be under 2000 words
                Important: if content is english use english, if in japnese use japanese. and if in any other language, then the sumarize content must be according to that language.
                Goal:
                Produce a short, clean, non-repetitive summary that captures the core information only.
                `,
        },
        {
          role: "user",
          content: markDown,
        },
      ],
    });

    console.log("completiong is ", completion.usage);
    return completion.choices[0].message.content?.trim() ?? "";
  } catch (error) {
    console.error("Error in summarizeMarkdown", error);
    throw error;
  }
}

export async function summarizeConversation(messages: any[]) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano",
      temperature: 0.8,
      max_tokens: 700,
      messages: [
        {
          role: "system",
          content: `
          Summarize the following converstion history into a consice paragraph,  preserving key details and user intent.
          the final output must be under 1500 words.
                `,
        },
        ...messages,
      ],
    });
    return completion.choices[0].message.content?.trim() ?? "";
  } catch (error) {
    console.error("Error in summarizeConversation", error);
    throw error;
  }
}
