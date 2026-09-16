# FAQ – underlag och redaktionella beslut

Granskad 2026-09-16. FAQ finns på /sorberge#faq och /skonsmon#faq, med 15 korta frågor per anläggning i fem kategorier. Namnet IW nära följer projektet och den publika hemsidan.

## Faktakällor

- apps/web/lib/site-config.ts samt startsida, anläggningssidor, butik, SEO, komponenter och styles genomlästa. Befintligt bokningsprojekt och tidigare innehållsskript kontrollerade för ytterligare medlemsinformation. Historiska README-uppgifter om Skönsmons öppettider ersätts av aktuell site-config: under uppbyggnad, besök från mitten av oktober 2026, beräknat färdigt före årsskiftet, därefter planerat dygnet runt.
- https://www.iwnara.se/ bekräftar Sörberge: 389/299 kr per månad, obundet, en månads uppsägning, autogiro, ingen anslutningsavgift, 99 kr engångspass, 699 kr 10-kort, 4 668 kr vuxenårskort.
- https://www.iwnara.se/faq bekräftar för Sörberge: duschar, dam-/herravdelning, skåp, parkering samt uppsägning via konto eller kontakt. Inga löften om gratis parkering eller medföljande lås.
- Publika /om-oss, /utrustning och /kontakta-oss gick inte att hämta med webbverktyget. Motsvarande innehåll i projektet granskades. Gym Control-länken finns både i befintligt bokningsprojekt och på publika hemsidan; målsidan kunde inte hämtas med webbverktyget. Inget medlemsköp genomfördes.
- Den äldre publika FAQ:n nämner även 12 månaders bindning till lägre pris. Eftersom detta saknar aktuellt pris och inte finns i projektets medlemsalternativ har detta inte återanvänts som ett erbjudande. Årskort likställs inte med detta erbjudande.
- Sörberges priser/villkor/faciliteter förs inte över till Skönsmon. Kontaktvägar återanvänds från projektet.

## Konkurrentresearch – endast ämnen och struktur

- Nordic Wellness: https://faq.nordicwellness.se/ – kategorier, ny medlem, betalningsproblem, frysning och åldersgränser.
- STC: https://www.stc.se/faq och https://www.stc.se/vanliga-fragor-om-medlemskap-hos-stc – medlemsvillkor och supportvägar.
- Fitness24Seven: https://se.fitness24seven.com/medlemskap/mobil-inpassering/ – behov av tydliga instruktioner för app och accessproblem.
- SATS: https://www.sats.se/kundservice – betalning, medlemskap och kvitton.
- Friskis: https://www.friskis.com/sv-se/syd/fragor-och-svar?facilityId=6160 – obemannat tillträde, träningskort och trivselregler.
- EGO: https://ego.nu/fragor-svar/ – lokala praktiska frågor, ålder och förvaring.
- Lynx Gym: https://www.lynxgym.se/vanliga-fragor/ – introduktion, omklädning och praktiska frågor på mindre gym.

Samtliga svar är nyskrivna utifrån IW näras uppgifter. Konkurrenternas villkor, priser och formuleringar har inte överförts.

## UX och SEO

Native details/summary ger tangentbordsstyrning och fungerar utan JavaScript. Flera svar kan vara öppna samtidigt. Kategorilänkar ger snabb åtkomst utan att dölja innehåll. Sök/filter/visa alla har utelämnats för att hålla 27 frågor enkla att navigera. Klickytor minst 44 px, radavstånd 1,6–1,8 och befintliga färger, typsnitt och knappar återanvänds. Endast pilen animeras; befintlig reduced-motion-regel stänger av övergången.

FAQPage-schema tillförs inte: https://developers.google.com/search/updates anger att FAQ rich results slutade visas 7 maj 2026 och att dokumentationen har tagits bort. Befintligt ExerciseGym-schema, metadata och canonical behålls. Alla frågor/svar finns i serverrenderad HTML.

## Uppgifter som fortfarande behöver bekräftas

Efter verksamhetens komplettering är den enda större saknade uppgiften i den nuvarande FAQ:n Skönsmons exakta priser och medlemsalternativ inför öppningen. Skönsmons öppettider är fortfarande planerade och beskrivs därför som planerade i texten.

Övriga tidigare frågetecken är nu bekräftade: 18-årsgräns, medicinsk paus med intyg utan avgift, Gym Control och aktivering, fysiska taggar efter personlig kontakt, inneskor och sunt förnuft, gästträning via eget prova-på-pass, tillgång till tre anläggningar, friskvårdsbidrag, företagsrabatter, betalningssätt, gratis parkering i Sörberge, avgiftsparkering i Skönsmon, omklädningsrum, dusch, skåp och lånevillkor för handdukar.


## Verifiering

- pnpm lint, pnpm typecheck och pnpm build: godkända.
- Båda anläggningssidorna granskade i webbläsare vid 1440 px och 390 px. Skönsmon även vid 320 px med samtliga 27 svar öppna: ingen horisontell överströmning i sida eller FAQ.
- Sörberge: prisfrågan öppnad med klick och stängd med Enter. Minsta uppmätta frågeklickyta 64 px.
- Alla interna ankarlänkar har mål på båda sidorna. Avslutande CTA verifierad till #kontakt. Gym Control är en befintlig extern adress, men dess funktion kunde inte verifieras via webbverktyget.
- Inga konsolfel registrerades i den kontrollerade Skönsmon-vyn.
- Webbplatsen är inte publicerad. Befintliga orelaterade ändringar i butiken har bevarats.
