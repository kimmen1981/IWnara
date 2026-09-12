# IW nära Skönsmon

pnpm-workspace med Next.js 16 App Router i apps/web. Använd pnpm från roten.

- app: sidor, metadata och gemensamma designvariabler.
- components: återanvändbara semantiska komponenter.
- lib/site-config.ts: typad, redigerbar gymdata.
- hooks, services, schemas: reserverade mappar; skapa bara implementationer vid behov.
- public: statiska filer.

TypeScript strict, React 19, Tailwind 4 och ESLint flat config med Next-regler.
Server Components som standard. Lägg endast till use client vid faktisk interaktivitet.
Använd semantisk HTML, tangentbordsnavigation och synliga fokusmarkeringar.
All gymdata ska vara bekräftad; behåll tydliga platshållare annars.
Inga hemligheter i koden. Eventuella framtida miljövariabler hör hemma i
apps/web/.env.local och ska valideras typat innan användning.
Kör pnpm lint, pnpm typecheck och pnpm build efter relevanta ändringar.
Behåll gemensam pnpm-lock.yaml i roten. Publicera inte utan instruktion.
