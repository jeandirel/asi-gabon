import Link from "next/link";

import { FirebaseAuthStatus } from "@/components/auth/firebase-auth-status";

export function AboutPage() {
  return (
    <div className="bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface/85 backdrop-blur-xl border-b border-outline-variant/15 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">
            account_balance
          </span>
          <span className="text-xl font-bold tracking-tight text-on-surface">
            ASI Gabon
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-on-surface-variant hover:bg-surface-container-high px-3 py-1 rounded-lg transition-colors font-medium" href="/assistant">
            Assistant
          </Link>
          <Link className="text-on-surface-variant hover:bg-surface-container-high px-3 py-1 rounded-lg transition-colors font-medium" href="/services">
            Services
          </Link>
          <Link className="text-on-surface-variant hover:bg-surface-container-high px-3 py-1 rounded-lg transition-colors font-medium" href="/abonnement">
            Abonnement
          </Link>
          <Link className="text-primary font-semibold px-3 py-1 rounded-lg" href="/a-propos">
            À propos
          </Link>
          <Link className="text-on-surface-variant hover:bg-surface-container-high px-3 py-1 rounded-lg transition-colors font-medium" href="/support">
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
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-[0.75rem] font-medium uppercase tracking-widest mb-6">
                Institutionnel
              </span>
              <h1 className="text-on-surface text-5xl md:text-7xl font-headline font-bold tracking-tight leading-[1.1] mb-8">
                L&apos;intelligence numérique au service de la{" "}
                <span className="text-primary">Souveraineté</span>.
              </h1>
              <p className="text-on-surface-variant text-xl md:text-2xl font-body leading-relaxed max-w-3xl">
                ASI Gabon est un assistant numérique destiné à simplifier l’accès
                aux services publics, conçu pour accompagner chaque citoyen dans ses
                démarches administratives avec clarté et efficacité.
              </p>
            </div>
            <div className="lg:col-span-4 hidden lg:block">
              <div className="h-64 w-full rounded-xl bg-surface-container-low flex items-center justify-center overflow-hidden">
                <img
                  className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDozukGYDJlmM5X58dSUjX4Oayml97ljchHyLj6WGeliEPf2SQOWAOh9g0Ldi_ufoa-wRXmc08600n2WXaK-jtvMNwtL6G57muVl9M3-xrciOTBgIPpmNo7chLc8894Kmq4fvjApncAHrMoMECoTWRgKRN7jo-U0toOzI88TaQ8REhQsqrU8ezkvbRdr8G8zNj3wPjAgeDzE0LBvqw_qckwWSwLB0xYzV5B-V8q5NhG9BWuknCox1m0B-FRlgfe_5PhiC9edtTpLVo"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        <section className="bg-surface-container-low rounded-[2rem] p-8 md:p-16 mb-24">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-on-surface text-3xl font-headline font-medium sticky top-24">
                Notre Mission
              </h2>
            </div>
            <div className="lg:w-2/3 space-y-8">
              <p className="text-on-surface text-lg font-body leading-relaxed">
                Dans un monde en constante mutation numérique, le Gabon réaffirme sa
                volonté de moderniser son administration. ASI Gabon incarne cette
                transition en offrant une interface unique, intuitive et sécurisée
                entre l&apos;État et ses usagers.
              </p>
              <p className="text-on-surface text-lg font-body leading-relaxed">
                Notre plateforme n&apos;est pas seulement un outil technologique ;
                c&apos;est un engagement vers une gouvernance plus transparente et
                plus proche des préoccupations quotidiennes des Gabonais. En
                centralisant l&apos;accès aux informations et aux formulaires
                officiels, nous réduisons les barrières bureaucratiques.
              </p>
              <div className="pt-8">
                <div className="h-[1px] bg-outline-variant/15 w-full mb-8" />
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-primary text-4xl font-headline font-bold">
                      100%
                    </span>
                    <span className="text-on-surface-variant text-sm font-label uppercase tracking-wider">
                      Officiel
                    </span>
                  </div>
                  <div className="w-[1px] h-12 bg-outline-variant/30" />
                  <div className="flex flex-col">
                    <span className="text-secondary text-4xl font-headline font-bold">
                      24/7
                    </span>
                    <span className="text-on-surface-variant text-sm font-label uppercase tracking-wider">
                      Disponibilité
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-24">
          <div className="mb-12">
            <h2 className="text-on-surface text-3xl font-headline font-medium mb-4">
              Nos principes
            </h2>
            <div className="h-1 w-24 bg-tertiary-container rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ["Simplicité", "Une interface dépouillée pour que l'essentiel soit toujours à portée de clic, sans complexité inutile.", "auto_awesome", "bg-primary-fixed"],
              ["Accessibilité", "Conçu pour tous les terminaux et tous les citoyens, quelles que soient leurs aptitudes technologiques.", "universal_currency", "bg-secondary-fixed"],
              ["Fiabilité", "Des données sécurisées et des réponses basées scrupuleusement sur les textes de loi officiels.", "verified_user", "bg-tertiary-fixed"],
              ["Orientation", "Un aiguillage précis vers les services et ministères compétents pour chaque demande spécifique.", "account_tree", "bg-surface-container-highest"],
            ].map(([title, text, icon, bg]) => (
              <div
                key={title}
                className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-subtle hover:shadow-elevated transition-shadow duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow`}>
                  <span className="material-symbols-outlined text-xl">{icon}</span>
                </div>
                <h3 className="text-on-surface text-xl font-headline font-bold mb-3">
                  {title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="relative rounded-3xl overflow-hidden min-h-[400px] flex items-center px-8 md:px-16">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBkzi9EV1L5Y1B99EAOBesvQk5h9F-OdwoFZdFthdVLmt5xS_BvUohSGBJfqhDLoX-OP0FP7z0HQ8nbV3L9mPhSjkmSmWyKquATXGVHVjbwxW4O8YApsogKfm_pecgVu4jXLkJF38dDdvcHSlYyh_Yq58cs36FMk5-sDcDd_ujgJ6vcvOXL5rJltpeJzvVoacQGqJcKu0axwacUdBLdJPTAgD1ZhvNWpyA-9Z-nS2RHNZJonX7SOG_AruIhfJMce7pDLlK1Z8N32U"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-container/70 mix-blend-multiply" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-on-primary text-4xl font-headline font-bold mb-6">
              Au service de la République Gabonaise
            </h2>
            <p className="text-on-primary/90 text-lg mb-8 leading-relaxed">
              ASI Gabon opère sous la supervision des autorités nationales pour
              garantir un standard d&apos;excellence et de conformité administrative.
            </p>
            <div className="flex gap-4">
              <Link
                href="/services"
                className="px-8 py-3 rounded-full bg-secondary-container text-on-secondary-container font-semibold hover:bg-secondary-fixed transition-colors"
              >
                Consulter les services
              </Link>
              <Link
                href="/support"
                className="px-8 py-3 rounded-full border border-on-primary/30 text-on-primary font-semibold hover:bg-on-primary/10 transition-colors"
              >
                Nous contacter
              </Link>
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
        <Link className="flex flex-col items-center justify-center text-primary bg-primary-container/10 rounded-xl px-4 py-1 active:scale-90 duration-150" href="/a-propos">
          <span className="material-symbols-outlined mb-1">info</span>
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-wider">À propos</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-all active:scale-90 duration-150" href="/support">
          <span className="material-symbols-outlined mb-1">contact_support</span>
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-wider">Support</span>
        </Link>
      </nav>
      <footer className="bg-surface-container-low border-t border-outline-variant/10 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">
                account_balance
              </span>
              <span className="text-2xl font-bold tracking-tighter text-primary">
                ASI Gabon
              </span>
            </div>
            <p className="text-on-surface-variant text-sm font-body leading-relaxed">
              Plateforme officielle de l&apos;administration Gabonaise pour la
              facilitation des démarches numériques citoyennes.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="text-on-surface font-headline font-bold mb-4">Légal</h4>
              <ul className="space-y-2 text-on-surface-variant text-sm">
                <li><Link className="hover:text-primary" href="/a-propos">Confidentialité</Link></li>
                <li><Link className="hover:text-primary" href="/a-propos">Mentions Légales</Link></li>
                <li><Link className="hover:text-primary" href="/support">Conditions d&apos;Utilisation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-on-surface font-headline font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-on-surface-variant text-sm">
                <li>Libreville, Gabon</li>
                <li>jeandirel@ogooueia.com</li>
                <li>+33664483732</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-outline-variant/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant text-xs font-label">
            © 2024 RÉPUBLIQUE GABONAISE. TOUS DROITS RÉSERVÉS.
          </p>
          <div className="flex gap-4">
            <div className="w-8 h-4 bg-[#009E60]" />
            <div className="w-8 h-4 bg-[#FCD116]" />
            <div className="w-8 h-4 bg-[#3A75C4]" />
          </div>
        </div>
      </footer>
    </div>
  );
}
