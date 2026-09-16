"use client";

import { useId, useRef } from "react";
import { shopConfig, swishUrl, type ShopProduct } from "@/lib/shop-config";
import { CopySwish } from "./copy-swish";

export function SwishPayment({ product }: { product: ShopProduct }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const url = swishUrl(product);

  function openPayment() {
    // Always leave the manual payment details available: browsers cannot reliably
    // determine whether Swish is installed or whether a payment succeeded.
    dialog.current?.showModal();
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) {
      window.location.href = url;
    }
  }

  return <>
    <button type="button" className="button button-light mt-4 w-full gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-haspopup="dialog" aria-label={`Swisha ${product.price} kr för ${product.name}`} onClick={openPayment}>
      SWISHA {product.price} KR <span aria-hidden="true">↗</span>
    </button>
    <dialog ref={dialog} aria-labelledby={titleId} className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-xl border border-line bg-surface p-6 text-foreground shadow-2xl backdrop:bg-black/80" onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current?.close(); } }}>
      <form method="dialog" className="mb-5 flex justify-end"><button className="min-h-11 px-3 text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-white" autoFocus>Stäng ✕</button></form>
      <p className="eyebrow text-muted">Betala till IW nära</p>
      <h2 id={titleId} className="mt-3 text-3xl font-semibold">Swisha {product.price} kr</h2>
      <p className="mt-2 text-sm text-muted">{product.name}</p>
      <dl className="my-6 space-y-4 rounded-lg border border-line p-4">
        <div><dt className="text-sm text-muted">Swishnummer</dt><dd className="mt-1 select-all whitespace-nowrap text-2xl font-semibold tracking-wide">{shopConfig.swishNumber}</dd></div>
        <div><dt className="text-sm text-muted">Meddelande</dt><dd className="mt-1 select-all font-semibold">{product.message}</dd></div>
      </dl>
      <a className="button button-light mb-3 w-full" href={url}>Öppna Swish ↗</a>
      <CopySwish key={product.message} number={shopConfig.swishNumber} />
      <p className="text-sm leading-6 text-muted">Öppnas inte appen? Öppna Swish manuellt och fyll i uppgifterna ovan. Kontrollera mottagare och belopp innan du godkänner. Betalningen bekräftas i Swish.</p>
    </dialog>
  </>;
}
