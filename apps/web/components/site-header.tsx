import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
export function SiteHeader({facility}: {facility?: string}) {
 return <header className="site-header"><div className="page-width flex flex-wrap items-center justify-between gap-5 py-5">
 <Link href="/" aria-label="IW nära – välj anläggning" className="brand-link shrink-0"><Image src="/brand/logo-relief.jpeg" alt="IW nära – ditt lokala gym" width={1881} height={836} priority className="brand-relief" /></Link>
 {facility ? <><span className="location-label metal-text">{facility}</span><nav aria-label="Huvudnavigation" className="facility-nav">{siteConfig.navigation.map(x=><a key={x.href} href={x.href}>{x.label}</a>)}<Link className="inline-flex min-h-11 items-center" href="/butik">Butik</Link><Link className="change-link" href="/">Byt anläggning</Link></nav></> : <nav aria-label="Huvudnavigation" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"><Link className="nav-link metal-nav inline-flex min-h-11 items-center" href="/sorberge">Sörberge</Link><Link className="nav-link metal-nav inline-flex min-h-11 items-center" href="/skonsmon">Skönsmon</Link><Link className="nav-link metal-nav inline-flex min-h-11 items-center" href="/butik">Butik</Link></nav>}
 </div></header>;
}
