import Link from "next/link";

import { FirebaseAuthStatus } from "@/components/auth/firebase-auth-status";

export function SupportPage() {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface/85 backdrop-blur-xl border-b border-outline-variant/15 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">
            account_balance
          </span>
          <span className="font-['Manrope'] font-bold tracking-tight text-on-surface text-xl">
            ASI Gabon
          </span>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link className="text-on-surface-variant hover:bg-surface-container-high px-3 py-1 rounded-lg transition-colors font-medium" href="/assistant">
            Assistant
          </Link>
          <Link className="text-on-surface-variant hover:bg-surface-container-high px-3 py-1 rounded-lg transition-colors font-medium" href="/services">
            Services
          </Link>
          <Link className="text-on-surface-variant hover:bg-surface-container-high px-3 py-1 rounded-lg transition-colors font-medium" href="/abonnement">
            Abonnement
          </Link>
          <Link className="text-on-surface-variant hover:bg-surface-container-high px-3 py-1 rounded-lg transition-colors font-medium" href="/a-propos">
            À propos
          </Link>
          <Link className="text-primary font-semibold px-3 py-1 rounded-lg" href="/support">
            Support
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <FirebaseAuthStatus />
          <Link className="text-primary font-bold text-sm uppercase tracking-widest active:scale-95 duration-200" href="/">
            Accueil
          </Link>
        </div>
      </header>
      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
        <section className="mb-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-container p-12 md:p-20">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <img
                alt="pattern"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKTgHT4u7kRqZLWvmE6IFK08Wpqx-V7tECJFud4P8DaD1JSmIRWVt22Y0DzuXzutzHvBufWZjyVHHaSwcmnB0_Cl1p-Xehxea4-mFXi-WRd19LW3WkGMN-e07RoQ-zaKBk5qkZpqkTCU0SylmpHvmSuNXgA1cwCtHUqjIhn8iKxn1lcOdMGTREJj7n_710Z6HaazxrUhuSwEc1zTuUtC69lHSjqzdoND6R4SMU_v7YYrgyxysG_yqixUVotbOG1uhTepkFwMwJ25k"
              />
            </div>
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-secondary-container text-on-secondary-container font-label text-[10px] font-bold tracking-[0.1em] uppercase">
                Centre d&apos;Assistance
              </span>
              <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-on-primary tracking-tight mb-6">
                Comment pouvons-nous vous aider ?
              </h1>
              <p className="text-on-primary/80 text-lg md:text-xl leading-relaxed font-body">
                ASI Gabon s&apos;engage à fournir un accompagnement transparent et
                efficace pour toutes vos démarches administratives numériques.
              </p>
            </div>
          </div>
        </section>
        <div className="asymmetric-grid items-start">
          <div className="space-y-12">
            <div>
              <h2 className="font-headline text-3xl font-bold mb-8 text-on-surface">
                Questions Fréquentes
              </h2>
              <div className="space-y-4">
                {[
                  ["Comment réinitialiser mon accès ?", "Pour réinitialiser votre accès, utilisez le portail e-Gabon muni de votre identifiant unique national. Suivez les étapes de vérification par SMS ou Email sécurisé."],
                  ["Quels sont les délais de traitement ?", "Les délais standards varient entre 48h et 72h ouvrables selon la complexité du service sollicité. Vous recevrez une notification à chaque étape."],
                  ["Mes données sont-elles sécurisées ?", "ASI Gabon utilise un cryptage de niveau souverain pour garantir l'intégrité et la confidentialité de toutes les données citoyennes gabonaises."],
                ].map(([title, text], index) => (
                  <details
                    key={title}
                    className="group bg-surface-container-low rounded-xl overflow-hidden"
                    open={index === 0}
                  >
                    <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                      <span className="font-semibold text-on-surface">{title}</span>
                      <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                        expand_more
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-on-surface-variant text-sm leading-relaxed">
                      {text}
                    </div>
                  </details>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-headline text-xl font-bold mb-6 text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">link</span>
                Portails Officiels
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="p-4 bg-surface-container-lowest border border-outline-variant/15 rounded-xl flex items-center gap-4 hover:bg-surface-container-high transition-all text-left" type="button">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">gavel</span>
                  </div>
                  <span className="text-sm font-medium">Portail de Justice</span>
                </button>
                <button className="p-4 bg-surface-container-lowest border border-outline-variant/15 rounded-xl flex items-center gap-4 hover:bg-surface-container-high transition-all text-left" type="button">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-xl">account_balance_wallet</span>
                  </div>
                  <span className="text-sm font-medium">Trésor Public</span>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-8 md:p-12 rounded-[2rem] shadow-sm border border-outline-variant/10">
            <div className="mb-10">
              <h2 className="font-headline text-3xl font-bold mb-3 text-on-surface">
                Nous Contacter
              </h2>
              <p className="text-on-surface-variant">
                Nos agents vous répondent sous 24h ouvrées.
              </p>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-label text-[10px] font-bold tracking-widest text-outline uppercase ml-1">
                    Nom Complet
                  </label>
                  <input className="w-full bg-surface-container-high/50 border border-outline-variant/20 rounded-xl p-4 outline-none text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all shadow-inner" placeholder="Jean-Pierre..." type="text" />
                </div>
                <div className="space-y-2">
                  <label className="block font-label text-[10px] font-bold tracking-widest text-outline uppercase ml-1">
                    Adresse Email
                  </label>
                  <input className="w-full bg-surface-container-high/50 border border-outline-variant/20 rounded-xl p-4 outline-none text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all shadow-inner" placeholder="contact@domaine.ga" type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-label text-[10px] font-bold tracking-widest text-outline uppercase ml-1">
                  Votre Message
                </label>
                <textarea className="w-full bg-surface-container-high/50 border border-outline-variant/20 rounded-xl p-4 outline-none text-on-surface resize-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all shadow-inner" placeholder="Comment pouvons-nous vous accompagner ?" rows={5} />
              </div>
              <div className="flex items-center gap-4 p-4 bg-secondary-container/20 rounded-xl">
                <span className="material-symbols-outlined text-secondary">verified_user</span>
                <p className="text-xs text-on-secondary-container leading-tight">
                  En envoyant ce message, vous acceptez notre politique de
                  confidentialité des données institutionnelles.
                </p>
              </div>
              <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2" type="button">
                Envoyer ma demande
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
            <div className="mt-12 pt-12 border-t border-outline-variant/10 flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-tertiary-container/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary text-xl">call</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Téléphone</p>
                  <p className="font-bold">+33664483732</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-xl">mail</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Email Direct</p>
                  <p className="font-bold">jeandirel@ogooueia.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="mt-32">
          <div className="relative h-64 rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img
              alt="Map"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOPYfi5cL_N0rkMTsdXPqDmYz46YC7cmrQX0G8JIWf3o-7CZ7fPaSUkWa5Td9NvCqbBY_-AaZQ0hSm97Reg0oFY1PjWG2_rc2-rTpuY2T4xR1_70838l3Dr-z8BDo-2I1kvb8mOFrNUi4qzlVoJVfPgnM0oGUHisLtd99oPWfBzPLY_aaa9pMjG3xDMGoNgPkDpDva5YcEOTXlXnqZxcy3fELqAO9yzrEc-Kr_SMjsu2Fcv6SqEN5jlLh-0H_CsA1pBBtXl8Hi1eE"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 bg-surface/90 glass-effect p-6 rounded-2xl">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-1">
                Siège Social
              </p>
              <h3 className="font-headline font-bold text-xl">Libreville, Gabon</h3>
              <p className="text-sm text-on-surface-variant">
                Boulevard de l&apos;Indépendance, BP 1234
              </p>
            </div>
          </div>
        </section>
      </main>
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-surface/85 backdrop-blur-xl border-t border-outline-variant/15 shadow-[0_-20px_40px_rgba(0,0,0,0.04)] rounded-t-[2rem]">
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-all active:scale-90 duration-150" href="/assistant">
          <span className="material-symbols-outlined mb-1">smart_toy</span>
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-wider">Assistant</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-all active:scale-90 duration-150" href="/services">
          <span className="material-symbols-outlined mb-1">grid_view</span>
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-wider">Services</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-all active:scale-90 duration-150" href="/a-propos">
          <span className="material-symbols-outlined mb-1">info</span>
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-wider">À propos</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-primary bg-primary-container/10 rounded-xl px-4 py-1 active:scale-90 duration-150" href="/support">
          <span className="material-symbols-outlined mb-1">contact_support</span>
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-wider">Support</span>
        </Link>
      </nav>
    </div>
  );
}
