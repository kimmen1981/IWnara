import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
export function SiteHeader({facility}: {facility?: string}) {
 return <header className="site-header"><div className="page-width flex flex-wrap items-center justify-between gap-5 py-5">
 <Link href="/" aria-label="IW nära – välj anläggning" className="brand-link shrink-0"><Image src="/brand/logo-relief.jpeg" alt="IW nära – ditt lokala gym" width={1881} height={836} priority className="brand-relief" /></Link>
 {facility ? <><span className="location-label metal-text">{facility}</span><nav aria-label="Huvudnavigation" className="facility-nav">{siteConfig.navigation.map(x=><a key={x.href} href={x.href}>{x.label}</a>)}<Link className="change-link" href="/">Byt anläggning</Link></nav></> : <nav aria-label="Anläggningar" className="flex items-center gap-7 text-sm"><Link className="nav-link metal-nav" href="/sorberge">Sörberge</Link><Link className="nav-link metal-nav" href="/skonsmon">Skönsmon</Link></nav>}
 </div></header>;
}
