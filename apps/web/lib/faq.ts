import type { Facility } from './site-config';

export type FaqItem = { id: string; question: string; answer: string; link?: { label: string; href: string } };
export type FaqGroup = { id: string; title: string; items: FaqItem[] };

const contact = { label: 'Kontakta oss', href: '#kontakt' };
const shop = { label: 'Bli medlem i Gym Control', href: 'https://www.gymcontrol.se/global/kundinloggning/v2/webshop.php?action=home&uid=9452' };

export function facilityFaq(f: Facility): FaqGroup[] {
  const pending = Boolean(f.openingNotice);
  return [
    { id: 'bli-medlem', title: 'Bli medlem', items: [
      { id: 'borja', question: `Hur blir jag medlem på IW nära ${f.name}?`, answer: pending ? 'Skönsmon är under uppbyggnad. Kontakta oss så berättar vi mer inför öppningen.' : 'Du registrerar dig i Gym Controls webbshop. Vill du ha hjälp är du välkommen att kontakta oss.', link: pending ? contact : shop },
      { id: 'prova', question: 'Kan jag prova gymmet gratis?', answer: `Ja. Du får ett gratis prova-på-pass och hjälp att komma igång. ${pending ? 'Kontakta oss för att stämma av en tid.' : 'Vi visar gymmet och utrustningen och hjälper dig att hitta ett upplägg som passar dig.'}`, link: { label: 'Kontakta oss', href: '#kontakt' } },
      { id: 'alder', question: 'Vilken åldersgräns gäller?', answer: 'Åldersgränsen är 18 år. Är du 15–18 år kan du kontakta oss för en individuell bedömning av om du kan teckna medlemskap och träna på våra anläggningar. Vi är restriktiva med medlemskap för den åldersgruppen.' },
    ] },
    { id: 'medlemskap-betalning', title: 'Medlemskap & betalning', items: [
      { id: 'betalning', question: 'Hur kan jag betala?', answer: 'Du kan betala med kort, Swish, faktura eller kontant. Ingen startavgift eller anslutningsavgift tillkommer.' },
      { id: 'bindning', question: 'Har ni bindningstid?', answer: 'Vi erbjuder autogiro med en månads uppsägningstid, engångspass och 10-klipp. Ett 10-klipp gäller i ett år.' },
      { id: 'pausa', question: 'Kan jag pausa medlemskapet?', answer: 'Ja, vid medicinska åkommor. Läkarintyg krävs och ingen avgift tas ut.' },
      { id: 'flera-gym', question: 'Gäller medlemskapet på alla anläggningar?', answer: 'Ja. Ett medlemskap ger tillgång till alla tre anläggningarna.' },
    ] },
    { id: 'tilltrade-regler', title: 'Tillträde & regler', items: [
      { id: 'appen', question: 'Hur kommer jag in på gymmet?', answer: 'Ladda ner Gym Control där du hittar appar. Fyll i din e-postadress och använd födelsedag och födelsemånad som lösenord, med nolla framför ensiffriga tal, till exempel 19/04. Fysiska taggar kan fås efter personlig kontakt och förfrågan.' },
      { id: 'accessproblem', question: 'Vad gör jag om appen eller taggen inte fungerar?', answer: 'Kontakta oss personligen så hjälper vi dig med accessen.', link: contact },
      { id: 'regler', question: 'Vilka regler gäller på gymmet?', answer: 'Använd inneskor och träna med sunt förnuft. Visa hänsyn och lämna utrustningen i gott skick.' },
      { id: 'van', question: 'Kan jag ta med en vän?', answer: 'Ja. Vännen måste registrera sig själv och använda ett gratis prova-på-pass.' },
    ] },
    { id: 'praktiskt', title: 'Praktiska frågor', items: [
      { id: 'omkladning', question: 'Finns dusch, omklädningsrum och skåp?', answer: 'Ja, på alla anläggningar. Ta med eget lås till skåpet. Handdukar finns att låna på IW nära Sörberge och Skönsmon; lägg dem i tvättkorgen efteråt.' },
      { id: 'parkering', question: 'Finns det parkering?', answer: pending ? 'Ja, i Skönsmon finns parkering mot en mindre avgift. Kontrollera aktuell avgift i Parkster för Fridhemsgatan 71, Skönsmonhuset.' : 'Ja, parkeringen vid IW nära Sörberge är gratis.' },
    ] },
    { id: 'friskvard-foretag', title: 'Friskvård & företag', items: [
      { id: 'friskvard', question: 'Kan jag använda friskvårdsbidrag?', answer: 'Ja. Vi är anslutna till de stora friskvårdsportalerna. Enkelt är att köpa medlemskapet, få kvittot och lämna det till din arbetsgivare.' },
      { id: 'foretag', question: 'Erbjuder ni företagsrabatter?', answer: 'Ja. Kontakta oss så hittar vi en individuell lösning för företaget.', link: contact },
    ] },
  ];
}
