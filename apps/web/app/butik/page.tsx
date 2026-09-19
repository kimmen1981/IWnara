import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { products, shopConfig } from "@/lib/shop-config";
import { pageUrl } from "@/lib/seo";
import { SwishPayment } from "./swish-payment";
import { ProductIllustration } from "./product-illustration";

export const metadata: Metadata = {
  title: "Butik – handla på gymmet | IW nära",
  description: "Se produkter och priser i gymmet. Välj ditt tillskott och betala enkelt med Swish till IW nära.",
  alternates: { canonical: pageUrl("/butik") },
};

export default function ShopPage() {
  return <>
    <a className="skip-link" href="#main">Hoppa till innehållet</a>
    <SiteHeader />
    <main id="main" tabIndex={-1} className="page-width py-8 sm:py-14">
      <div className="max-w-2xl">
        <p className="eyebrow text-muted">Handla på gymmet</p>
        <h1 className="metal-text mt-3 text-4xl font-semibold sm:text-6xl">Butiken på IW nära</h1>
        <p className="body-copy mt-4">Välj din produkt. Swisha. Klart.</p>
        <p className="mt-2 text-sm leading-6 text-muted">Ta din vara på plats och betala med knappen nedan.</p>
      </div>
      <section aria-labelledby="products-heading" className="mt-8 sm:mt-10">
        <div className="flex items-center justify-between gap-4 border-t border-line pt-6">
          <h2 id="products-heading" className="text-xl font-semibold">Produkter & priser</h2>
          <span className="text-xs text-muted">{products.length} produkter</span>
        </div>
        <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {products.map((product, index) => <li key={product.name} className="membership-card flex min-w-0 flex-col">
            {product.image ? <div className="mb-5 rounded-md bg-[#1b201f]"><Image src={product.image} alt={product.name} width={480} height={480} sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw" priority={index === 0} className="h-48 w-full rounded-md object-contain sm:h-56" /></div> : <ProductIllustration kind={product.illustration} />}
            {product.imageNote && <p className="-mt-3 mb-4 text-xs text-muted">{product.imageNote}</p>}
            <h3 className="text-xl font-semibold leading-snug">{product.name}</h3>
            {product.subtitle && <p className="mt-1 text-sm font-medium text-muted">{product.subtitle}</p>}
            <p className="mt-3 text-sm leading-6 text-muted">{product.description}</p>
            <p className="mt-auto pt-5 text-3xl font-semibold tracking-tight">{product.price} <span className="text-lg font-medium text-muted">kr</span></p>
            <SwishPayment product={product} />
          </li>)}
        </ul>
      </section>
      <section aria-labelledby="help-heading" className="mt-10 border-t border-line pt-6">
        <h2 id="help-heading" className="text-lg font-semibold">Behöver du hjälp?</h2>
        <p className="mt-2 text-sm leading-6 text-muted">Swish: <span className="select-all whitespace-nowrap text-foreground">{shopConfig.swishNumber}</span>. Betalningen bekräftas i Swish.</p>
        <a className="nav-link mt-2 inline-flex min-h-12 items-center break-all text-sm" href={`mailto:${shopConfig.email}`}>{shopConfig.email}</a>
        <details className="mt-6 rounded-lg border border-line p-5"><summary className="flex min-h-12 cursor-pointer items-center font-medium">QR-kod till butiken</summary><div className="mt-4"><Image src="/butik/qr-butik.svg" width={200} height={200} alt="QR-kod till IW näras butik på iwnara-nine.vercel.app/butik" unoptimized /><p className="mt-3 text-sm leading-6 text-muted">Spara eller skriv ut koden för gymmet.</p><a className="button mt-4" href="/butik/qr-butik.svg" download>Ladda ner QR-koden</a></div></details>
      </section>
    </main>
    <SiteFooter />
  </>;
}
