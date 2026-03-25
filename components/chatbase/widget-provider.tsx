"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "@/types/chatbase-widget";

import { getOrCreateAnonymousChatbaseUserId } from "@/lib/chatbase-widget/user-id";
import type { ApiErrorResponse } from "@/types/chat";

type WidgetStatus = "disabled" | "error" | "identifying" | "loading" | "ready";

interface ChatbaseWidgetContextValue {
  anonymousUserId: string | null;
  error: string | null;
  hasIdentity: boolean;
  open: () => void;
  resetChat: () => void;
  status: WidgetStatus;
}

const ChatbaseWidgetContext = createContext<ChatbaseWidgetContextValue>({
  anonymousUserId: null,
  error: null,
  hasIdentity: false,
  open: () => undefined,
  resetChat: () => undefined,
  status: "disabled",
});

function ensureChatbaseStub() {
  if (
    typeof window.chatbase === "function" &&
    window.chatbase("getState") === "initialized"
  ) {
    return;
  }

  type QueuedChatbase = ((...args: unknown[]) => void) & { q: unknown[][] };

  const queued: QueuedChatbase = ((...args: unknown[]) => {
    if (!queued.q) {
      queued.q = [];
    }
    queued.q.push(args);
  }) as QueuedChatbase;
  queued.q = [];

  window.chatbase = new Proxy(queued, {
    get(target, prop) {
      if (prop === "q") {
        return target.q;
      }

      return (...args: unknown[]) => target(prop as string, ...args);
    },
  });
}

function ensureChatbaseScript(agentId: string) {
  if (document.getElementById(agentId)) {
    return;
  }

  const script = document.createElement("script");
  script.src = "https://www.chatbase.co/embed.min.js";
  script.id = agentId;
  script.setAttribute("domain", "www.chatbase.co");
  document.body.appendChild(script);
}

export function ChatbaseWidgetProvider({
  agentId,
  children,
}: Readonly<{
  agentId: string | null;
  children: React.ReactNode;
}>) {
  const [anonymousUserId, setAnonymousUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasIdentity, setHasIdentity] = useState(false);
  const [status, setStatus] = useState<WidgetStatus>(
    agentId ? "loading" : "disabled",
  );
  const identityRequestedRef = useRef(false);

  useEffect(() => {
    if (!agentId) {
      setStatus("disabled");
      setError(
        "Le widget Chatbase n'est pas configuré. Ajoutez CHATBASE_AGENT_ID côté serveur.",
      );
      return;
    }

    const userId = getOrCreateAnonymousChatbaseUserId();
    setAnonymousUserId(userId);
    ensureChatbaseStub();
    ensureChatbaseScript(agentId);

    let attempts = 0;
    const interval = window.setInterval(() => {
      attempts += 1;
      const widgetState =
        typeof window.chatbase === "function"
          ? String(window.chatbase("getState"))
          : "";

      if (widgetState === "initialized") {
        setStatus((currentStatus) =>
          currentStatus === "identifying" ? currentStatus : "ready",
        );
        window.clearInterval(interval);
        return;
      }

      if (attempts >= 60) {
        setStatus("error");
        setError(
          "Le widget Chatbase ne s'est pas chargé correctement. Réessayez après avoir rechargé la page.",
        );
        window.clearInterval(interval);
      }
    }, 500);

    return () => {
      window.clearInterval(interval);
    };
  }, [agentId]);

  useEffect(() => {
    if (!agentId || !anonymousUserId || identityRequestedRef.current) {
      return;
    }

    identityRequestedRef.current = true;
    setStatus("identifying");

    const identifyUser = async () => {
      try {
        const response = await fetch("/api/chatbase/identity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: anonymousUserId }),
        });

        if (!response.ok) {
          const data = (await response.json()) as ApiErrorResponse;
          throw new Error(data.error.message);
        }

        const data = (await response.json()) as { token: string };
        window.chatbase?.identify?.({
          token: data.token,
          auth_mode: "anonymous_persistent",
          current_page: window.location.pathname,
        });
        setHasIdentity(true);
        setError(null);
      } catch (caughtError) {
        setHasIdentity(false);
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "L'identification sécurisée du widget Chatbase a échoué.",
        );
      } finally {
        setStatus((currentStatus) =>
          currentStatus === "error" || currentStatus === "disabled"
            ? currentStatus
            : "ready",
        );
      }
    };

    void identifyUser();
  }, [agentId, anonymousUserId]);

  const value = useMemo<ChatbaseWidgetContextValue>(
    () => ({
      anonymousUserId,
      error,
      hasIdentity,
      open: () => {
        window.chatbase?.open?.();
      },
      resetChat: () => {
        window.chatbase?.resetChat?.();
      },
      status,
    }),
    [anonymousUserId, error, hasIdentity, status],
  );

  return (
    <ChatbaseWidgetContext.Provider value={value}>
      {children}
    </ChatbaseWidgetContext.Provider>
  );
}

export function useChatbaseWidget() {
  return useContext(ChatbaseWidgetContext);
}
