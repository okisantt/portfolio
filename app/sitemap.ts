import type { MetadataRoute } from "next";
import { NAV, SITE } from "@/lib/data";
import { PROJECTS } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    ...NAV.map((item) => ({ url: `${SITE.url}${item.href}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...PROJECTS.map((project) => ({
      url: `${SITE.url}/projetos/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${SITE.url}/curriculo`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE.url}/privacidade`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
