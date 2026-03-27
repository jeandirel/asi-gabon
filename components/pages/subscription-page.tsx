"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { FirebaseAuthStatus } from "@/components/auth/firebase-auth-status";
import { SubscriptionAuthPanel } from "@/components/billing/subscription-auth-panel";
import {
  DEFAULT_STRIPE_BILLING_PLAN,
  STRIPE_BILLING_PLANS,
} from "@/lib/billing/config";

const SUBSCRIPTION_HIGHLIGHTS = [
  {
    icon: "schedule",
    title: "14 jours offerts",
    text: "Demarrez avec deux semaines d'essai gratuit pour decouvrir l'offre ASI Gabon sans engagement immediat.",
  },
  {
    icon: "credit_card",
    title: "Paiement securise",
    text: "La souscription est geree par Stripe sur une page de paiement hebergee et securisee.",
  },
  {
    icon: "event_available",
    title: "Annulable avant facturation",
    text: "Vous pouvez interrompre l'abonnement avant la fin de l'essai pour ne pas poursuivre sur la periode payante.",
  },
];

export function SubscriptionPage() {
  const [selectedPlanId, setSelectedPlanId] = useState(
    DEFAULT_STRIPE_BILLING_PLAN?.id ?? "",
  );

  const selectedPlan = useMemo(
    () =>
      STRIPE_BILLING_PLANS.find((plan) => plan.id === selectedPlanId) ??
      DEFAULT_STRIPE_BILLING_PLAN,
    [selectedPlanId],
  );

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
              Essai gratuit
            </span>
            <h1 className="mt-6 font-['Manrope'] text-4xl font-extrabold tracking-tight md:text-6xl">
              Demarrez ASI Gabon avec 14 jours d'essai gratuit.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-on-primary/90">
              Cette page centralise la souscription. Le parcours passe par Stripe,
              avec un essai gratuit de deux semaines avant la periode payante.
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
                  Offre ASI Gabon avec essai 14 jours
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

            {STRIPE_BILLING_PLANS.length > 0 ? (
              <div className="mt-8">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-['Manrope'] text-2xl font-bold tracking-tight">
                    Choisissez votre formule
                  </h3>
                  <span className="rounded-full bg-secondary-container px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-on-secondary-container">
                    14 jours d'essai sur chaque offre
                  </span>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {STRIPE_BILLING_PLANS.map((plan) => {
                    const isSelected = selectedPlan?.id === plan.id;

                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`rounded-[1.75rem] border p-6 text-left transition-all ${
                          isSelected
                            ? "border-primary bg-[#eef5ff] shadow-[0_14px_34px_rgba(22,92,169,0.12)]"
                            : "border-outline-variant/10 bg-surface-container-low hover:border-primary/20"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-on-surface">
                              {plan.title}
                            </p>
                            <p className="mt-3 font-['Manrope'] text-3xl font-bold tracking-tight text-on-surface">
                              {plan.price}
                            </p>
                            <p className="mt-1 text-sm text-on-surface-variant">
                              {plan.cadence}
                            </p>
                          </div>
                          {plan.featured ? (
                            <span className="rounded-full bg-[#FCD116] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1f2324]">
                              Recommande
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-4 text-sm leading-6 text-on-surface-variant">
                          {plan.description}
                        </p>
                        <div className="mt-5 inline-flex items-center text-sm font-semibold text-primary">
                          {isSelected ? "Formule selectionnee" : "Choisir cette formule"}
                          <span className="material-symbols-outlined ml-2 text-[18px]">
                            {isSelected ? "check_circle" : "arrow_forward"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="mt-8 rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-low p-6">
              <h3 className="font-['Manrope'] text-2xl font-bold tracking-tight">
                Comment cela se passe
              </h3>
              <div className="mt-5 space-y-4 text-sm leading-7 text-on-surface-variant">
                <p>
                  1. Vous vous connectez puis vous lancez l'inscription.
                </p>
                <p>
                  2. Stripe ouvre une page securisee avec votre essai gratuit de 14 jours.
                </p>
                <p>
                  3. Vous recevez une confirmation immediate par email.
                </p>
                <p>
                  4. Vous pouvez resilier avant la fin de l'essai si vous ne souhaitez pas continuer.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-outline-variant/10 bg-[#eef3fb] p-8 shadow-[0_18px_44px_rgba(25,28,29,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6f86]">
              Action
            </p>
            <h2 className="mt-2 font-['Manrope'] text-3xl font-bold tracking-tight text-on-surface">
              Demarrer l'essai
            </h2>
            <p className="mt-4 text-sm leading-7 text-on-surface-variant">
              Connectez-vous d'abord, puis activez vos 14 jours d'essai gratuit sur Stripe.
            </p>

            {selectedPlan ? (
              <div className="mt-6 rounded-[1.5rem] border border-white/70 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6f86]">
                  Formule selectionnee
                </p>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-on-surface">{selectedPlan.title}</p>
                    <p className="mt-1 font-['Manrope'] text-2xl font-bold tracking-tight text-on-surface">
                      {selectedPlan.price}
                    </p>
                    <p className="text-sm text-on-surface-variant">
                      {selectedPlan.cadence}
                    </p>
                  </div>
                  <span className="rounded-full bg-primary-container/25 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                    14 jours offerts
                  </span>
                </div>
              </div>
            ) : null}

            <SubscriptionAuthPanel
              paymentLink={selectedPlan?.link ?? ""}
              planName={selectedPlan?.title}
            />

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
