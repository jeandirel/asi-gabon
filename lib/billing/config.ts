export const STRIPE_PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK?.trim() ?? "";

export const HAS_STRIPE_PAYMENT_LINK = STRIPE_PAYMENT_LINK.length > 0;

export const STRIPE_BUY_BUTTON_ID =
  process.env.NEXT_PUBLIC_STRIPE_BUY_BUTTON_ID?.trim() ?? "";

export const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() ?? "";

export const HAS_STRIPE_BUY_BUTTON =
  STRIPE_BUY_BUTTON_ID.length > 0 && STRIPE_PUBLISHABLE_KEY.length > 0;
