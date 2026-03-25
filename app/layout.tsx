import type { Metadata, Viewport } from "next";

import { ChatbaseWidgetProvider } from "@/components/chatbase/widget-provider";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ASI Gabon",
    template: "%s | ASI Gabon",
  },
  description:
    "ASI Gabon est l'assistant intelligent pour les démarches administratives gabonaises.",
  applicationName: "ASI Gabon",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ASI Gabon",
  },
  formatDetection: {
    email: false,
    telephone: false,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    apple: "/apple-icon",
    icon: "/icon",
  },
};

export const viewport: Viewport = {
  themeColor: "#f8fafb",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chatbaseAgentId = process.env.CHATBASE_AGENT_ID?.trim() ?? null;

  return (
    <html className="light" lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="bg-surface font-body text-on-surface antialiased">
        <ServiceWorkerRegistration />
        <ChatbaseWidgetProvider agentId={chatbaseAgentId}>
          {children}
        </ChatbaseWidgetProvider>
      </body>
    </html>
  );
}
