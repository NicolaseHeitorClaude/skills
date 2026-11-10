import type { MetadataRoute } from "next";
import { noticias } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bandadostiroleses.com";
  const paginas = ["", "/historia", "/banda", "/eventos", "/galeria", "/noticias", "/colaboradores", "/contato"];
  return [
    ...paginas.map((p) => ({ url: base + p, changeFrequency: "monthly" as const, priority: p ? 0.7 : 1 })),
    ...noticias().map((n) => ({ url: `${base}/noticias/${n.slug}`, lastModified: n.data })),
  ];
}
