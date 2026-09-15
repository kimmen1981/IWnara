import type { MetadataRoute } from "next";
import { facilities } from "@/lib/site-config";
import { pageUrl } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: pageUrl("/") }, { url: pageUrl("/butik") }, ...facilities.map(f => ({ url: pageUrl(`/${f.slug}`) }))];
}
