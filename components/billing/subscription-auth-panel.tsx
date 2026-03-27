"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  type User,
} from "firebase/auth";

import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase/client";

type Mode = "signin" | "signup";

function getFriendlyAuthError(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    switch (error.code) {
      case "auth/account-exists-with-different-credential":
        return "Un compte existe deja avec une autre methode de connexion.";
      case "auth/email-already-in-use":
        return "Cette adresse email est deja utilisee.";
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Identifiants invalides. Verifiez votre email et votre mot de passe.";
      case "auth/invalid-email":
        return "Adresse email invalide.";
      case "auth/unauthorized-domain":
        return "Le domaine actuel n'est pas autorise dans Firebase Authentication.";
      case "auth/operation-not-allowed":
        return "Cette methode de connexion n'est pas encore activee dans Firebase.";
      case "auth/cancelled-popup-request":
        return "Une autre fenetre de connexion est deja en cours.";
      case "auth/popup-blocked":
      case "auth/popup-closed-by-user":
        return "Connexion interrompue. Reessayez.";
      case "auth/too-many-requests":
        return "Trop de tentatives. Reessayez un peu plus tard.";
      case "auth/weak-password":
        return "Le mot de passe doit contenir au moins 6 caracteres.";
      default:
        return "La connexion n'a pas pu etre finalisee.";
    }
  }

  return "La connexion n'a pas pu etre finalisee.";
}

function buildStripeLink(paymentLink: string, email: string | null | undefined) {
  if (!paymentLink) {
    return "";
  }

  if (!email) {
    return paymentLink;
  }

  const url = new URL(paymentLink);
  url.searchParams.set("prefilled_email", email);

  return url.toString();
}

function shouldUseRedirectFlow() {
  if (typeof window === "undefined") {
    return true;
  }

  const isStandalone =
    window.matchMedia?.("(display-mode: standalone)").matches ||
    ((window.navigator as Navigator & { standalone?: boolean }).standalone === true);

  const userAgent = window.navigator.userAgent.toLowerCase();
  const isMobile =
    /android|iphone|ipad|ipod|mobile/.test(userAgent) || window.innerWidth < 768;

  return isStandalone || isMobile;
}

export interface SubscriptionAuthPanelProps {
  paymentLink: string;
  planName?: string;
}

