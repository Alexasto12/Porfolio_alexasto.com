import type { MetadataRoute } from "next";
import { BRAND, PERSON, DESCRIPTION } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND} — ${PERSON.name}`,
    short_name: BRAND,
    description: DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f3ec",
    theme_color: "#14130e",
    lang: "es",
    categories: ["portfolio", "technology", "business"],
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
