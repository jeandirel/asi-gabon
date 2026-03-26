"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

import { FirebaseAuthStatus } from "@/components/auth/firebase-auth-status";
import { useChatbaseWidget } from "@/components/chatbase/widget-provider";

const SUGGESTIONS = [
  "Comment faire un passeport ?",
  "Carte d'identite",
  "Creer une entreprise",
  "CNAMGS",
  "Impots",
];

type WidgetStatus = "disabled" | "error" | "identifying" | "loading" | "ready";
type NoticeTone = "error" | "info" | "success";

interface Notice {
  message: string;
  tone: NoticeTone;
}

function getStatusLabel(status: WidgetStatus, hasIdentity: boolean) {
  switch (status) {
    case "disabled":
      return "Configuration requise";
    case "error":
      return "Incident de chargement";
    case "identifying":
      return "Verification securisee";
    case "loading":
      return "Chargement du guichet";
    case "ready":
      return hasIdentity ? "Session anonyme securisee" : "Assistant pret";
    default:
      return "Assistant";
  }
}

function getStatusClasses(status: WidgetStatus, hasIdentity: boolean) {
  if (status === "error" || status === "disabled") {
    return "border-[#d76f6f]/30 bg-[#fff1f1] text-[#8b2c2c]";
  }

  if (status === "identifying" || status === "loading") {
    return "border-[#c9d9f1] bg-[#edf4ff] text-[#165ca9]";
  }

  if (status === "ready" && hasIdentity) {
    return "border-[#c5dfd1] bg-[#eef9f1] text-[#1d6b47]";
  }

  return "border-[#d9dde5] bg-white text-[#5b6365]";
}

