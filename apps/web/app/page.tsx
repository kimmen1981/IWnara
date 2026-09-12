import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { facilities } from "@/lib/site-config";
export const metadata: Metadata = { alternates: { canonical: "https://www.iwnara.se/" } };
export default function Home() {
 return <><a className="skip-link" href="#main">Hoppa till innehållet</a><SiteHeader />
 <main id="main" tabIndex={-1} className="selector-main">
 <div className="selector-background" aria-hidden="true">
  <div className="selector-image selector-image-left"><Image src="/brand/hero-building-left.jpeg" alt="" fill priority sizes="(min-width: 768px) 50vw, 100vw" /></div>
  <div className="selector-image selector-image-right"><Image src="/brand/hero-window-right-evening.png" alt="" fill priority sizes="(min-width: 768px) 50vw, 100vw" /></div>
 </div>
 <div className="selector-shade" />
 <div className="page-width relative z-10 py-14 sm:py-20">
 <div className="mx-auto max-w-4xl text-center"><p className="eyebrow">Ditt lokala gym</p><h1 className="selector-heading metal-text">Träna på dina villkor.<br/><span className="metal-secondary">Nära dig.</span></h1><p className="mt-6 text-base leading-7 text-white/75 sm:text-lg">Personliga gym i Timrå och Sundsvall. Välj din anläggning och prova ett pass gratis.</p></div>
 <div className="mx-auto mt-12 max-w-4xl"><div className="mb-4 flex items-center gap-4"><span className="h-px flex-1 bg-white/20"/><h2 className="eyebrow text-xs">Välj anläggning</h2><span className="h-px flex-1 bg-white/20"/></div>
 <div className="grid gap-4 md:grid-cols-2">{facilities.map((f,i)=><Link key={f.slug} href={`/${f.slug}`} className="facility-choice group"><div className="flex items-center justify-between"><span className="eyebrow text-white/60">{f.area}</span><span className="text-sm text-white/35">0{i+1}</span></div><h3 className="metal-text mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">{f.name}</h3><div className="mt-8 flex items-center justify-between border-t border-white/15 pt-5"><span className="text-sm font-medium">Utforska {f.name}</span><span className="choice-arrow" aria-hidden="true">↗</span></div></Link>)}</div>
 </div><p className="mt-8 text-center text-xs leading-5 text-white/50">Bildmontage av IW nära.</p>
 </div></main><section className="page-width py-14" aria-labelledby="home-about"><h2 id="home-about" className="text-2xl font-semibold">Ditt lokala gym i Sörberge och Skönsmon</h2><p className="body-copy mt-5 max-w-3xl">På IW nära kombinerar vi friheten i ett obemannat gym med personlig hjälp. Du låser upp med din app och får stöd av utbildade personliga tränare inom träning och kost. Vi handplockar utrustningen och skapar rena, mysiga gym där du ska känna dig hemma.</p><p className="body-copy mt-4 max-w-3xl">Välj Sörberge i Timrå eller Skönsmon i Sundsvall för bilder, öppettider och medlemskap. Är du nyfiken? Ditt första träningspass är gratis, med maskinvisning och hjälp att hitta ett program som passar dig.</p></section><SiteFooter /></>;
}
