export type ChatbaseErrorCode =
  | "AGENT_NOT_FOUND"
  | "AUTH_EXPIRED_API_KEY"
  | "AUTH_INSUFFICIENT_PERMISSIONS"
  | "AUTH_INVALID_API_KEY"
  | "AUTH_MISSING_API_KEY"
  | "CHAT_AGENT_CREDITS_EXHAUSTED"
  | "CHAT_CONVERSATION_MISMATCH"
  | "CHAT_CONVERSATION_NOT_ONGOING"
  | "CHAT_CREDITS_EXHAUSTED"
  | "CHAT_MODEL_NOT_ALLOWED"
  | "CHAT_RETRY_MESSAGE_NOT_FOUND"
  | "CHAT_RETRY_NO_USER_MESSAGE"
  | "CHAT_STREAMING_ERROR"
  | "INTERNAL_SERVER_ERROR"
  | "RATE_LIMIT_TOO_MANY_REQUESTS"
  | "RESOURCE_MESSAGE_NOT_ASSISTANT"
  | "RESOURCE_MESSAGE_NOT_FOUND"
  | "RESOURCE_NOT_FOUND"
  | "SUBSCRIPTION_PLAN_REQUIRED"
  | "VALIDATION_INVALID_BODY"
  | "VALIDATION_INVALID_JSON"
  | string;

export type ChatbaseMessageRole = "assistant" | "system" | "user";
export type ChatbaseConversationStatus = "ended" | "ongoing" | "taken_over";
export type ChatbaseFeedbackValue = "negative" | "positive" | null;

export interface ChatbaseMessagePart {
  type: "text";
  text: string;
}

export interface ChatbaseMessage {
  id: string;
  role: ChatbaseMessageRole;
  parts: ChatbaseMessagePart[];
  createdAt: number;
  feedback?: ChatbaseFeedbackValue;
  metadata?: Record<string, unknown>;
}

export interface ChatbaseConversation {
  id: string;
  title: string | null;
  createdAt: number;
  updatedAt: number;
  userId: string | null;
  status: ChatbaseConversationStatus;
  messages?: ChatbaseMessage[];
}

export interface ChatbasePagination {
  cursor: string | null;
  hasMore: boolean;
  total: number;
}

export interface ChatbaseListResponse<T> {
  data: T[];
  pagination: ChatbasePagination;
}

export interface ChatbaseGetConversationResponse {
  data: ChatbaseConversation & {
    messages: ChatbaseMessage[];
  };
  pagination: ChatbasePagination;
}

export interface ChatbaseErrorResponse {
  error: {
    code: ChatbaseErrorCode;
    message: string;
    details?: Record<string, string>;
  };
}

export interface ChatbaseUsage {
  credits?: number;
}

export interface ChatbaseFinishMetadata {
  conversationId: string;
  userId?: string | null;
  usage?: ChatbaseUsage;
}

export interface ChatbaseStreamStartEvent {
  type: "start";
  messageId: string;
}

export interface ChatbaseStreamTextDeltaEvent {
  type: "text-delta";
  delta: string;
}

export interface ChatbaseStreamFinishEvent {
  type: "finish";
  finishReason: string;
  metadata: ChatbaseFinishMetadata;
}

export interface ChatbaseStreamErrorEvent {
  type: "error";
  error: {
    code?: ChatbaseErrorCode;
    message: string;
    retryAfter?: number | null;
  };
}

export type ChatbaseStreamEvent =
  | ChatbaseStreamErrorEvent
  | ChatbaseStreamFinishEvent
  | ChatbaseStreamStartEvent
  | ChatbaseStreamTextDeltaEvent;

export interface PublicApiError {
  code: string;
  message: string;
  retryAfter?: number | null;
}
