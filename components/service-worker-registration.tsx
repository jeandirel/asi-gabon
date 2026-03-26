"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      void navigator.serviceWorker
        .getRegistrations()
        .then((registrations) =>
          Promise.all(registrations.map((registration) => registration.unregister())),
        )
        .then(() => caches.keys())
        .then((keys) =>
          Promise.all(
            keys
              .filter((key) => key.startsWith("asi-gabon-shell-"))
              .map((key) => caches.delete(key)),
          ),
        )
        .catch(() => undefined);

      return;
    }

    void navigator.serviceWorker.register("/sw.js", {
      updateViaCache: "none",
    });
  }, []);

  return null;
}
