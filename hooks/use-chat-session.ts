"use client";

import { useEffect, useState } from "react";

import { toChatMessage } from "@/lib/chatbase/messages";
import type { ApiErrorResponse, ChatMessage, PersistedChatSession } from "@/types/chat";
import type {
  ChatbaseGetConversationResponse,
  ChatbaseListResponse,
  ChatbaseMessage,
  ChatbaseStreamEvent,
  ChatbaseStreamFinishEvent,
} from "@/types/chatbase";

const SESSION_STORAGE_KEY = "asi-gabon-chat-session";

function createLocalId(prefix: string) {
  return `${prefix}-${globalThis.crypto?.randomUUID?.() ?? Date.now().toString(36)}`;
}

function createAnonymousUserId() {
  const rawId =
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

  const normalized = rawId.replace(/[^a-zA-Z0-9._-]/g, "");
  return `anon-${normalized}`.slice(0, 128);
}

function createLocalMessage(
  role: ChatMessage["role"],
  text: string,
  status: ChatMessage["status"] = "complete",
): ChatMessage {
  return {
    id: createLocalId(role),
    serverId: null,
    role,
    text,
    createdAt: Date.now(),
    status,
    feedback: null,
    errorCode: null,
  };
}

function readPersistedSession(): PersistedChatSession {
  if (typeof window === "undefined") {
    return { conversationId: null, userId: null };
  }

  try {
    const rawValue = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!rawValue) {
      return { conversationId: null, userId: null };
    }

    const parsed = JSON.parse(rawValue) as PersistedChatSession;
    return {
      conversationId: parsed.conversationId ?? null,
      userId: parsed.userId ?? null,
    };
  } catch {
    return { conversationId: null, userId: null };
  }
}

function writePersistedSession(session: PersistedChatSession) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

async function readApiError(response: Response) {
  try {
    const data = (await response.json()) as ApiErrorResponse;
    return data.error;
  } catch {
    return {
      code: `HTTP_${response.status}`,
      message: "Une erreur réseau est survenue.",
      retryAfter: null,
    };
  }
}

function dedupeMessages(messages: ChatMessage[]) {
  const seen = new Set<string>();
  const result: ChatMessage[] = [];

  for (const message of messages) {
    const dedupeKey = message.serverId ?? message.id;
    if (seen.has(dedupeKey)) {
      continue;
    }

    seen.add(dedupeKey);
    result.push(message);
  }

  return result;
}

async function consumeStream(
  response: Response,
  onEvent: (event: ChatbaseStreamEvent) => void,
) {
  const reader = response.body?.getReader();
  if (!reader) {
    throw {
      code: "CHAT_STREAMING_ERROR",
      message: "Le flux de réponse est indisponible.",
      retryAfter: null,
    };
  }

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        continue;
      }

      const event = JSON.parse(trimmed) as ChatbaseStreamEvent;
      onEvent(event);
    }
  }

  const trailing = buffer.trim();
  if (trailing) {
    onEvent(JSON.parse(trailing) as ChatbaseStreamEvent);
  }
}

