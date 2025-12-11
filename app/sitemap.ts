import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://seu-dominio.com"; // troque
  return [
    {
      url: `${base}/`,
      lastModified: new Date()
    }
  ];
}
