"use client";
import { useState } from "react";
import Link from "next/link";
import { facilities } from "@/lib/site-config";
import { gymControlUrl } from "@/lib/membership";
import { ContactRequest } from "./contact-request";

const choices = [
  { value: "self", title: "Jag vill bli medlem och registrerar mig själv", detail: "Välj medlemskap och fortsätt till GymControl." },
  { value: "intro", title: "Gratis träning med introduktion", detail: "Vi kontaktar dig och hittar en tid tillsammans i Sörberge." },
  { value: "solo", title: "Gratis provträning på egen hand", detail: "Registrera ditt gratis provpass i GymControl för Sörberge." },
  { value: "member", title: "Jag vill ha hjälp att registrera medlemskap", detail: "Vi kontaktar dig och hjälper dig att komma igång." },
];
export function MembershipFlow({ emailEnabled }: { emailEnabled: boolean }) {
  const [intent, setIntent] = useState("self");
  const [plan, setPlan] = useState(0);
  const [facility, setFacility] = useState("sorberge");
  return <div id="starta" className="membership-flow">
    <h2 className="text-3xl font-semibold">Hur vill du börja?</h2>
    <fieldset className="mt-8"><legend>1. Välj gym</legend><div className="grid grid-cols-2 gap-3">{facilities.map(f => <label className="flow-choice" key={f.slug}><input type="radio" name="facility" value={f.slug} checked={facility === f.slug} onChange={() => setFacility(f.slug)} /><span><strong>{f.name}</strong><small>{f.slug === "skonsmon" ? "Öppnar november 2026" : "Öppet 06–23"}</small></span></label>)}</div></fieldset>
    {facility === "skonsmon" ? <div className="mt-8"><h3 className="text-2xl font-semibold">Var med från starten.</h3><p className="body-copy mt-4">Skönsmon är under konstruktion. Förboka för 299 kr/mån, så kontaktar vi dig inför öppningen i november 2026. Besök och provträning blir möjliga först efter öppningen.</p><Link className="button button-lime mt-6 w-full" href="/skonsmon#forboka">Förboka medlemskap – 299 kr/mån</Link></div> : <>
      <fieldset className="mt-8"><legend>2. Välj din start i Sörberge</legend><div className="grid gap-3">{choices.map(choice => <label key={choice.value} className="flow-choice"><input type="radio" name="intent" value={choice.value} checked={intent === choice.value} onChange={() => setIntent(choice.value)} /><span><strong>{choice.title}</strong><small>{choice.detail}</small></span></label>)}</div></fieldset>
      {intent === "self" && <fieldset className="mt-8"><legend>3. Välj medlemskap</legend><div className="grid gap-3">{facilities[0].memberships.map((m, i) => <label className="flow-choice" key={m.name}><input type="radio" name="plan" checked={plan === i} onChange={() => setPlan(i)} /><span><strong>{m.name} · {m.price}</strong><small>{m.detail}</small></span></label>)}</div></fieldset>}
      {intent === "self" || intent === "solo" ? <div className="mt-8 border-t border-line pt-6"><p className="text-sm leading-7 text-muted">{intent === "self" ? `Ditt val: ${facilities[0].memberships[plan].name}. Välj samma alternativ i GymControl, där du ser villkoren och slutför köpet.` : 'Välj ”PROVA PÅ PASS” i GymControl och slutför registreringen. Kontakta oss före besöket om du behöver hjälp med tillträdet.'}</p><a href={gymControlUrl} className="button button-lime mt-5 w-full">Fortsätt till GymControl ↗</a></div> : <div className="mt-8 border-t border-line pt-6"><p className="mb-5 text-sm leading-7 text-muted">{intent === "intro" ? "Vi skräddarsyr en tid tillsammans. Vänta på vår bekräftelse innan du besöker gymmet." : "Vi hjälper dig att välja och registrera medlemskap. Inget medlemsköp görs i detta formulär."}</p><ContactRequest key={intent} purpose={intent === "intro" ? "intro" : "member"} emailEnabled={emailEnabled} /></div>}
    </>}
  </div>;
}
