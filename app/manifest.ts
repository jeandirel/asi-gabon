import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ASI Gabon",
    short_name: "ASI Gabon",
    description:
      "Assistant intelligent pour les démarches administratives gabonaises.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafb",
    theme_color: "#f8fafb",
    lang: "fr",
    orientation: "portrait",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
