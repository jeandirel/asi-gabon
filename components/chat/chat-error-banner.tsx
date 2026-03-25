interface ChatErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export function ChatErrorBanner({
  message,
  onDismiss,
}: ChatErrorBannerProps) {
  return (
    <div className="rounded-xl bg-error-container px-4 py-3 text-sm text-on-error-container shadow-sm">
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined text-base">error</span>
        <p className="flex-1 leading-relaxed">{message}</p>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-md p-1 text-on-error-container/80 transition-colors hover:bg-white/20"
          aria-label="Fermer l'alerte"
        >
          <span className="material-symbols-outlined text-base">close</span>
        </button>
      </div>
    </div>
  );
}
