export const STRIPE_PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK?.trim() ?? "";

export const HAS_STRIPE_PAYMENT_LINK = STRIPE_PAYMENT_LINK.length > 0;

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