async function copyText(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  if (typeof document === "undefined") {
    throw new Error("Clipboard indisponible.");
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export function AssistantPage() {
  const searchParams = useSearchParams();
  const { anonymousUserId, error, hasIdentity, open, resetChat, status } =
    useChatbaseWidget();
  const [draft, setDraft] = useState("");
  const [notice, setNotice] = useState<Notice | null>(null);
  const query = searchParams.get("q")?.trim() ?? "";
  const shouldAutoLaunch = searchParams.get("launch") === "1";
  const hasAutoLaunchedRef = useRef(false);

  useEffect(() => {
    setDraft(query);
  }, [query]);

  useEffect(() => {
    if (!error) {
      return;
    }

    setNotice({
      message: error,
      tone: "error",
    });
  }, [error]);

  const canLaunch = status !== "disabled" && status !== "error";
  const statusLabel = useMemo(
    () => getStatusLabel(status, hasIdentity),
    [hasIdentity, status],
  );
  const statusClasses = useMemo(
    () => getStatusClasses(status, hasIdentity),
    [hasIdentity, status],
  );

  const preparePrompt = async (prompt: string) => {
    const nextPrompt = prompt.trim();
    if (!nextPrompt) {
      return;
    }

    try {
      await copyText(nextPrompt);
      setNotice({
        message:
          "Votre question a ete copiee. Ouvrez l'assistant officiel puis collez-la dans la conversation.",
        tone: "success",
      });
    } catch {
      setNotice({
        message:
          "Votre question reste visible sur cette page. Ouvrez l'assistant puis collez-la manuellement si besoin.",
        tone: "info",
      });
    }
  };

  const launchAssistant = async (prompt?: string) => {
    if (!canLaunch) {
      return;
    }

    await preparePrompt(prompt ?? draft);
    open();
  };

  const handleSuggestion = (prompt: string) => {
    setDraft(prompt);
    void launchAssistant(prompt);
  };

  const handleOpenAssistant = () => {
    void launchAssistant();
  };

  const handleNewConversation = () => {
    if (!canLaunch) {
      return;
    }

    resetChat();
    setNotice({
      message:
        "Une nouvelle conversation officielle a ete preparee. Le widget vient d'etre reinitialise.",
      tone: "success",
    });
    open();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void launchAssistant();
  };

  useEffect(() => {
    if (!shouldAutoLaunch || hasAutoLaunchedRef.current || status !== "ready") {
      return;
    }

    hasAutoLaunchedRef.current = true;
    void launchAssistant(query);
  }, [query, shouldAutoLaunch, status]);

  const noticeClasses =
    notice?.tone === "error"
      ? "border-[#d76f6f]/30 bg-[#fff1f1] text-[#8b2c2c]"
      : notice?.tone === "success"
        ? "border-[#c5dfd1] bg-[#eef9f1] text-[#1d6b47]"
        : "border-[#d9dde5] bg-white text-[#4d5759]";

  const sessionHint = anonymousUserId
    ? "Session anonyme persistante active sur cet appareil."
    : "Session locale en preparation.";

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-secondary-container">
      <header className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between bg-surface/85 px-6 backdrop-blur-xl border-b border-outline-variant/15 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-2xl text-primary">
            account_balance
          </span>
          <div className="leading-tight">
            <h1 className="font-['Manrope'] text-xl font-bold tracking-tight text-on-surface">
              ASI Gabon
            </h1>
            <p className="text-[11px] uppercase tracking-[0.18em] text-on-surface-variant font-bold">
              Assistant citoyen
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          <Link className="font-semibold text-primary" href="/assistant">
            Assistant
          </Link>
          <Link
            className="rounded-lg px-3 py-1 text-on-surface-variant transition-colors hover:bg-surface-container-high font-medium"
            href="/services"
          >
            Services
          </Link>
          <Link
            className="rounded-lg px-3 py-1 text-on-surface-variant transition-colors hover:bg-surface-container-high font-medium"
            href="/abonnement"
          >
            Abonnement
          </Link>
          <Link
            className="rounded-lg px-3 py-1 text-on-surface-variant transition-colors hover:bg-surface-container-high font-medium"
            href="/a-propos"
          >
            A propos
          </Link>
          <Link
            className="rounded-lg px-3 py-1 text-on-surface-variant transition-colors hover:bg-surface-container-high font-medium"
            href="/support"
          >
            Support
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <FirebaseAuthStatus />
          <Link className="font-semibold text-primary active:scale-95 duration-200" href="/">
            Accueil
          </Link>
        </div>
      </header>

      <main className="pb-24 pt-16">
        <section className="border-b border-[#dce1e6] bg-[linear-gradient(180deg,#f8fafb_0%,#eef3fb_100%)] px-6 py-8 md:py-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5f6f86]">
                  Assistant officiel
                </p>
                <h2 className="mt-2 font-['Manrope'] text-3xl font-extrabold tracking-tight text-[#191c1d] md:text-5xl">
                  Posez votre question administrative dans la fenetre officielle.
                </h2>
              </div>
              <div
                className={`inline-flex w-fit items-center rounded-full border px-4 py-2 text-sm font-semibold ${statusClasses}`}
              >
                <span className="material-symbols-outlined mr-2 text-[18px]">
                  shield
                </span>
                {statusLabel}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
              <div className="rounded-[2rem] bg-[linear-gradient(135deg,#165ca9_0%,#3a75c4_100%)] p-8 text-white shadow-[0_24px_60px_rgba(22,92,169,0.18)] md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/75">
                  Session guidee
                </p>
                <h3 className="mt-4 max-w-2xl font-['Manrope'] text-3xl font-bold tracking-tight md:text-4xl">
                  Ouvrez l'assistant pour obtenir une orientation claire sur vos demarches au Gabon.
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
                  La conversation se fait dans le widget officiel Chatbase. Cette page
                  prepare votre question et vous donne un point d'entree propre, sans
                  faux fil de discussion local.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleOpenAssistant}
                    disabled={!canLaunch}
                    className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-white px-6 text-base font-bold text-[#165ca9] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="material-symbols-outlined mr-2">smart_toy</span>
                    Ouvrir l'assistant
                  </button>
                  <button
                    type="button"
                    onClick={handleNewConversation}
                    disabled={!canLaunch}
                    className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="material-symbols-outlined mr-2">refresh</span>
                    Nouvelle conversation
                  </button>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/80">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2">
                    <span className="material-symbols-outlined text-[18px]">
                      verified_user
                    </span>
                    {sessionHint}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2">
                    <span className="material-symbols-outlined text-[18px]">
                      content_paste
                    </span>
                    Votre texte peut etre prepare ici avant ouverture.
                  </span>
                </div>
              </div>

              <div className="rounded-[2rem] border border-outline-variant/15 bg-surface-container-lowest p-6 shadow-elevated md:p-8 transition-shadow">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5f6f86]">
                  Bon usage
                </p>
                <div className="mt-5 space-y-5">
                  {[
                    {
                      icon: "edit_note",
                      title: "1. Preparez votre question",
                      text: "Redigez votre demande ci-dessous ou utilisez une suggestion frequente.",
                    },
                    {
                      icon: "open_in_new",
                      title: "2. Ouvrez la fenetre officielle",
                      text: "L'assistant s'ouvre ensuite dans le widget Chatbase deja configure pour votre agent.",
                    },
                    {
                      icon: "assignment_turned_in",
                      title: "3. Poursuivez l'echange",
                      text: "La session reste anonyme et persistante sur cet appareil pour retrouver votre contexte.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex gap-4 rounded-2xl bg-surface-container-low p-4 border border-outline-variant/5"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-container/20 text-primary">
                        <span className="material-symbols-outlined">
                          {item.icon}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#191c1d]">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm leading-6 text-[#5b6365]">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-8 md:py-10">
          <div className="mx-auto grid max-w-6xl gap-6 xl:grid-cols-[minmax(0,1.1fr)_380px]">
            <div className="rounded-[2rem] border border-outline-variant/15 bg-surface-container-lowest p-6 shadow-elevated md:p-8 transition-shadow">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5f6f86]">
                    Votre question
                  </p>
                  <h3 className="mt-2 font-['Manrope'] text-2xl font-bold tracking-tight text-[#191c1d]">
                    Preparez votre message avant d'ouvrir l'assistant.
                  </h3>
                </div>
                <p className="text-sm text-[#6b7274]">
                  Cette zone ne simule pas le chat. Elle sert uniquement a preparer
                  l'echange officiel.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6">
                <label className="sr-only" htmlFor="assistant-question">
                  Votre question administrative
                </label>
                <div className="rounded-[1.75rem] border border-outline-variant/20 bg-surface-container-high/50 p-3 shadow-inner focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-surface-container-lowest focus-within:border-primary/30 transition-all">
                  <textarea
                    id="assistant-question"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    rows={5}
                    placeholder="Exemple : Comment renouveler un passeport biometrique a Libreville ?"
                    className="min-h-[140px] w-full resize-none border-0 bg-transparent px-3 py-2 text-base leading-7 text-[#191c1d] outline-none placeholder:text-[#8a9395]"
                  />
                  <div className="mt-3 flex flex-col gap-3 border-t border-[#e6eaef] pt-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-[#6b7274]">
                      Si un texte est present, il sera copie avant l'ouverture du widget.
                    </p>
                    <button
                      type="submit"
                      disabled={!canLaunch}
                      className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#165ca9] px-5 text-sm font-semibold text-white transition hover:bg-[#114d8f] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <span className="material-symbols-outlined mr-2 text-[18px]">
                        open_in_new
                      </span>
                      Ouvrir avec ce texte
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <aside className="rounded-[2rem] border border-[#dce1e6] bg-[#eef3fb] p-6 shadow-[0_18px_44px_rgba(25,28,29,0.05)] md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5f6f86]">
                Demarches frequentes
              </p>
              <h3 className="mt-2 font-['Manrope'] text-2xl font-bold tracking-tight text-[#191c1d]">
                Lancez rapidement une question utile.
              </h3>
              <div className="mt-6 flex flex-wrap gap-3">
                {SUGGESTIONS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSuggestion(prompt)}
                    disabled={!canLaunch}
                    className="rounded-full border border-white bg-white px-4 py-2 text-sm font-medium text-[#1f2324] transition hover:border-[#bfd1ea] hover:bg-[#f7fbff] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {notice ? (
                <div className={`mt-6 rounded-[1.5rem] border p-4 text-sm leading-6 ${noticeClasses}`}>
                  {notice.message}
                </div>
              ) : (
                <div className="mt-6 rounded-[1.5rem] border border-[#d7dfeb] bg-white/70 p-4 text-sm leading-6 text-[#4d5759]">
                  L'assistant s'ouvre dans son interface officielle. Cette page a ete
                  simplifiee pour eviter toute confusion entre un faux chat local et
                  la vraie conversation.
                </div>
              )}
            </aside>
          </div>
        </section>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-surface/85 backdrop-blur-xl border-t border-outline-variant/15 shadow-[0_-20px_40px_rgba(0,0,0,0.04)] rounded-t-[2rem]">
        <Link
          className="flex flex-col items-center justify-center text-primary bg-primary-container/10 rounded-xl px-4 py-1"
          href="/assistant"
        >
          <span className="material-symbols-outlined mb-1">smart_toy</span>
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-wider">
            Assistant
          </span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-all"
          href="/services"
        >
          <span className="material-symbols-outlined mb-1">grid_view</span>
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-wider">
            Services
          </span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-all"
          href="/a-propos"
        >
          <span className="material-symbols-outlined mb-1">info</span>
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-wider">
            A propos
          </span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-all"
          href="/support"
        >
          <span className="material-symbols-outlined mb-1">contact_support</span>
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-wider">
            Support
          </span>
        </Link>
      </nav>

      <footer className="hidden border-t border-outline-variant/10 bg-surface-container-highest px-6 py-16 md:block">
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-12">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl text-primary">
                account_balance
              </span>
              <h1 className="font-headline text-xl font-bold">ASI Gabon</h1>
            </div>
            <p className="max-w-sm text-sm text-on-surface-variant">
              L'Assistant de Service Intelligent simplifie l'acces aux
              demarches administratives gabonaises grace a une experience claire
              et un assistant officiel identifiable.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="h-8 w-8 rounded-full bg-secondary" />
              <div className="h-8 w-8 rounded-full bg-tertiary-container" />
              <div className="h-8 w-8 rounded-full bg-primary" />
            </div>
          </div>
          <div className="space-y-4">
            <h6 className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Navigation
            </h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="transition-colors hover:text-primary" href="/">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-primary"
                  href="/services"
                >
                  Nos services
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-primary"
                  href="/assistant"
                >
                  Assistant
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-primary"
                  href="/support"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h6 className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Information
            </h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="transition-colors hover:text-primary"
                  href="/a-propos"
                >
                  Mentions legales
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-primary"
                  href="/a-propos"
                >
                  Confidentialite
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-primary"
                  href="/support"
                >
                  Accessibilite
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-7xl border-t border-outline-variant/10 pt-8 text-center text-xs text-on-surface-variant/60">
          © 2024 Republique Gabonaise - Tous droits reserves.
        </div>
      </footer>
    </div>
  );
}