export function SubscriptionAuthPanel({
  paymentLink,
  planName = "cette formule",
}: SubscriptionAuthPanelProps) {
  const [mode, setMode] = useState<Mode>("signin");
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const isConfigured = isFirebaseConfigured();
  const hasPaymentLink = paymentLink.trim().length > 0;
  const checkoutLink = useMemo(
    () => buildStripeLink(paymentLink, user?.email),
    [paymentLink, user?.email],
  );

  useEffect(() => {
    if (!isConfigured) {
      setIsInitializing(false);
      return;
    }

    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setIsInitializing(false);
    });

    void getRedirectResult(auth).catch((redirectError) => {
      setError(getFriendlyAuthError(redirectError));
      setIsInitializing(false);
    });

    return unsubscribe;
  }, [isConfigured]);

  const handleProviderLogin = async () => {
    if (!isConfigured) {
      return;
    }

    try {
      setError(null);
      setInfo("Connexion Google en cours...");
      setIsBusy(true);

      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const auth = getFirebaseAuth();

      if (shouldUseRedirectFlow()) {
        setInfo("Redirection vers Google...");
        await signInWithRedirect(auth, provider);
        return;
      }

      await signInWithPopup(auth, provider);
      setInfo(`Connexion Google reussie. Vous pouvez maintenant demarrer votre essai gratuit sur ${planName}.`);
    } catch (providerError) {
      const authError =
        typeof providerError === "object" &&
        providerError !== null &&
        "code" in providerError &&
        typeof providerError.code === "string"
          ? providerError.code
          : "";

      if (authError === "auth/popup-blocked" || authError === "auth/popup-closed-by-user") {
        try {
          setInfo("Popup indisponible. Redirection vers Google...");
          await signInWithRedirect(getFirebaseAuth(), new GoogleAuthProvider());
          return;
        } catch (redirectError) {
          setError(getFriendlyAuthError(redirectError));
        }
      } else {
        setError(getFriendlyAuthError(providerError));
      }

      setInfo(null);
    } finally {
      setIsBusy(false);
    }
  };

  const handleEmailAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isConfigured) {
      return;
    }

    if (mode === "signup" && password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setError(null);
      setInfo(null);
      setIsBusy(true);

      const auth = getFirebaseAuth();

      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
        setInfo(`Compte cree. Vous pouvez maintenant demarrer votre essai gratuit sur ${planName}.`);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        setInfo(`Connexion reussie. Vous pouvez maintenant demarrer votre essai gratuit sur ${planName}.`);
      }
    } catch (authError) {
      setError(getFriendlyAuthError(authError));
      setInfo(null);
    } finally {
      setIsBusy(false);
    }
  };

  const handleSignOut = async () => {
    if (!isConfigured) {
      return;
    }

    try {
      setError(null);
      setInfo(null);
      setIsBusy(true);
      await signOut(getFirebaseAuth());
      setInfo("Vous avez ete deconnecte.");
    } catch (signOutError) {
      setError(getFriendlyAuthError(signOutError));
    } finally {
      setIsBusy(false);
    }
  };

  if (!isConfigured) {
    return (
      <div className="mt-8 rounded-2xl border border-[#d76f6f]/20 bg-[#fff1f1] p-4 text-sm leading-6 text-[#8b2c2c]">
        Firebase n'est pas encore configure. Ajoutez les variables web Firebase
        dans l'environnement pour activer la connexion avant abonnement.
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-5">
      <div className="rounded-[1.5rem] border border-white/70 bg-white p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-on-surface">
            {user ? "Compte connecte" : "Connexion requise avant paiement"}
          </p>
          {user ? (
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isBusy}
              className="text-sm font-semibold text-primary disabled:opacity-60"
            >
              Se deconnecter
            </button>
          ) : (
            <div className="inline-flex rounded-full bg-surface-container-high p-1 text-sm">
              <button
                type="button"
                onClick={() => setMode("signin")}
                className={`rounded-full px-3 py-1 font-semibold transition ${
                  mode === "signin" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant"
                }`}
              >
                Connexion
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`rounded-full px-3 py-1 font-semibold transition ${
                  mode === "signup" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant"
                }`}
              >
                Creer un compte
              </button>
            </div>
          )}
        </div>

        {user ? (
          <div className="mt-4 rounded-2xl border border-[#d9e3f4] bg-[#f6f9ff] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6f86]">
              Identite
            </p>
            <p className="mt-2 font-semibold text-on-surface">
              {user.displayName || "Utilisateur ASI Gabon"}
            </p>
            <p className="text-sm text-on-surface-variant">
              {user.email || "Adresse email non communiquee par ce fournisseur."}
            </p>
          </div>
        ) : (
          <>
            <div className="mt-5 grid gap-3">
              <button
                type="button"
                onClick={() => void handleProviderLogin()}
                disabled={isBusy || isInitializing}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-outline-variant/15 bg-white px-4 text-sm font-semibold text-on-surface shadow-sm transition hover:border-primary/20 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="material-symbols-outlined mr-2 text-[18px]">
                  login
                </span>
                Continuer avec Google
              </button>
            </div>

            <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-on-surface-variant">
              <span className="h-px flex-1 bg-outline-variant/20" />
              ou par email
              <span className="h-px flex-1 bg-outline-variant/20" />
            </div>

            <form className="mt-5 space-y-3" onSubmit={handleEmailAuth}>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-outline-variant/15 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary/30 focus:bg-white"
                placeholder="Adresse email"
                required
              />
              <input
                type="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-outline-variant/15 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary/30 focus:bg-white"
                placeholder="Mot de passe"
                required
                minLength={6}
              />
              {mode === "signup" ? (
                <input
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full rounded-2xl border border-outline-variant/15 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary/30 focus:bg-white"
                  placeholder="Confirmer le mot de passe"
                  required
                  minLength={6}
                />
              ) : null}

              <button
                type="submit"
                disabled={isBusy || isInitializing}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#FCD116] px-4 text-sm font-bold text-[#1f2324] transition hover:bg-[#f0c200] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {mode === "signup" ? "Creer mon compte" : "Se connecter"}
              </button>
            </form>
          </>
        )}

        {error ? (
          <div className="mt-4 rounded-2xl border border-[#d76f6f]/20 bg-[#fff1f1] p-4 text-sm leading-6 text-[#8b2c2c]">
            {error}
          </div>
        ) : null}

        {info ? (
          <div className="mt-4 rounded-2xl border border-[#d9e3f4] bg-[#f6f9ff] p-4 text-sm leading-6 text-[#165ca9]">
            {info}
          </div>
        ) : null}
      </div>

      {user && hasPaymentLink ? (
        <a
          href={checkoutLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-primary px-6 text-base font-bold text-on-primary shadow-subtle transition hover:shadow-elevated active:scale-[0.99]"
        >
          <span className="material-symbols-outlined mr-2">lock</span>
          Demarrer l'essai gratuit
        </a>
      ) : null}

      {!user ? (
        <p className="text-sm leading-6 text-on-surface-variant">
          Connectez-vous ou creez un compte pour poursuivre l'abonnement.
        </p>
      ) : null}

      {user && !hasPaymentLink ? (
        <div className="rounded-2xl border border-[#d76f6f]/20 bg-[#fff1f1] p-4 text-sm leading-6 text-[#8b2c2c]">
          Aucun paiement Stripe n'est configure pour le moment.
        </div>
      ) : null}
    </div>
  );
}
