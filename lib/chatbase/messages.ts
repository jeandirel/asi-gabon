import type { ChatMessage } from "@/types/chat";
import type { ChatbaseMessage } from "@/types/chatbase";

function normalizeTimestamp(value: number) {
  return value > 1_000_000_000_000 ? value : value * 1000;
}

export function getTextFromParts(parts: { text: string; type: string }[]) {
  return parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function toChatMessage(message: ChatbaseMessage): ChatMessage | null {
  if (message.role !== "assistant" && message.role !== "user") {
    return null;
  }

  return {
    id: message.id,
    serverId: message.id,
    role: message.role,
    text: getTextFromParts(message.parts),
    createdAt: normalizeTimestamp(message.createdAt),
    status: "complete",
    feedback: message.feedback ?? null,
    errorCode: null,
  };
}
