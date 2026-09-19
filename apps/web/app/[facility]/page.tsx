import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { facilities, siteConfig } from "@/lib/site-config";
import { facilityStructuredData, pageUrl } from "@/lib/seo";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { FacilityFaq } from "@/components/facility-faq";
import { FacilityGallery } from "@/components/facility-gallery";

type Props = { params: Promise<{ facility: string }> };
export function generateStaticParams() { return facilities.map(f => ({ facility: f.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { facility } = await params;
  const f = facilities.find(x => x.slug === facility);
  if (!f) notFound();
  return {
    title: f.title, description: f.description, alternates: { canonical: pageUrl(`/${f.slug}`) },
    openGraph: { title: f.title, description: f.description, url: pageUrl(`/${f.slug}`), locale: "sv_SE", type: "website" },
  };
}
export default async function FacilityPage({ params }: Props) {
  const { facility } = await params;
  const f = facilities.find(x => x.slug === facility);
  if (!f) notFound();
  const hero = f.photos.find(p => p.src.includes("interior") || p.src.includes("strength")) ?? f.photos[0];
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.address)}`;
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(facilityStructuredData(f)).replace(/</g, "\u003c") }} />
    <a className="skip-link" href="#main">Hoppa till innehållet</a><SiteHeader facility={f.name} />
    <main id="main" tabIndex={-1}>
      <section className="facility-hero" aria-labelledby="facility-heading">
        <Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" className="mood-background object-cover" /><div className="hero-shade" />
        <div className="page-width relative z-10 py-16 sm:py-24">
          <Link className="text-sm text-white/65 hover:text-white" href="/">← Alla anläggningar</Link>
          <p className="eyebrow mt-10">IW nära · {f.area}</p>
          <h1 id="facility-heading" className="metal-text mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Gym i {f.name},<br />nära dig i {f.area}.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">{f.intro}</p>
          {f.openingNotice && <div className="mt-8 max-w-2xl rounded-lg border border-white/20 bg-black/40 p-5 sm:p-7"><h2 className="text-xl font-semibold sm:text-2xl">Öppet hus i Skönsmon</h2><p className="mt-4 text-base leading-7 text-white/85">{f.openingNotice}</p>{f.openingLink && <a className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white" href={f.openingLink.href} target="_blank" rel="noreferrer"><span>{f.openingLink.label}</span><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18 18 6M6 6h12v12" /></svg></a>}</div>}
          <div className="mt-8 flex flex-wrap gap-3"><a className="button button-light" href="#prova-gratis">Prova ett pass gratis</a><a className="button" href="#bilder">Se gymmet</a></div>
        </div>
      </section>
      <div className="border-y border-line bg-surface"><div className="page-width grid gap-5 py-7 text-sm sm:grid-cols-3"><p><span className="detail-label">Anläggning</span>IW nära {f.name}</p><p><span className="detail-label">Öppettider</span>{f.hours}</p><p><span className="detail-label">Besöksadress</span>{f.address}</p></div></div>
      <div className="page-width"><Section id="om-gymmet" number="01" title="Din träning. Vår omtanke."><p className="body-copy">{f.about}</p><p className="body-copy mt-5">{siteConfig.support}</p></Section></div>
      <FacilityGallery facility={f} />
      <section id="prova-gratis" aria-labelledby="trial-heading" className="border-y border-line bg-surface py-16 sm:py-20"><div className="page-width grid gap-10 md:grid-cols-2">
        <div><p className="eyebrow text-muted">Prova IW nära {f.name}</p><h2 id="trial-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Första passet bjuder vi på.</h2><p className="body-copy mt-6">{siteConfig.trial}</p><a className="button button-light mt-7" href="#kontakt">Kontakta oss för provträning</a></div>
        <div className="rounded-lg border border-line bg-background p-7 sm:p-9"><h3 className="text-xl font-semibold">En start som passar dig</h3><ul className="mt-6 space-y-5 text-muted"><li>✓ Ett gratis träningspass för dig som funderar på medlemskap</li><li>✓ Personlig visning av gymmet och dess utrustning</li><li>✓ Träningsschema och individuellt program efter dina mål</li></ul><p className="mt-7 text-sm leading-7 text-muted">{siteConfig.team}</p></div>
      </div></section>
      <div className="page-width"><Section id="filosofi" number="02" title="Mycket gym. Mycket omtanke."><p className="body-copy">{siteConfig.philosophy}</p></Section></div>
      <section id="medlemskap" className="border-y border-line bg-surface py-16 sm:py-20" aria-labelledby="membership-heading"><div className="page-width"><p className="eyebrow text-muted">Medlemskap · {f.name}</p><h2 id="membership-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Hitta ditt medlemskap.</h2><div className={`mt-9 grid gap-4 ${f.memberships.length > 1 ? "lg:grid-cols-3" : "max-w-2xl"}`}>{f.memberships.map(m => <article key={m.name} className="membership-card"><h3 className="text-lg font-medium">{m.name}</h3><p className="mt-7 text-3xl font-semibold">{m.price}</p><p className="mt-4 text-sm leading-6 text-muted">{m.detail}</p><a href="#kontakt" className="button mt-8 w-full">Fråga om medlemskap</a></article>)}</div></div></section>
      <FacilityFaq facility={f} />
      <div className="page-width"><Section id="kontakt" number="03" title={`Välkommen till ${f.name}.`}><p className="body-copy mb-8">Hör av dig för att prova gymmet, få hjälp att komma igång eller prata om ditt medlemskap. Vi kommer överens om en tid så att du får en personlig genomgång.</p><dl className="grid gap-8 sm:grid-cols-2"><div><dt className="detail-label">Adress</dt><dd className="body-copy">{f.address}<a className="nav-link mt-3 block text-sm" href={mapUrl}>Visa vägen i Google Maps ↗</a></dd></div><div><dt className="detail-label">Öppettider</dt><dd className="body-copy">{f.hours}</dd></div><div><dt className="detail-label">Kontakt</dt><dd className="body-copy">{f.email ? <a className="nav-link" href={`mailto:${f.email}?subject=${encodeURIComponent(`Medlemskap / frågor – ${f.name}`)}`}>{f.email}</a> : null}<div className="mt-4 space-y-3">{siteConfig.contacts.map(contact => <a key={contact.phone} className="nav-link block" href={`tel:+46${contact.phone.replace(/[^0-9]/g, "").slice(1)}`}><span className="font-medium text-foreground">{contact.phone}</span><span className="ml-2 text-sm text-muted">({contact.name} – {contact.role})</span></a>)}</div></dd></div></dl></Section></div>

    </main><SiteFooter />
  </>;
}

