interface ChatComposerProps {
  disabled: boolean;
  draft: string;
  isSending: boolean;
  onDraftChange: (value: string) => void;
  onSubmit: () => void;
}

export function ChatComposer({
  disabled,
  draft,
  isSending,
  onDraftChange,
  onSubmit,
}: ChatComposerProps) {
  return (
    <div className="p-4 md:p-6 bg-surface-container-low border-t border-outline-variant/15">
      <div className="relative flex items-center">
        <input
          className="w-full bg-surface-container-lowest text-on-surface py-4 pl-6 pr-14 rounded-xl shadow-sm border-none focus:ring-2 focus:ring-primary/20 placeholder:text-outline/60 text-base disabled:cursor-not-allowed disabled:opacity-70"
          placeholder="Posez votre question sur une démarche administrative..."
          type="text"
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSubmit();
            }
          }}
          disabled={disabled}
        />
        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || !draft.trim()}
          className="absolute right-3 rounded-lg p-2 text-primary transition-colors active:scale-90 disabled:cursor-not-allowed disabled:text-outline hover:bg-primary/5"
          aria-label="Envoyer"
        >
          <span className="material-symbols-outlined text-2xl font-bold">
            {isSending ? "progress_activity" : "send"}
          </span>
        </button>
      </div>
      <p className="text-[11px] text-center text-outline mt-4 font-medium leading-tight px-4">
        {isSending
          ? "ASI Gabon rédige sa réponse en direct..."
          : "Les réponses sont fournies à titre d’orientation à partir de sources administratives officielles."}
      </p>
    </div>
  );
}
