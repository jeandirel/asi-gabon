import Link from "next/link";

import { FirebaseAuthStatus } from "@/components/auth/firebase-auth-status";

export function HomePage() {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-secondary-container">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface/85 backdrop-blur-xl border-b border-outline-variant/15 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl">
            account_balance
          </span>
          <h1 className="font-['Manrope'] font-bold tracking-tight text-on-surface text-xl">
            ASI Gabon
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-primary font-semibold transition-colors" href="/assistant">
            Assistant
          </Link>
          <Link
            className="text-on-surface-variant hover:bg-surface-container-high px-3 py-1 rounded-lg transition-colors"
            href="/services"
          >
            Services
          </Link>
          <Link
            className="text-on-surface-variant hover:bg-surface-container-high px-3 py-1 rounded-lg transition-colors"
            href="/abonnement"
          >
            Abonnement
          </Link>
          <Link
            className="text-on-surface-variant hover:bg-surface-container-high px-3 py-1 rounded-lg transition-colors"
            href="/a-propos"
          >
            À propos
          </Link>
          <Link
            className="text-on-surface-variant hover:bg-surface-container-high px-3 py-1 rounded-lg transition-colors"
            href="/support"
          >
            Support
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <FirebaseAuthStatus />
          <Link
            className="text-primary font-semibold active:scale-95 duration-200"
            href="/"
          >
            Accueil
          </Link>
        </div>
      </header>
      <main className="pt-16 pb-24">
        <section className="relative min-h-[707px] flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-primary to-primary-container text-on-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              alt=""
              className="w-full h-full object-cover grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZwl3zuGcsR3oypqNoIMMeHkmgW-VKuRPzJwPrnJmN7dsvKr-sMX2F4HXbB1HHJ95K5F9Hd2XFEC_oCw0R0DUCwhi7U_Jw2WqG8DPsTF6C6l4Wgp-t_S8dsjJs9qBL2nJ0nNjoYwtX4RAe6EQZx8f69XTTpf_3ofdwHeLHKfjFsydaOq0lFjM1YjWHHdRUivYiCejW2yHOLJ5Aif9sCj-TrPZstplcdPDEEWAd_ZvxxQ4uUiiXbINw2hhH0avxbd_46o81a8kAoek"
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-xs tracking-widest uppercase mb-4">
              Portail Officiel
            </span>
            <h2 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight">
              ASI Gabon
            </h2>
            <p className="font-body text-xl md:text-2xl text-on-primary/90 max-w-2xl mx-auto leading-relaxed">
              Votre assistant intelligent pour les démarches administratives
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link
                href="/assistant?launch=1"
                className="w-full sm:w-auto px-8 py-4 bg-secondary-container text-on-secondary-container font-bold rounded-xl shadow-subtle hover:shadow-elevated active:scale-95 transition-all duration-300"
              >
                Commencer
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-4 bg-surface/10 backdrop-blur-md text-on-primary border border-on-primary/20 font-bold rounded-xl hover:bg-surface/20 active:scale-95 transition-all duration-300"
              >
                Explorer les services
              </Link>
              <Link
                href="/abonnement"
                className="w-full sm:w-auto px-8 py-4 bg-white/12 backdrop-blur-md text-on-primary border border-white/20 font-bold rounded-xl hover:bg-white/18 active:scale-95 transition-all duration-300"
              >
                Voir l&apos;abonnement
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-2 flex">
            <div className="h-full w-1/3 bg-secondary" />
            <div className="h-full w-1/3 bg-tertiary-container" />
            <div className="h-full w-1/3 bg-primary" />
          </div>
        </section>
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="font-label text-tertiary font-bold tracking-[0.2em] mb-2 uppercase">
              Processus
            </p>
            <h3 className="font-headline text-3xl md:text-4xl font-medium text-on-surface">
              Comment ça marche
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: "chat_bubble",
                iconColor: "text-secondary-container",
                title: "Posez votre question",
                text: "Décrivez votre besoin en langage naturel. Notre IA comprend le contexte administratif gabonais.",
              },
              {
                icon: "lightbulb",
                iconColor: "text-tertiary-container",
                title: "Obtenez une réponse claire",
                text: "Recevez instantanément la liste des documents requis et les étapes précises à suivre.",
              },
              {
                icon: "verified_user",
                iconColor: "text-primary-container",
                title: "Accédez au bon service",
                text: "Soyez redirigé directement vers le guichet numérique ou physique approprié.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="space-y-6 p-8 bg-surface-container-lowest border border-outline-variant/10 shadow-subtle hover:shadow-elevated rounded-2xl relative overflow-hidden group transition-all duration-300"
              >
                <div
                  className={`${item.iconColor} absolute -top-8 -right-8 opacity-5 group-hover:opacity-15 group-hover:scale-105 transition-all duration-500`}
                >
                  <span className="material-symbols-outlined text-[120px]">
                    {item.icon}
                  </span>
                </div>
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-on-primary font-headline font-bold text-xl shadow-sm">
                  {index + 1}
                </div>
                <h4 className="font-headline text-2xl font-bold">{item.title}</h4>
                <p className="text-on-surface-variant leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="py-24 px-6 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <p className="font-label text-secondary font-bold tracking-[0.2em] mb-2 uppercase">
                  Solutions
                </p>
                <h3 className="font-headline text-3xl md:text-4xl font-medium text-on-surface">
                  Services Populaires
                </h3>
              </div>
              <Link
                className="text-primary font-bold flex items-center gap-2 hover:underline"
                href="/services"
              >
                Voir tous les services
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                ["Passeport", "Demande ou renouvellement de passeport biométrique.", "import_contacts", "bg-primary/10 text-primary", "passeport"],
                ["CNI", "Carte Nationale d'Identité Gabonaise.", "badge", "bg-secondary/10 text-secondary", "carte d'identité"],
                ["CNAMGS", "Couverture maladie et garantie sociale.", "health_and_safety", "bg-tertiary-container/10 text-tertiary", "CNAMGS"],
                ["Impôts", "Déclarations fiscales et paiements en ligne.", "payments", "bg-primary/10 text-primary", "impôts"],
                ["Entreprise", "Création et gestion de votre activité économique.", "business_center", "bg-secondary/10 text-secondary", "créer une entreprise"],
              ].map(([title, text, icon, colors, query]) => (
                <Link
                  key={title}
                  href={`/assistant?q=${encodeURIComponent(query)}`}
                  className="bg-surface-container-lowest p-6 rounded-2xl shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col gap-4 border border-outline-variant/15 hover:border-primary/20 group"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${colors}`}>
                    <span className="material-symbols-outlined">{icon}</span>
                  </div>
                  <h5 className="font-headline font-bold">{title}</h5>
                  <p className="text-xs text-on-surface-variant line-clamp-2">{text}</p>
                  <span className="mt-auto text-primary text-xs font-bold tracking-wider uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                    Consulter <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="max-w-4xl mx-auto my-24 px-6">
          <div className="bg-surface-container-highest p-8 md:p-12 rounded-[2rem] flex flex-col md:flex-row items-center gap-12 border border-outline-variant/10 shadow-lg">
            <div className="flex-1 space-y-6">
              <h3 className="font-headline text-3xl font-bold">
                Comment puis-je vous aider aujourd&apos;hui ?
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Comment refaire mon passeport ?",
                  "Payer ma taxe foncière",
                  "Immatriculation ANPI",
                ].map((prompt) => (
                  <Link
                    key={prompt}
                    href={`/assistant?q=${encodeURIComponent(prompt)}`}
                    className="bg-surface-container-lowest px-4 py-2 rounded-full text-sm font-medium border border-outline-variant/15 hover:bg-secondary-container transition-all"
                  >
                    &quot;{prompt}&quot;
                  </Link>
                ))}
              </div>
              <form action="/assistant" className="relative group">
                <input
                  className="w-full bg-surface-container-high/50 border border-outline-variant/20 rounded-xl py-4 px-6 text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all placeholder-on-surface-variant/50 shadow-inner"
                  placeholder="Posez votre question ici..."
                  type="text"
                  name="q"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-2 bottom-2 bg-primary text-on-primary px-6 rounded-lg font-bold shadow-subtle hover:shadow-elevated transition-all active:scale-95"
                >
                  Envoyer
                </button>
              </form>
            </div>
            <div className="w-48 h-48 bg-gradient-to-tr from-secondary-container to-primary-container rounded-full flex items-center justify-center relative overflow-hidden">
              <img
                alt=""
                className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTr7KSWGvsRhItEqDpVdLFuJgzDfdHXWjWbZRkqE-fOsMp6z-J0ZWI7Mr4KskgIEQOq7ijjR9Wa8fLpLh5xvX5jB9ev3adUnYPgPSu0Z2tM-HPVBm9vlBPemtcmdBTsYb7CvF8LNcLY0XNBsJbGEvnfVQ4ma9HG59bQ6qgA-mOo0mGV4J_etlbYXjBwzf6k5cMT-NEXT_bbMmSEgFttkxNK7xANCykIn7s9PFSq--y34JUWP4P9y9rWves-dS0PQuLmpexLm8p3ho"
              />
              <span className="material-symbols-outlined text-on-primary text-7xl relative z-10">
                smart_toy
              </span>
              <div className="absolute inset-0 border-4 border-on-primary/10 rounded-full animate-pulse" />
            </div>
          </div>
        </section>
      </main>
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-surface/85 backdrop-blur-xl border-t border-outline-variant/15 shadow-[0_-20px_40px_rgba(0,0,0,0.04)] rounded-t-[2rem]">
        <Link className="flex flex-col items-center justify-center text-primary bg-primary-container/10 rounded-xl px-4 py-1" href="/assistant">
          <span className="material-symbols-outlined">smart_toy</span>
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-wider">
            Assistant
          </span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-all" href="/services">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-wider">
            Services
          </span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-all" href="/a-propos">
          <span className="material-symbols-outlined">info</span>
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-wider">
            À propos
          </span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-all" href="/support">
          <span className="material-symbols-outlined">contact_support</span>
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-wider">
            Support
          </span>
        </Link>
      </nav>
      <footer className="hidden md:block py-16 px-6 bg-surface-container-highest border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">
                account_balance
              </span>
              <h1 className="font-headline font-bold text-xl">ASI Gabon</h1>
            </div>
            <p className="text-on-surface-variant max-w-sm text-sm">
              L&apos;Assistant de Service Intelligent est une initiative du
              gouvernement gabonais pour simplifier la vie des citoyens grâce aux
              nouvelles technologies.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="w-8 h-8 rounded-full bg-secondary" />
              <div className="w-8 h-8 rounded-full bg-tertiary-container" />
              <div className="w-8 h-8 rounded-full bg-primary" />
            </div>
          </div>
          <div className="space-y-4">
            <h6 className="font-headline font-bold uppercase text-xs tracking-widest text-on-surface-variant">
              Navigation
            </h6>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-primary transition-colors" href="/">Accueil</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/services">Nos Services</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/abonnement">Abonnement</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/assistant">Questions Fréquentes</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/support">Contact</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h6 className="font-headline font-bold uppercase text-xs tracking-widest text-on-surface-variant">
              Légal
            </h6>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-primary transition-colors" href="/a-propos">Mentions Légales</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/a-propos">Confidentialité</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/support">Accessibilité</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-outline-variant/10 text-center text-xs text-on-surface-variant/60">
          © 2024 République Gabonaise - Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
