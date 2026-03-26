"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

import {
  HAS_STRIPE_BUY_BUTTON,
  STRIPE_BUY_BUTTON_ID,
  STRIPE_PUBLISHABLE_KEY,
} from "@/lib/billing/config";

export function StripeBuyButton() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!HAS_STRIPE_BUY_BUTTON || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    container.innerHTML = "";

    const button = document.createElement("stripe-buy-button");
    button.setAttribute("buy-button-id", STRIPE_BUY_BUTTON_ID);
    button.setAttribute("publishable-key", STRIPE_PUBLISHABLE_KEY);
    container.appendChild(button);
  }, []);

  if (!HAS_STRIPE_BUY_BUTTON) {
    return null;
  }

  return (
    <>
      <Script
        src="https://js.stripe.com/v3/buy-button.js"
        strategy="afterInteractive"
      />
      <div ref={containerRef} />
    </>
  );
}
