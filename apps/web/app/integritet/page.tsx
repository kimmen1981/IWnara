import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { pageUrl } from "@/lib/seo";
export const metadata: Metadata = { title: "Dina kontaktuppgifter | IW nära", alternates: { canonical: pageUrl("/integritet") } };
export default function PrivacyPage() {
  return <><SiteHeader /><main id="main" className="page-width py-14"><div className="max-w-2xl"><h1 className="text-3xl font-semibold">Så använder vi dina kontaktuppgifter</h1><p className="body-copy mt-6">När du ber oss kontakta dig använder IW Nära ditt namn och mobilnummer för att svara på din förfrågan, planera en introduktion eller informera om medlemskap och öppningen i Skönsmon.</p><p className="body-copy mt-5">Uppgifterna skickas till info@iwnara.se. Om du fortsätter till din e-postapp skickas de först när du själv skickar mejlet. När direktinskickning är aktiverad används Resend för e-postleveransen. Formuläret registrerar inget medlemsköp och överför inga kontaktuppgifter till GymControl.</p><p className="body-copy mt-5">Vi använder uppgifterna för den kontakt du har bett om, inte för allmänna reklamutskick. Skicka inte hälsouppgifter eller andra känsliga uppgifter i formuläret. Vill du få hjälp med eller be oss radera din förfrågan, kontakta <a className="underline" href="mailto:info@iwnara.se">info@iwnara.se</a>.</p></div></main><SiteFooter /></>;
}
