import Link from "next/link";

const SERVICE_CATEGORIES = [
  ["Identité", "Cartes d'identité, passeports, actes de naissance et certificats de nationalité gabonaise.", "badge", "bg-primary/10 text-primary", "passeport"],
  ["Fiscalité", "Déclarations d'impôts, taxes foncières, douanes et paiements des redevances publiques.", "account_balance_wallet", "bg-tertiary/10 text-tertiary", "impôts"],
  ["Santé", "Assurance CNAMGS, carnets de santé numériques et prise de rendez-vous en centres publics.", "medical_services", "bg-secondary/10 text-secondary", "CNAMGS"],
  ["Emploi", "Offres d'emploi public, concours administratifs et aide à l'insertion professionnelle.", "work", "bg-primary-container/10 text-primary-container", "emploi public"],
  ["Éducation", "Bourses d'études, inscriptions universitaires, examens et diplômes nationaux.", "school", "bg-secondary-container/20 text-on-secondary-container", "bourse d'études"],
  ["Transport", "Permis de conduire, cartes grises, vignettes et informations sur les transports nationaux.", "directions_car", "bg-tertiary-fixed-dim/20 text-tertiary", "permis de conduire"],
  ["Justice", "Casier judiciaire, aide juridictionnelle et suivi des procédures civiles et pénales.", "gavel", "bg-on-surface-variant/10 text-on-surface-variant", "casier judiciaire"],
  ["Entreprises", "Création d'entreprise (ANPI), licences commerciales et déclarations sociales.", "business_center", "bg-secondary/10 text-secondary", "créer une entreprise"],
];

export function ServicesPage() {
  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen pb-32">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#f8fafb] opacity-80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#165ca9] text-2xl">
            account_balance
          </span>
          <span className="text-xl font-bold tracking-tighter text-[#165ca9]">
            ASI Gabon
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-[#444748] text-sm font-medium hover:text-[#165ca9] transition-colors" href="/assistant">
            Assistant
          </Link>
          <Link className="text-[#165ca9] font-semibold text-sm" href="/services">
            Services
          </Link>
          <Link className="text-[#444748] text-sm font-medium hover:text-[#165ca9] transition-colors" href="/a-propos">
            À propos
          </Link>
          <Link className="text-[#444748] text-sm font-medium hover:text-[#165ca9] transition-colors" href="/support">
            Support
          </Link>
        </nav>
        <Link className="text-[#165ca9] font-['Manrope'] font-bold tracking-tight active:scale-95 duration-200" href="/">
          Accueil
        </Link>
      </header>
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        <section className="mb-16">
          <div className="relative overflow-hidden rounded-xl p-8 md:p-16 mb-12 bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-[11px] font-bold tracking-widest uppercase rounded-full mb-6">
                Plateforme Officielle
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Portail National des Services Publics
              </h1>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed font-body">
                Accédez en toute sécurité à l&apos;ensemble de vos démarches
                administratives, de santé et d&apos;éducation pour une citoyenneté
                numérique simplifiée.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-tertiary/10 rounded-full blur-3xl" />
          </div>
          <form action="/assistant" className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="flex-grow flex items-center bg-surface-container-high rounded-xl px-6 py-4 shadow-sm border border-outline-variant/15">
              <span className="material-symbols-outlined text-outline mr-3">search</span>
              <input
                className="bg-transparent border-none focus:ring-0 w-full text-on-surface placeholder:text-outline/70"
                placeholder="Rechercher un service, une démarche ou une institution..."
                type="text"
                name="q"
              />
            </div>
            <button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold shadow-md hover:bg-primary-container transition-all active:scale-95" type="submit">
              Trouver
            </button>
          </form>
        </section>
        <section className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-on-surface flex items-center gap-3">
              <span className="w-2 h-8 bg-secondary rounded-full" />
              Catégories de services
            </h2>
            <span className="text-sm font-medium text-outline uppercase tracking-wider hidden sm:block">
              8 Catégories Actives
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {SERVICE_CATEGORIES.map(([title, text, icon, colors, query]) => (
              <Link
                key={title}
                href={`/assistant?q=${encodeURIComponent(query)}`}
                className="group bg-surface-container-lowest p-8 rounded-xl flex flex-col h-full border border-outline-variant/10 hover:border-primary/20 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${colors}`}>
                  <span className="material-symbols-outlined text-3xl">{icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-on-surface">{title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-8 flex-grow">
                  {text}
                </p>
                <span className="w-full flex items-center justify-between py-3 px-4 rounded-lg bg-surface-container-low text-primary font-bold hover:bg-primary hover:text-on-primary transition-all">
                  Consulter
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-surface-container-low rounded-xl p-8 flex items-start gap-6 border border-outline-variant/10">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined">verified_user</span>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2">Sécurité des données</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Vos informations personnelles sont protégées par les plus hauts
                standards de chiffrement souverain et traitées conformément à la
                législation gabonaise sur la protection de la vie privée.
              </p>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-8 flex items-start gap-6 border border-outline-variant/10">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center text-secondary shadow-sm">
              <span className="material-symbols-outlined">support_agent</span>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2">Assistance 24/7</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Besoin d&apos;aide pour vos démarches ? Notre assistant intelligent
                ASI est disponible à tout moment pour vous guider étape par étape
                dans votre navigation.
              </p>
            </div>
          </div>
        </section>
      </main>
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#f8fafb]/80 backdrop-blur-xl border-t border-[#c2c6d3]/15 shadow-[0_-8px_32px_rgba(25,28,29,0.06)] md:hidden rounded-t-2xl">
        <Link className="flex flex-col items-center justify-center text-[#71787a] hover:text-[#006d40] transition-all active:scale-90 duration-150" href="/assistant">
          <span className="material-symbols-outlined mb-1">smart_toy</span>
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-wider">Assistant</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-[#165ca9] bg-[#3a75c4]/10 rounded-xl px-4 py-1 transition-all active:scale-90 duration-150" href="/services">
          <span className="material-symbols-outlined mb-1">grid_view</span>
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-wider">Services</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-[#71787a] hover:text-[#006d40] transition-all active:scale-90 duration-150" href="/a-propos">
          <span className="material-symbols-outlined mb-1">info</span>
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-wider">À propos</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-[#71787a] hover:text-[#006d40] transition-all active:scale-90 duration-150" href="/support">
          <span className="material-symbols-outlined mb-1">contact_support</span>
          <span className="font-['Inter'] text-[11px] font-medium uppercase tracking-wider">Support</span>
        </Link>
      </nav>
      <Link
        href="/assistant"
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-16 h-16 rounded-full bg-primary text-on-primary shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <span className="material-symbols-outlined text-3xl">chat_bubble</span>
        <span className="absolute right-full mr-4 bg-on-surface text-surface text-xs font-bold py-2 px-4 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Une question ?
        </span>
      </Link>
    </div>
  );
}
