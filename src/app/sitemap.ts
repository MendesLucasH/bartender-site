import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexable } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return isIndexable()
    ? [{ url: getSiteUrl().href, changeFrequency: "monthly", priority: 1 }]
    : [];
}
