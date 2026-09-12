import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { publicIndexing } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title, description: siteConfig.description,
  robots: { index: publicIndexing, follow: publicIndexing },
  openGraph: { title: siteConfig.title, description: siteConfig.description, locale: "sv_SE", type: "website", siteName: siteConfig.name },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="sv"><body>{children}</body></html>;
}
