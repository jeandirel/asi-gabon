import type { ChatbaseFeedbackValue } from "@/types/chatbase";

export type ChatMessageRole = "assistant" | "user";
export type ChatMessageStatus = "complete" | "error" | "streaming";

export interface ChatMessage {
  id: string;
  serverId: string | null;
  role: ChatMessageRole;
  text: string;
  createdAt: number;
  status: ChatMessageStatus;
  feedback: ChatbaseFeedbackValue;
  errorCode?: string | null;
}

export interface PersistedChatSession {
  conversationId: string | null;
  userId: string | null;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    retryAfter?: number | null;
  };
}
