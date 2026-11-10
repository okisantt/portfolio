import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/curriculo`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE.url}/privacidade`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
