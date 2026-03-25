import type { ChatMessage } from "@/types/chat";

interface ChatMessageProps {
  canRetry: boolean;
  isFeedbackPending: boolean;
  message: ChatMessage;
  onFeedback: (value: "negative" | "positive") => void;
  onRetry: () => void;
}

function formatTimestamp(timestamp: number) {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-2 w-2 animate-pulse rounded-full bg-primary/70 [animation-delay:-0.3s]" />
      <span className="h-2 w-2 animate-pulse rounded-full bg-primary/70 [animation-delay:-0.15s]" />
      <span className="h-2 w-2 animate-pulse rounded-full bg-primary/70" />
    </span>
  );
}

export function ChatMessageBubble({
  canRetry,
  isFeedbackPending,
  message,
  onFeedback,
  onRetry,
}: ChatMessageProps) {
  const isAssistant = message.role === "assistant";
  const hasActions = isAssistant && message.serverId && message.status === "complete";

  return (
    <div
      className={`flex flex-col max-w-[85%] ${
        isAssistant ? "items-start" : "items-end ml-auto"
      }`}
    >
      <div
        className={
          isAssistant
            ? "bg-surface-container-highest p-5 rounded-xl rounded-bl-sm text-on-surface leading-relaxed shadow-sm relative"
            : "bg-primary text-on-primary p-5 rounded-xl rounded-br-sm shadow-md"
        }
      >
        {isAssistant ? (
          <div className="absolute inset-0 bg-primary/2 rounded-xl pointer-events-none" />
        ) : null}
        <div className="relative whitespace-pre-wrap break-words leading-relaxed">
          {message.text ? message.text : null}
          {message.status === "streaming" && !message.text ? <TypingDots /> : null}
        </div>
      </div>
      {hasActions ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {canRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="flex items-center gap-2 rounded-lg border border-outline-variant/20 bg-surface-container-lowest px-3 py-1.5 text-xs font-medium text-primary transition-all hover:bg-secondary-container"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              Relancer
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => onFeedback("positive")}
            disabled={isFeedbackPending}
            aria-pressed={message.feedback === "positive"}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
              message.feedback === "positive"
                ? "border-secondary bg-secondary-container text-on-secondary-container"
                : "border-outline-variant/20 bg-surface-container-lowest text-primary hover:bg-secondary-container"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <span className="material-symbols-outlined text-sm">thumb_up</span>
          </button>
          <button
            type="button"
            onClick={() => onFeedback("negative")}
            disabled={isFeedbackPending}
            aria-pressed={message.feedback === "negative"}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
              message.feedback === "negative"
                ? "border-error bg-error-container text-on-error-container"
                : "border-outline-variant/20 bg-surface-container-lowest text-primary hover:bg-secondary-container"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <span className="material-symbols-outlined text-sm">thumb_down</span>
          </button>
        </div>
      ) : null}
      <span className="text-[10px] font-label text-outline mt-2 ml-1 mr-1 uppercase tracking-wider">
        {isAssistant ? "ASI GABON" : "VOUS"} •{" "}
        {message.status === "streaming"
          ? "EN DIRECT"
          : message.status === "error"
            ? "INTERRUPTU"
            : formatTimestamp(message.createdAt)}
      </span>
    </div>
  );
}
