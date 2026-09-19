"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { bookingConfirmation, bookingSubject } from "@/lib/membership";

export function ContactRequest({ purpose, emailEnabled }: { purpose: "skonsmon" | "intro" | "member"; emailEnabled: boolean }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "mail">("idle");
  const [error, setError] = useState("");
  const sending = useRef(false);
  const receipt = useRef<HTMLDivElement>(null);
  const requestId = useRef<string | null>(null);
  const subject = purpose === "skonsmon" ? bookingSubject : purpose === "intro" ? "Introduktion i Sörberge" : "Hjälp med medlemskap i Sörberge";
  const emailUrl = `mailto:info@iwnara.se?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Namn: ${name.trim()}\nMobilnummer: ${phone.trim()}`)}`;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    setError("");
    if (!emailEnabled) {
      setStatus("mail");
      window.location.href = emailUrl;
      return;
    }
    sending.current = true;
    setStatus("sending");
    requestId.current ??= crypto.randomUUID();
    try {
      const response = await fetch("/api/interest", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, phone, purpose, requestId: requestId.current }) });
      if (!response.ok) throw new Error("Din förfrågan kunde inte bekräftas. Försök igen eller skicka via e-post nedan.");
      setStatus("done");
      requestAnimationFrame(() => receipt.current?.focus());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Det gick inte att skicka just nu.");
      setStatus("idle");
    } finally { sending.current = false; }
  }

  if (status === "done") return <div ref={receipt} tabIndex={-1} role="status" className="request-success"><p>{purpose === "skonsmon" ? bookingConfirmation : "Tack! Vi har tagit emot din förfrågan. Vi kontaktar dig för att hitta en tid och hjälpa dig vidare."}</p><p className="mt-4 text-sm text-muted">Ingen betalning har gjorts och ingen besökstid är bokad ännu.</p></div>;
  return <form className="contact-request" onSubmit={submit}>
    <fieldset disabled={status === "sending"} className="grid min-w-0 gap-5 border-0 p-0">
      <legend className="sr-only">Dina kontaktuppgifter</legend>
      <label>Namn<input name="name" autoComplete="name" required minLength={2} maxLength={100} value={name} onChange={e => { setName(e.target.value); requestId.current = null; }} /></label>
      <label>Mobilnummer<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required pattern="[+0-9 \(\)\-]{7,25}" maxLength={25} value={phone} onChange={e => { setPhone(e.target.value); requestId.current = null; }} /></label>
      <p className="text-sm leading-6 text-muted">Vi använder ditt namn och nummer för att kontakta dig om {purpose === "skonsmon" ? "öppningen och ditt medlemskap i Skönsmon" : "din förfrågan i Sörberge"}. <Link className="underline underline-offset-4" href="/integritet">Så hanteras uppgifterna.</Link></p>
      {!emailEnabled && <p className="text-sm leading-6 text-muted">Fortsätt till din e-postapp och skicka det förifyllda mejlet till oss. Du betalar inget nu.</p>}
      <button type="submit" className="button button-lime w-full" disabled={status === "sending"}>{status === "sending" ? "Skickar…" : emailEnabled ? "Skicka intresseanmälan" : "Fortsätt till e-post"}</button>
    </fieldset>
    {status === "mail" && <p role="status" className="mt-5 text-sm leading-7">Skicka mejlet i din e-postapp för att slutföra anmälan. Om appen inte öppnades: <a href={emailUrl} className="underline">öppna mejlet igen</a> eller ring <a className="underline" href="tel:+46723172162">072-317 21 62</a>. Vi har ännu inte bekräftat att anmälan är mottagen.</p>}
    {error && <div role="alert" className="mt-5 text-sm leading-7"><p>{error}</p><a className="button mt-3" href={emailUrl}>Skicka via e-post</a></div>}
  </form>;
}
