import type { MetadataRoute } from "next";
import { pageUrl, publicIndexing } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  return { rules: publicIndexing ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" }, sitemap: pageUrl("/sitemap.xml") };
}
