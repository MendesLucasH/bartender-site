import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexable } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(isIndexable() ? { allow: "/" } : { disallow: "/" }),
    },
    ...(isIndexable()
      ? { sitemap: new URL("/sitemap.xml", getSiteUrl()).href }
      : {}),
  };
}
