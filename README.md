# IW nära Skönsmon

Lokalt webbprojekt på skrivbordet, skapat med create-next-app 16.3.4.

## Verktyg

Node.js 24.19.0 (LTS), npm 11.17.0 och pnpm 11.19.0.
Node-versionen anges i .node-version och engines, pnpm i packageManager.
Verktygen ligger i `%LOCALAPPDATA%\Programs\IW-dev\node-v24.19.0-win-x64`
och mappen har lagts till i användarens PATH. Öppna en ny PowerShell efter installationen.
Om en redan öppen terminal saknar verktygen kan dess PATH uppdateras så här:

```powershell
$env:Path = "$env:LOCALAPPDATA\Programs\IW-dev\node-v24.19.0-win-x64;$env:Path"
```

## Starta och stoppa

```powershell
cd "$([Environment]::GetFolderPath('Desktop'))\iwnara-skonsmon"
pnpm install --frozen-lockfile
pnpm dev
```

Öppna http://127.0.0.1:3000. Stoppa med Ctrl+C i terminalen som kör servern.
Servern lyssnar endast lokalt. Om porten är upptagen visar Next en annan port.

## Kontroller och produktion

```powershell
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

Stoppa utvecklingsservern innan pnpm start använder samma port.
Lint kör ESLint separat. Typecheck kör next typegen före tsc, även efter ren installation.
Build skapar produktionsbygget, start kör det. Alla kommandon körs från roten.

## Redigera

Webbappen ligger i apps/web. Redigera gymuppgifter i lib/site-config.ts,
sidans innehåll i app/page.tsx och designvariabler i app/globals.css.
Struktur och konventioner finns i AGENTS.md.

Fyll i bekräftad gympresentation, utrustning/tjänster, medlemsalternativ,
priser, medlemsvillkor, besöksadress, öppettider, telefon och e-post.
Kontaktuppgifterna är platshållare, inga formulär eller bokningsflöden finns.
Inga externa konton eller API-nycklar behövs. Vid framtida behov används
apps/web/.env.local med typad validering. Miljöfiler ignoreras av Git.

## Vercel (förberett, inte publicerat)

Välj Next.js och ange **Root Directory: apps/web**. Node-version: 24.x.
Aktivera tillgång till filer utanför Root Directory för workspace-roten och låsfilen.
Install command: `cd ../.. && pnpm install --frozen-lockfile`.
Build command: `pnpm build`. Behåll Next.js standard för output directory.
Projektet använder en gemensam pnpm-lock.yaml i roten.
Inga externa konton, repon eller driftsättningar har skapats.

## Verifiering 2026-09-09

- Lokal Windows 11 Pro x64, PowerShell 7.6.5. Skrivbordet kontrollerat via Windows kända mappar och register.
- Node 24.19.0, npm 11.17.0, pnpm 11.19.0 verifierade även med användarens ordinarie PATH.
- Next 16.3.4, React/React DOM 19.2.8, TypeScript 5.9.3, Tailwind 4.3.3.
- pnpm install --frozen-lockfile: godkänd.
- pnpm lint, pnpm typecheck och pnpm build: godkända.
- pnpm dev på 127.0.0.1:3000: HTTP 200.
- pnpm start på tillfällig port 3001: HTTP 200, testservern stoppad efter kontrollen.
- Webbläsare: datorbredd 1440 och mobilbredd 390, ingen horisontell överströmning.
- Navigationslänkar, Enter-aktivering och hoppa-till-innehåll med korrekt fokus kontrollerade. Inga registrerade konsolfel.
- ESLint 9.39.5 är markerad deprecated av utgivaren men behålls för kompatibilitet: Nexts eslint-plugin-react stöder ännu inte ESLint 10 i sitt peer-intervall.
- unrs-resolvers installationsskript granskades och godkändes uttryckligen i pnpm-workspace.yaml. Övriga installationsskydd behålls.
- Git 2.53.0.windows.3 finns i Codex-miljön. Ingen separat global Git-installation eller fjärranslutning skapades.

Officiella källor: [Node LTS](https://nodejs.org/en/about/previous-releases),
[pnpm-installation](https://pnpm.io/installation),
[Next-installation](https://nextjs.org/docs/app/getting-started/installation).
Versionsnummer verifierades även direkt i det officiella npm-registret.

## Första designförslaget 2026-09-11

Startsidan / är nu ett anläggningsval. /sorberge och /skonsmon har egna sidor.
Gemensam mörk design, Montserrat och logotyp utgår från den befintliga iwnara.se.
Redigera båda anläggningarna i apps/web/lib/site-config.ts.
Bilder och källanteckningar finns i apps/web/public/brand.
Sörberges bild och uppgifter används bara med rätt anläggningsanknytning.
Skönsmon har platshållare för bilder, priser, adress, öppettider och kontakt.
Detta är ett lokalt designförslag; domän, köpflöden och den publika webbplatsen har inte ändrats.

## Bilder, innehåll och lokal SEO – 2026-09-12

- /skonsmon: de två första användarbilderna (interiör och entré). Fridhemsgatan 71, Sundsvall. Dygnet runt.
- /sorberge: de tre övriga användarbilderna (fasad, kondition och styrkeutrustning).
- Originalbilderna ligger i apps/web/public/facilities. Gallerierna visar hela bilden och länkar till fullstorlek. Next.js levererar anpassade bildstorlekar.
- Alla tre telefonnummer finns på båda anläggningarna, med klickbara tel-länkar. Befintlig info@iwnara.se ligger kvar för Sörberge; e-post för Skönsmon är inte bekräftad.
- Texterna beskriver appaccess, personlig hjälp, utbildade PT:er inom träning/kost, gratis provpass, maskinvisning och individuellt träningsprogram.
- Prisfilosofin beskrivs som ambition, utan ett obevisat löfte om marknadens lägsta pris.
- Separata sidtitlar, beskrivningar, canonical-URL:er, bildtexter, alt-texter och ExerciseGym-data finns per anläggning, tillsammans med sitemap.xml och robots.txt.
- Lokalt och i förhandsvisningar är indexering avstängd. Vid ett Vercel-produktionsbygge (VERCEL_ENV=production) tillåts indexering. Vid annan hosting ska motsvarande byggmiljö konfigureras före lansering.
- Canonical och sitemap är för den planerade domänen https://www.iwnara.se. Ingenting har publicerats eller skickats till Google.

### Inför lansering

Verifiera priser, villkor och saknade Skönsmon-priser/e-post/postnummer.
Inventera befintliga URL:er på den gamla webbplatsen och förbered riktade 301-omdirigeringar före domänbytet.
Lägg rätt adress, telefon, öppettider och webbplatslänk i respektive Google Business Profile. Detta är inte gjort här.
Skicka webbplatskartan i Search Console efter publicering och följ indexering och sökresultat över tid.
Ingen sökplacering kan garanteras. Lokal ranking beror också på avstånd, relevans och hur välkänt företaget är.
Källor: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
https://developers.google.com/search/docs/appearance/structured-data/local-business
https://support.google.com/business/answer/7091
