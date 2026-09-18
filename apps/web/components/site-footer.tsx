import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

function phoneHref(phone: string) {
  return `tel:+46${phone.replace(/[^0-9]/g, "").slice(1)}`;
}

export function SiteFooter() {
  return (
    <footer id="kontakt" className="border-t border-line bg-surface">
      <div className="page-width py-10 sm:py-12">
        <div className="grid gap-8 md:grid-cols-[1.1fr_1.9fr] md:items-start">
          <div>
            <p className="eyebrow text-muted">Kontakt</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Vi finns nära när du behöver oss.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted">
              Frågor om medlemskap, träning eller våra anläggningar? Hör av dig via mejl eller ring någon av oss direkt.
            </p>
            <a className="nav-link mt-5 inline-block text-base font-medium" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {siteConfig.contacts.map((contact) => (
              <a
                key={contact.phone}
                className="rounded-lg border border-line bg-background p-4 transition-colors hover:border-white/40"
                href={phoneHref(contact.phone)}
              >
                <span className="block text-base font-semibold">{contact.name}</span>
                <span className="mt-1 block text-xs uppercase tracking-wider text-muted">{contact.role}</span>
                <span className="mt-3 block text-sm">{contact.phone}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>IW nära <span className="mx-2 text-white/30">/</span> Ditt lokala gym.</p>
          <div className="flex gap-5">
            <Link className="nav-link" href="/sorberge">Sörberge</Link>
            <Link className="nav-link" href="/skonsmon">Skönsmon</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
