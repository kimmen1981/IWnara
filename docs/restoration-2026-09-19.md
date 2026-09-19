# Återställning 2026-09-19

## Inventering och val

GitHub main 2b88c27653c0336279795e599c79a55360a7f301 jämfördes med lokal 8d2add1. Historiken var förgrenad: lokalt fanns den utökade FAQ-komponenten; GitHub hade nya namngivna kontaktuppgifter och beslut i docs/iw-nara-changes-2026-09-18.md. Båda bevarades i merge 52a24c4.

Genomlästa tidigare uppgifter: medlemsregistrering, uppföljningen med neongrön design, butik och produktvarianter, FAQ inklusive ägarens faktakompletteringar samt de senaste publiceringsförsöken. Det separata bokning-projektets design och val återanvänds i Next.js. Dess Cloudflare-databas och personalinloggning flyttas inte till en inkompatibel Vercel-miljö.

- Bevarat: logotyp, metallvita 3D-knappar, bilder, mörk design, SEO, namngivna kontakter, alla sju produkter och Swish-dialogerna.
- Återställt: de 27 tidigare FAQ-ämnena, fördelade i 31 frågor för Sörberge och 33 för Skönsmon med kompletteringar om PT, program, butik, kontakt och öppning. Den senaste instruktionen om fylligare svar ersätter tidigare beslut om 15 korta frågor.
- Återställt medlemskap: /medlemskap med #80ff00 från den godkända bokningssidan. Självregistrering först, introduktion och registreringshjälp med kontaktformulär, egen provträning direkt till GymControl. Skönsmon visar endast förbokning.
- GymControl: den senare ägarangivna och redan använda stabila länken /global/kundinloggning/v2/webshop.php?uid=9452&action=home används. Den äldre sid-parametern återanvänds inte. Inget stöd för artikel-ID, förifyllning eller köpbekräftelse har verifierats; kunden väljer samma medlemsalternativ i GymControl.
- Skönsmon: november 2026, under konstruktion, 299 kr/mån vid förbokning och dygnet runt efter öppning. Inga erbjudanden om besök/visning/provträning innan öppning. Ingen exakt öppningsdag har hittats.
- Sörberges bekräftade separata priser 389/299 kr och 99 kr/pass bevaras. Det generella 299-påståendet i utkastet 18 september överförs inte till vuxenpriset i Sörberge; senaste uppdraget anger 299 för Skönsmons förbokning.
- /faq samlar FAQ med länk till Skönsmons särskilda frågor. /integritet beskriver kontaktformulärets hantering.
- Butikens QR-kod pekar till det verifierade Vercel-projektets nuvarande domän https://iwnara-nine.vercel.app/butik. Byt mål och generera ny QR om produktionsdomänen ändras.
- Produkttexter för ashwagandha, NAD och Rewind har gjorts försiktigare utan medicinska effektlöften. NAD 30 kapslar behåller den tidigare märkta illustrationen; Whey-bilden anger att smak kan variera.

## E-postanslutning

POST /api/interest skickar endast till info@iwnara.se. Skönsmons ämne är exakt `bokning av medlemskap i Skönsmon`. Bekräftelsen visas först efter godkänt svar med meddelande-ID från e-postleverantören.

Konfigurera `RESEND_API_KEY` och `MAIL_FROM` (verifierad avsändare) i Vercel för preview och production och bygg om. Inga befintliga fungerande e-postuppgifter har hittats. Tills dess erbjuder formuläret ett förifyllt mejl med namn och nummer och förklarar att kunden måste skicka det i sin e-postapp. Det påstår inte att anmälan redan är mottagen.

API:t validerar format, längder, ursprung, innehållstyp och maximal kroppsstorlek. Timeout, idempotens och enkel begränsning per instans ingår. Begränsningen i minnet är ingen global spärr över flera serverless-instanser. Personuppgifter loggas inte av applikationen.

Dokumentation: https://resend.com/docs/api-reference/emails/send-email

## Verifiering

Kör från repo-roten:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `node scripts/verify-interest.cjs` (mockad e-post, inga mejl skickas)
- `node scripts/verify-browser.cjs` mot en startad server på 127.0.0.1:3012. Kräver Playwright; `PLAYWRIGHT_MODULE` kan ange en befintlig installation och `CHROME_PATH` en installerad Chromium. `TEST_URL` kan peka på en publicerad testmiljö.

Webbläsartestet kontrollerar alla sju sidor vid 375, 430 och 1440 px, sidöverströmning, ankarmål, unika ID:n och CTA-höjd minst 48 px. Dessutom FAQ med tangentbord, alla medlemsflöden, förbokningens två fält och sanningsenliga e-postreservflöde samt samtliga sju Swish-mottagare/belopp/meddelanden, kopiering och Escape-stängning. Skärmbilder och JSON sparas i ignorerad verification-mapp. Själva Swish/BankID-betalningen kräver en fysisk telefon och har inte genomförts.

Vercel CLI:s befintliga token gav HTTP 403 med `invalidToken: true`. Inloggad Vercel-dashboard kunde däremot nås. Där verifierades projekt-ID prj_KsyOOppBBcPFSpYPiANZamXDVKLE, projektnamn iw och koppling till kimmen1981/IWnara.

Slutlig lokal kontroll: alla 21 sid-/viewportkombinationer godkända, noll webbläsarfel, API-regressioner godkända. Vercel-dashboarden visar No Environment Variables Added.


Publicering: återställningen pushades till main och Vercel markerade produktionsbygget Ready. Den primära publika domänen är https://iwnara-nine.vercel.app; den separata iw-iw-nara-adressen kräver Vercel-inloggning. Alla 21 browserkontroller och samtliga klickflöden klarades även utan inloggning på den publika domänen, med noll webbläsarfel. Butikens QR-kod korrigerades till denna publika adress. www.iwnara.se visar Verification Required i Vercel och har inte ändrats under arbetet.
