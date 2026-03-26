"use client";

import { useEffect, useRef, useState } from "react";

import { onAuthStateChanged, signOut, type User } from "firebase/auth";

import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase/client";

function getUserLabel(user: User) {
  if (user.displayName?.trim()) {
    return user.displayName.trim();
  }

  if (user.email?.trim()) {
    return user.email.trim();
  }

  return "Utilisateur connecte";
}

export function FirebaseAuthStatus() {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      return;
    }

    return onAuthStateChanged(getFirebaseAuth(), (nextUser) => {
      setUser(nextUser);
    });
  }, []);

  const handleSignOut = async () => {
    if (!isFirebaseConfigured()) {
      return;
    }

    try {
      setIsBusy(true);
      await signOut(getFirebaseAuth());
      detailsRef.current?.removeAttribute("open");
    } finally {
      setIsBusy(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <details ref={detailsRef} className="relative">
      <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-primary/15 bg-primary-container/20 text-primary shadow-sm transition hover:border-primary/30 hover:bg-primary-container/30">
        <span className="material-symbols-outlined text-[20px]">person</span>
      </summary>

      <div className="absolute right-0 top-full z-50 mt-3 w-72 rounded-3xl border border-outline-variant/15 bg-white p-4 shadow-[0_18px_44px_rgba(25,28,29,0.12)]">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-container/25 text-primary">
            <span className="material-symbols-outlined">person</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6f86]">
              Connecte
            </p>
            <p className="mt-1 truncate font-semibold text-on-surface">
              {getUserLabel(user)}
            </p>
            {user.email ? (
              <p className="truncate text-sm text-on-surface-variant">
                {user.email}
              </p>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={() => void handleSignOut()}
          disabled={isBusy}
          className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-[#FCD116] px-4 text-sm font-bold text-[#1f2324] transition hover:bg-[#f0c200] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="material-symbols-outlined mr-2 text-[18px]">
            logout
          </span>
          Se deconnecter
        </button>
      </div>
    </details>
  );
}
