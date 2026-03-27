export const STRIPE_PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK?.trim() ?? "";

export const HAS_STRIPE_PAYMENT_LINK = STRIPE_PAYMENT_LINK.length > 0;

export const STRIPE_PAYMENT_LINK_QUARTERLY =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_QUARTERLY?.trim() ?? "";

export const STRIPE_PAYMENT_LINK_YEARLY =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_YEARLY?.trim() ?? "";

export const STRIPE_PAYMENT_LINK_MONTHLY =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MONTHLY?.trim() ?? "";

function getStripeMode(value: string) {
  if (!value) {
    return null;
  }

  if (value.includes("/test_") || value.startsWith("pk_test_")) {
    return "test";
  }

  if (value.startsWith("pk_live_")) {
    return "live";
  }

  if (value.startsWith("https://buy.stripe.com/")) {
    return "live";
  }

  return null;
}

export const STRIPE_BUY_BUTTON_ID =
  process.env.NEXT_PUBLIC_STRIPE_BUY_BUTTON_ID?.trim() ?? "";

export const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() ?? "";

const paymentLinkMode = getStripeMode(STRIPE_PAYMENT_LINK);
const publishableKeyMode = getStripeMode(STRIPE_PUBLISHABLE_KEY);

export const HAS_STRIPE_BUY_BUTTON =
  STRIPE_BUY_BUTTON_ID.length > 0 &&
  STRIPE_PUBLISHABLE_KEY.length > 0 &&
  (!paymentLinkMode || !publishableKeyMode || paymentLinkMode === publishableKeyMode);

export interface StripeBillingPlan {
  cadence: string;
  description: string;
  id: string;
  link: string;
  price: string;
  title: string;
  featured?: boolean;
}

export const STRIPE_BILLING_PLANS: StripeBillingPlan[] = [
  {
    id: "monthly",
    title: "Formule Mensuelle",
    price: "20 EUR",
    cadence: "par mois",
    description: "La formule la plus simple pour commencer avec un engagement court et flexible.",
    link: STRIPE_PAYMENT_LINK_MONTHLY || STRIPE_PAYMENT_LINK,
  },
  {
    id: "quarterly",
    title: "Formule Trimestrielle",
    price: "30 EUR",
    cadence: "tous les 3 mois",
    description: "Une formule souple pour commencer avec un cycle de facturation plus court.",
    link: STRIPE_PAYMENT_LINK_QUARTERLY,
  },
  {
    id: "yearly",
    title: "Formule Annuelle",
    price: "100 EUR",
    cadence: "par an",
    description: "Le meilleur tarif pour un usage continu avec une vision long terme.",
    link: STRIPE_PAYMENT_LINK_YEARLY,
    featured: true,
  },
].filter((plan) => plan.link.length > 0);

export const DEFAULT_STRIPE_BILLING_PLAN =
  STRIPE_BILLING_PLANS.find((plan) => plan.id === "monthly") ??
  STRIPE_BILLING_PLANS[0] ??
  (HAS_STRIPE_PAYMENT_LINK
    ? {
        id: "default",
        title: "Offre ASI Gabon",
        price: "",
        cadence: "",
        description: "Formule activee depuis le lien Stripe configure.",
        link: STRIPE_PAYMENT_LINK,
      }
    : null);
