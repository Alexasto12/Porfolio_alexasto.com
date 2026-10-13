import type { MetadataRoute } from "next";
import { PERSON_NAME } from "@/lib/content";
import { DESCRIPTION } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: PERSON_NAME,
    short_name: PERSON_NAME,
    description: DESCRIPTION.es,
    start_url: "/",
    display: "standalone",
    background_color: "#14130e",
    theme_color: "#14130e",
    lang: "es",
    categories: ["portfolio", "technology", "business"],
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
