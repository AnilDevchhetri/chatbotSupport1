import { encodingForModel } from "js-tiktoken";

const enc = encodingForModel("gpt-5-nano");

export function countTokens(text: string): number {
  return enc.encode(text).length;
}

export function countCoverstaionToken(
  messages: { role: string; content: string }[],
) {
  let tokens = 0;
  for (const msg of messages) {
    tokens += 4;
    tokens += enc.encode(msg.content).length;
  }
  tokens += 2;
  return tokens;
}
