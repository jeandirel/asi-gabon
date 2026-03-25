import { CHATBASE_BASE_URL, getChatbaseConfig } from "@/lib/chatbase/config";
import {
  logChatbaseRequestId,
  parseRetryAfter,
} from "@/lib/chatbase/errors";

interface PaginationOptions {
  cursor?: string | null;
  limit?: number;
}

interface ChatPayload {
  conversationId?: string | null;
  message: string;
  userId?: string | null;
}

interface RetryPayload {
  conversationId: string;
  messageId: string;
}

const MAX_RATE_LIMIT_RETRY_SECONDS = 5;

function sleep(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function buildUrl(pathname: string, params?: PaginationOptions) {
  const url = new URL(`${CHATBASE_BASE_URL}${pathname}`);

  if (params?.cursor) {
    url.searchParams.set("cursor", params.cursor);
  }

  if (params?.limit) {
    url.searchParams.set("limit", String(params.limit));
  }

  return url.toString();
}

async function chatbaseFetch(
  pathname: string,
  init: RequestInit,
  options?: { params?: PaginationOptions; retryOnRateLimit?: boolean },
) {
  const { apiKey } = getChatbaseConfig();
  const url = buildUrl(pathname, options?.params);
  let attempt = 0;

  while (true) {
    const response = await fetch(url, {
      ...init,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        ...init.headers,
      },
    });

    if (
      !options?.retryOnRateLimit ||
      response.status !== 429 ||
      attempt > 0
    ) {
      return response;
    }

    const retryAfter = parseRetryAfter(response.headers.get("Retry-After"));
    if (retryAfter == null || retryAfter > MAX_RATE_LIMIT_RETRY_SECONDS) {
      return response;
    }

    logChatbaseRequestId(
      "warn",
      `RATE_LIMIT_TOO_MANY_REQUESTS: retrying after ${retryAfter}s`,
      response.headers.get("x-request-id"),
    );

    attempt += 1;
    await sleep(retryAfter * 1000);
  }
}

export async function streamChatMessage(payload: ChatPayload) {
  const { agentId } = getChatbaseConfig();

  return chatbaseFetch(
    `/agents/${agentId}/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: payload.message,
        stream: true,
        ...(payload.conversationId
          ? { conversationId: payload.conversationId }
          : {}),
        ...(payload.userId ? { userId: payload.userId } : {}),
      }),
    },
    { retryOnRateLimit: true },
  );
}

export async function retryAssistantMessage(payload: RetryPayload) {
  const { agentId } = getChatbaseConfig();

  return chatbaseFetch(
    `/agents/${agentId}/conversations/${payload.conversationId}/retry`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageId: payload.messageId,
        stream: true,
      }),
    },
    { retryOnRateLimit: true },
  );
}

export async function getConversation(conversationId: string) {
  const { agentId } = getChatbaseConfig();

  return chatbaseFetch(
    `/agents/${agentId}/conversations/${conversationId}`,
    {
      method: "GET",
    },
    { retryOnRateLimit: true },
  );
}

export async function getConversationMessages(
  conversationId: string,
  params?: PaginationOptions,
) {
  const { agentId } = getChatbaseConfig();

  return chatbaseFetch(
    `/agents/${agentId}/conversations/${conversationId}/messages`,
    {
      method: "GET",
    },
    { params, retryOnRateLimit: true },
  );
}

export async function updateMessageFeedback(
  conversationId: string,
  messageId: string,
  feedback: "negative" | "positive" | null,
) {
  const { agentId } = getChatbaseConfig();

  return chatbaseFetch(
    `/agents/${agentId}/conversations/${conversationId}/messages/${messageId}/feedback`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedback }),
    },
    { retryOnRateLimit: true },
  );
}