export function useChatSession(options?: { providedUserId?: string | null }) {
  const providedUserId = options?.providedUserId ?? null;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(providedUserId);
  const [error, setError] = useState<ApiErrorResponse["error"] | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isRecovering, setIsRecovering] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [initialConversationId, setInitialConversationId] = useState<
    string | null | undefined
  >(undefined);
  const [pendingFeedbackMessageIds, setPendingFeedbackMessageIds] = useState<
    string[]
  >([]);

  useEffect(() => {
    const persisted = readPersistedSession();
    const nextUserId =
      providedUserId ?? persisted.userId ?? createAnonymousUserId();

    setConversationId(persisted.conversationId);
    setUserId(nextUserId);
    setInitialConversationId(persisted.conversationId);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    writePersistedSession({
      conversationId,
      userId: providedUserId ?? userId ?? null,
    });
  }, [conversationId, isHydrated, providedUserId, userId]);

  useEffect(() => {
    if (!providedUserId) {
      return;
    }

    setUserId(providedUserId);
  }, [providedUserId]);

  useEffect(() => {
    if (!isHydrated || initialConversationId === undefined) {
      return;
    }

    if (!initialConversationId) {
      setIsRecovering(false);
      return;
    }

    let isCancelled = false;

    const recoverConversation = async () => {
      try {
        const conversationResponse = await fetch(
          `/api/conversations/${initialConversationId}`,
          { cache: "no-store" },
        );

        if (!conversationResponse.ok) {
          throw await readApiError(conversationResponse);
        }

        const conversation =
          (await conversationResponse.json()) as ChatbaseGetConversationResponse;
        const history: ChatbaseMessage[] = [...conversation.data.messages];
        let cursor = conversation.pagination.cursor;

        while (cursor) {
          const pageResponse = await fetch(
            `/api/conversations/${initialConversationId}/messages?cursor=${encodeURIComponent(
              cursor,
            )}&limit=100`,
            { cache: "no-store" },
          );

          if (!pageResponse.ok) {
            throw await readApiError(pageResponse);
          }

          const page =
            (await pageResponse.json()) as ChatbaseListResponse<ChatbaseMessage>;
          history.unshift(...page.data);
          cursor = page.pagination.cursor;

          if (!page.pagination.hasMore) {
            break;
          }
        }

        if (isCancelled) {
          return;
        }

        setConversationId(conversation.data.id);
        if (conversation.data.userId) {
          setUserId(conversation.data.userId);
        }

        setMessages(
          dedupeMessages(
            history
              .map((message) => toChatMessage(message))
              .filter((message): message is ChatMessage => Boolean(message)),
          ),
        );
      } catch (caughtError) {
        const apiError = caughtError as ApiErrorResponse["error"];
        if (isCancelled) {
          return;
        }

        setConversationId(null);
        setMessages([]);
        setError(apiError);
      } finally {
        if (!isCancelled) {
          setIsRecovering(false);
        }
      }
    };

    void recoverConversation();

    return () => {
      isCancelled = true;
    };
  }, [initialConversationId, isHydrated]);

  async function streamIntoMessage(
    path: "/api/chat" | "/api/chat/retry",
    payload: Record<string, unknown>,
    messageId: string,
  ) {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw await readApiError(response);
    }

    let currentMessageId = messageId;
    let finishEvent: ChatbaseStreamFinishEvent | null = null;

    await consumeStream(response, (event) => {
      if (event.type === "start") {
        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === currentMessageId
              ? {
                  ...message,
                  serverId: event.messageId,
                }
              : message,
          ),
        );
        return;
      }

      if (event.type === "text-delta") {
        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === currentMessageId
              ? {
                  ...message,
                  text: `${message.text}${event.delta}`,
                }
              : message,
          ),
        );
        return;
      }

      if (event.type === "finish") {
        finishEvent = event;
        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === currentMessageId
              ? {
                  ...message,
                  status: "complete",
                }
              : message,
          ),
        );
        return;
      }

      throw event.error;
    });

    const completedEvent = finishEvent as ChatbaseStreamFinishEvent | null;

    if (!completedEvent) {
      throw {
        code: "CHAT_STREAMING_ERROR",
        message: "La réponse du chatbot a été interrompue.",
        retryAfter: null,
      };
    }

    setConversationId(completedEvent.metadata.conversationId);
    if (completedEvent.metadata.userId) {
      setUserId(completedEvent.metadata.userId);
    }
  }

  function markMessageError(
    messageId: string,
    apiError: ApiErrorResponse["error"],
  ) {
    setError(apiError);
    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === messageId
          ? {
              ...message,
              errorCode: apiError.code,
              status: "error",
              text: message.text || apiError.message,
            }
          : message,
      ),
    );
  }

  async function sendMessage(rawMessage: string) {
    const message = rawMessage.trim();
    if (!message || isSending) {
      return;
    }

    setError(null);
    setIsSending(true);

    const userMessage = createLocalMessage("user", message);
    const assistantMessage = createLocalMessage("assistant", "", "streaming");

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      assistantMessage,
    ]);

    try {
      await streamIntoMessage(
        "/api/chat",
        {
          message,
          conversationId,
          userId: providedUserId ?? userId,
        },
        assistantMessage.id,
      );
    } catch (caughtError) {
      const apiError = caughtError as ApiErrorResponse["error"];

      if (apiError.code === "CHAT_CONVERSATION_NOT_ONGOING" && conversationId) {
        setConversationId(null);

        try {
          await streamIntoMessage(
            "/api/chat",
            {
              message,
              userId: providedUserId ?? userId,
            },
            assistantMessage.id,
          );
        } catch (retryError) {
          markMessageError(
            assistantMessage.id,
            retryError as ApiErrorResponse["error"],
          );
        }
      } else {
        markMessageError(assistantMessage.id, apiError);
      }
    } finally {
      setIsSending(false);
    }
  }

  async function retryMessage(message: ChatMessage) {
    if (!conversationId || !message.serverId || isSending) {
      return;
    }

    setError(null);
    setIsSending(true);
    setMessages((currentMessages) =>
      currentMessages.map((currentMessage) =>
        currentMessage.id === message.id
          ? {
              ...currentMessage,
              text: "",
              status: "streaming",
              errorCode: null,
            }
          : currentMessage,
      ),
    );

    try {
      await streamIntoMessage(
        "/api/chat/retry",
        {
          conversationId,
          messageId: message.serverId,
        },
        message.id,
      );
    } catch (caughtError) {
      markMessageError(message.id, caughtError as ApiErrorResponse["error"]);
    } finally {
      setIsSending(false);
    }
  }

  async function setFeedback(
    message: ChatMessage,
    nextFeedback: "negative" | "positive",
  ) {
    if (!conversationId || !message.serverId) {
      return;
    }

    const desiredFeedback =
      message.feedback === nextFeedback ? null : nextFeedback;
    setPendingFeedbackMessageIds((currentIds) => [...currentIds, message.id]);
    setMessages((currentMessages) =>
      currentMessages.map((currentMessage) =>
        currentMessage.id === message.id
          ? {
              ...currentMessage,
              feedback: desiredFeedback,
            }
          : currentMessage,
      ),
    );

    try {
      const response = await fetch("/api/chat/feedback", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId,
          messageId: message.serverId,
          feedback: desiredFeedback,
        }),
      });

      if (!response.ok) {
        throw await readApiError(response);
      }
    } catch (caughtError) {
      setMessages((currentMessages) =>
        currentMessages.map((currentMessage) =>
          currentMessage.id === message.id
            ? {
                ...currentMessage,
                feedback: message.feedback,
              }
            : currentMessage,
        ),
      );
      setError(caughtError as ApiErrorResponse["error"]);
    } finally {
      setPendingFeedbackMessageIds((currentIds) =>
        currentIds.filter((id) => id !== message.id),
      );
    }
  }

  function dismissError() {
    setError(null);
  }

  return {
    conversationId,
    dismissError,
    error,
    isHydrated,
    isRecovering,
    isReady: isHydrated && !isRecovering,
    isSending,
    messages,
    pendingFeedbackMessageIds,
    retryMessage,
    sendMessage,
    setFeedback,
    userId: providedUserId ?? userId,
  };
}
