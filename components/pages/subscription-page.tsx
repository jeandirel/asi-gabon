import Link from "next/link";

import { FirebaseAuthStatus } from "@/components/auth/firebase-auth-status";
import { SubscriptionAuthPanel } from "@/components/billing/subscription-auth-panel";

const SUBSCRIPTION_HIGHLIGHTS = [
  {
    icon: "credit_card",
    title: "Paiement securise",
    text: "La souscription est geree par Stripe sur une page de paiement hebergee et securisee.",
  },
  {
    icon: "mail",
    title: "Confirmation immediate",
    text: "Une confirmation de paiement et les informations de facturation sont envoyees par email.",
  },
  {
    icon: "bolt",
    title: "Lancement rapide",
    text: "Aucun parcours complexe a remplir dans l'application pour souscrire aujourd'hui.",
  },
];

export function SubscriptionPage() {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-secondary-container">
      <header className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between border-b border-outline-variant/15 bg-surface/85 px-6 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">
            account_balance
          </span>
          <span className="text-xl font-bold tracking-tight text-on-surface">
            ASI Gabon
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            className="rounded-lg px-3 py-1 font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
            href="/assistant"
          >
            Assistant
          </Link>
          <Link
            className="rounded-lg px-3 py-1 font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
            href="/services"
          >
            Services
          </Link>
          <Link
            className="font-semibold text-primary"
            href="/abonnement"
          >
            Abonnement
          </Link>
          <Link
            className="rounded-lg px-3 py-1 font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
            href="/support"
          >
            Support
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <FirebaseAuthStatus />
          <Link
            className="font-semibold text-primary active:scale-95 duration-200"
            href="/"
          >
            Accueil
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-28 pt-24">
        <section className="mb-12 overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-primary-container p-8 text-on-primary shadow-[0_24px_60px_rgba(22,92,169,0.16)] md:p-12">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-secondary-container px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-on-secondary-container">
              Abonnement
            </span>
            <h1 className="mt-6 font-['Manrope'] text-4xl font-extrabold tracking-tight md:text-6xl">
              Activez l'offre ASI Gabon avec un paiement Stripe simple et securise.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-on-primary/90">
              Cette page centralise la souscription. Le paiement est heberge par
              Stripe. Vous n'avez pas besoin de compte applicatif pour commencer.
            </p>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-elevated">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6f86]">
                  Offre de souscription
                </p>
                <h2 className="mt-2 font-['Manrope'] text-3xl font-bold tracking-tight">
                  Abonnement ASI Gabon
                </h2>
              </div>
              <span className="inline-flex w-fit items-center rounded-full border border-primary/15 bg-primary-container/20 px-4 py-2 text-sm font-semibold text-primary">
                <span className="material-symbols-outlined mr-2 text-[18px]">
                  verified
                </span>
                Checkout Stripe
              </span>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {SUBSCRIPTION_HIGHLIGHTS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-outline-variant/10 bg-surface-container-low p-5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-container/25 text-primary">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <h3 className="mt-4 font-semibold text-on-surface">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-low p-6">
              <h3 className="font-['Manrope'] text-2xl font-bold tracking-tight">
                Comment cela se passe
              </h3>
              <div className="mt-5 space-y-4 text-sm leading-7 text-on-surface-variant">
                <p>
                  1. Vous cliquez sur le bouton de souscription.
                </p>
                <p>
                  2. Stripe ouvre une page de paiement securisee sur le lien fourni.
                </p>
                <p>
                  3. Une confirmation vous est envoyee apres le paiement.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-outline-variant/10 bg-[#eef3fb] p-8 shadow-[0_18px_44px_rgba(25,28,29,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6f86]">
              Action
            </p>
            <h2 className="mt-2 font-['Manrope'] text-3xl font-bold tracking-tight text-on-surface">
              Souscrire maintenant
            </h2>
            <p className="mt-4 text-sm leading-7 text-on-surface-variant">
              Connectez-vous d'abord, puis continuez vers Stripe avec votre compte.
            </p>

            <SubscriptionAuthPanel />

            <div className="mt-8 rounded-[1.5rem] border border-white/70 bg-white/70 p-5 text-sm leading-6 text-on-surface-variant">
              Besoin d'aide avant de souscrire ?
              <Link className="ml-1 font-semibold text-primary" href="/support">
                Contacter le support
              </Link>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
