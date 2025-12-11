import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://seu-dominio.com"; // troque
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${base}/sitemap.xml`
  };
}
