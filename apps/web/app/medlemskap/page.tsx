import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MembershipFlow } from "@/components/membership-flow";
import { pageUrl } from "@/lib/seo";
export const metadata: Metadata = { title: "Medlemskap – en start som passar dig | IW nära", description: "Välj medlemskap eller gratis provträning i Sörberge. Förboka Skönsmon för 299 kr/mån inför november 2026.", alternates: { canonical: pageUrl("/medlemskap") } };
export default function MembershipPage() {
  return <><a className="skip-link" href="#main">Hoppa till innehållet</a><SiteHeader /><main id="main" tabIndex={-1} className="membership-page page-width py-8 sm:py-14"><div className="booking-layout"><section className="booking-intro"><div className="relative z-10"><p className="eyebrow">Din träning börjar här</p><h1>Vi gör plats<br />för <em>dig.</em></h1><p className="body-copy mt-6">Din första träning. Din nästa vana. Vi hjälper dig att hitta en start som känns rätt.</p><p className="mt-8 text-sm leading-7 text-muted">Registrera dig själv i GymControl eller få personlig hjälp av oss. Du väljer.</p><p className="mt-6 text-sm leading-7 text-muted">Sörberge är öppet alla dagar 06–23. Skönsmon öppnar i november 2026 och kommer att vara öppet dygnet runt.</p></div><Image src="/brand/sorberge.jpg" alt="Träningsmiljön i Sörberge" width={1200} height={900} className="booking-image" sizes="(min-width: 900px) 45vw, 100vw" /></section><MembershipFlow emailEnabled={Boolean(process.env.RESEND_API_KEY && process.env.MAIL_FROM)} /></div></main><SiteFooter /></>;
}
