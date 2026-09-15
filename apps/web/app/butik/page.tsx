import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { products, shopConfig } from "@/lib/shop-config";
import { pageUrl } from "@/lib/seo";
import { CopySwish } from "./copy-swish";

export const metadata: Metadata = {
  title: "Butik – handla på gymmet | IW nära",
  description: "Handla enkelt på IW nära. Se produkter och priser och betala med Swish när du är på gymmet.",
  alternates: { canonical: pageUrl("/butik") },
};

const priceFormat = new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK", maximumFractionDigits: 2 });

export default function ShopPage() {
  return <>
    <a className="skip-link" href="#main">Hoppa till innehållet</a>
    <SiteHeader />
    <main id="main" tabIndex={-1} className="page-width py-10 sm:py-16">
      <div className="max-w-2xl">
        <p className="eyebrow text-muted">Handla på gymmet</p>
        <h1 className="metal-text mt-4 text-4xl font-semibold sm:text-6xl">Butiken på IW nära</h1>
        <p className="body-copy mt-6">Välj det du behöver på plats och betala enkelt med Swish.</p>
      </div>
      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
        <section aria-labelledby="products-heading" className="min-w-0">
          <h2 id="products-heading" className="text-2xl font-semibold">Produkter & priser</h2>
          {products.length ? <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {products.map(product => <li key={product.name} className="membership-card flex min-w-0 flex-col">
              {product.image && <Image src={product.image} alt={product.name} width={480} height={480} sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw" className="mb-5 aspect-square w-full rounded-sm object-contain" />}
              <h3 className="break-words text-xl font-semibold">{product.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{product.description}</p>
              <p className="mt-auto pt-5 text-2xl font-semibold">{priceFormat.format(product.price)}</p>
            </li>)}
          </ul> : <div className="membership-card mt-6">
            <h3 className="text-lg font-semibold">Produktlistan kommer snart</h3>
            <p className="mt-3 leading-7 text-muted">Se aktuellt sortiment och priser på plats i gymmet. Är du osäker på något? Kontakta oss innan du betalar.</p>
          </div>}
        </section>
        <section aria-labelledby="payment-heading" className="membership-card bg-surface">
          <p className="eyebrow text-muted">Enkelt på plats</p>
          <h2 id="payment-heading" className="mt-3 text-2xl font-semibold">Betala med Swish</h2>
          <ol className="mt-6 list-decimal space-y-4 pl-5 text-sm leading-6 text-muted">
            <li>Kontrollera priset på varorna du vill köpa.</li>
            <li>Öppna Swish och ange numret nedan samt totalbeloppet.</li>
            <li>Skriv vilka varor du köper och vilket gym du är på i meddelandet. Kontrollera mottagaren och godkänn betalningen i Swish.</li>
          </ol>
          <p className="mt-7 text-sm text-muted">Swishnummer</p>
          <p className="mb-5 mt-2 select-all whitespace-nowrap text-2xl font-semibold tracking-wide">{shopConfig.swishNumber}</p>
          <CopySwish number={shopConfig.swishNumber} />
          <p className="text-sm leading-6 text-muted">Betalningen bekräftas i Swish. Den här sidan registrerar ingen order eller betalning.</p>
        </section>
      </div>
      <section aria-labelledby="help-heading" className="mt-12 border-t border-line pt-8">
        <h2 id="help-heading" className="text-xl font-semibold">Behöver du hjälp?</h2>
        <a className="nav-link mt-3 inline-flex min-h-12 items-center break-all" href={`mailto:${shopConfig.email}`}>{shopConfig.email}</a>
      </section>
    </main>
    <SiteFooter />
  </>;
}
