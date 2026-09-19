import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { FacilityFaq } from '@/components/facility-faq';
import { facilities } from '@/lib/site-config';
import { pageUrl } from '@/lib/seo';
export const metadata: Metadata = { title: 'Vanliga frågor om gym och medlemskap | IW nära', description: 'Priser, öppettider, app, personlig hjälp och medlemskap. Läs även om Skönsmons öppning och förbokning.', alternates: { canonical: pageUrl('/faq') } };
export default function FaqPage() {
  return <><a className="skip-link" href="#main">Hoppa till innehållet</a><SiteHeader /><main id="main" tabIndex={-1}><div className="page-width pt-12"><h1 className="metal-text text-4xl font-semibold sm:text-5xl">Vanliga frågor</h1><p className="body-copy mt-5">Här svarar vi på frågor om Sörberge och våra medlemskap. Skönsmon öppnar i november 2026 och har egna svar om förbokning och den nya anläggningen.</p><Link className="button button-lime mt-6" href="/skonsmon#faq">Frågor om Skönsmon</Link></div><FacilityFaq facility={facilities[0]} /></main><SiteFooter /></>;
}
