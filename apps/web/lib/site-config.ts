export type GymPhoto = { src: string; alt: string; caption: string; width: number; height: number };
export type Facility = {
  slug: string; name: string; area: string; title: string; description: string;
  intro: string; about: string; openingNotice?: string; openingLink?: { label: string; href: string }; address: string; street: string; postalCode?: string;
  hours: string; opens: string; closes: string; email?: string; phones: readonly string[];
  photos: readonly GymPhoto[];
  memberships: readonly { name: string; price: string; detail: string }[];
};
export const siteConfig = {
  phones: ["070-753 92 39", "076-779 21 21", "072-317 21 62"],
  contacts: [
    { name: "Lars", role: "Ägare", phone: "070-753 92 39" },
    { name: "Stefan", role: "Ägare", phone: "076-779 21 21" },
    { name: "Kim", role: "Driftansvarig", phone: "072-317 21 62" },
  ],
  email: "info@iwnara.se",
  name: "IW nära", url: "https://www.iwnara.se",
  title: "Gym i Timrå & Sundsvall – Sörberge & Skönsmon | IW nära",
  description: "Personliga gym i Sörberge, Timrå och Skönsmon, Sundsvall. Träna med appaccess, få hjälp med träning och kost och prova ett träningspass gratis.",
  navigation: [{ label: "Om gymmet", href: "#om-gymmet" }, { label: "Bilder", href: "#bilder" }, { label: "Prova gratis", href: "#prova-gratis" }, { label: "Medlemskap", href: "#medlemskap" }, { label: "Kontakt", href: "#kontakt" }],
  support: "Hos oss betyder obemannat att du låser upp med din app och tränar på egen hand. Den personliga kontakten finns ändå nära. Vi lär känna våra medlemmar och finns ett samtal bort när du behöver hjälp med ett träningsupplägg, har frågor om kost eller stöter på något som krånglar. Du ska känna att du har någon att vända dig till.",
  team: "Vår personal är utbildade personliga tränare med kunskap inom både träning och kost. Vi utgår från dig, din erfarenhet och dina mål – oavsett om du tar ditt första steg in på ett gym eller vill utveckla träningen du redan gör.",
  trial: "Funderar du på att bli medlem? Välkommen att prova ett träningspass gratis. Vi visar dig gymmet och dess utrustning och hjälper dig att komma igång med ett träningsschema och ett individuellt program som passar just dig. Hör av dig så kommer vi överens om en tid för ditt besök och din genomgång.",
  philosophy: "Vår filosofi är enkel: vi vill hålla priserna så låga som möjligt och ge dig mycket gym för pengarna. Därför handplockar vi den utrustning vi tycker är bäst från olika märken och lägger omtanke på rena, fräscha och mysiga lokaler. Lägg till personlig hjälp med din träning, så har du det vi vill att IW nära ska stå för. Kom och prova – vi vill att du ska känna skillnaden själv.",
} as const;
export const facilities: readonly Facility[] = [
  {
    phones: siteConfig.phones, slug: "sorberge", name: "Sörberge", area: "Timrå",
    title: "Gym i Sörberge, Timrå – prova gratis | IW nära",
    description: "Träna på IW nära i Sörberge, Timrå. Öppet 06–23 alla dagar, appaccess och personlig hjälp med träning och kost. Prova gratis på Berglundavägen 37.",
    intro: "Ett personligt gym i Sörberge, Timrå, där du tränar med appaccess alla dagar 06–23. Handplockad utrustning, en mysig miljö och hjälp som utgår från dig.",
    about: "Letar du efter ett gym i Timrå där du kan träna självständigt och ändå känna dig sedd? På Berglundavägen 37 i Sörberge möts du av en ombonad träningsmiljö med styrkemaskiner, fria vikter och konditionsutrustning. Du kommer in med din app och väljer själv när under öppettiderna du vill träna. Vi hjälper dig att hitta ett upplägg som fungerar i din vardag.",
    address: "Berglundavägen 37, 861 42 Timrå", street: "Berglundavägen 37", postalCode: "861 42",
    hours: "06:00–23:00, alla dagar", opens: "06:00", closes: "23:00", email: "info@iwnara.se",
    photos: [
      { src: "/facilities/sorberge-exterior.jpeg", alt: "IW nära Sörberge i Timrå med gymmets flagga och fönster mot gatan", caption: "Välkommen till IW nära Sörberge", width: 895, height: 1218 },
      { src: "/facilities/sorberge-cardio.jpeg", alt: "Löpband och motionscyklar på IW nära Sörberge", caption: "Kondition i en ombonad miljö", width: 3024, height: 4032 },
      { src: "/facilities/sorberge-strength.jpeg", alt: "Styrkemaskiner och hantlar på gymmet IW nära Sörberge i Timrå", caption: "Handplockad utrustning för din styrketräning", width: 3024, height: 4032 },
    ],
    memberships: [{ name: "Vuxen", price: "389 kr/mån", detail: "Obundet · 1 månads uppsägningstid" }, { name: "Student / Pensionär / Ungdom", price: "299 kr/mån", detail: "Obundet · 1 månads uppsägningstid" }, { name: "Engångspass", price: "99 kr/pass", detail: "Tillgång hela dagen" }],
  },
  {
    phones: siteConfig.phones, slug: "skonsmon", name: "Skönsmon", area: "Sundsvall",
    title: "Nytt gym i Skönsmon, Sundsvall – välkommen i oktober | IW nära",
    description: "Vi bygger IW nära Skönsmon på Fridhemsgatan 71 i Sundsvall. Från mitten av oktober 2026: besök och provträning alla vardagar. Beräknas klart före årsskiftet.",
    intro: "Något nytt växer fram i Skönsmon. Just nu bygger vi för fullt på Fridhemsgatan 71 – ett personligt gym med handplockad utrustning och en varm miljö där du ska känna dig hemma.",
    openingNotice: "Vi bygger för fullt och vill gärna visa vad som växer fram på Fridhemsgatan 71. Kom och träffa oss, följ bygget och anmäl ditt intresse för medlemskap inför öppningen. Vi berättar gärna om planerna, visar maskinerna, öppningsdatum och hur du kan bli medlem när gymmet öppnar. Under tiden kan du lösa medlemskap och träna på vår anläggning i centrum – Iron Works på Södra Järnvägsgatan 13.",
    openingLink: { label: "Besök Iron Works i centrum", href: "https://www.ironworksgym.se/" },
    about: "På IW nära Skönsmon får du plats för träning på dina egna tider. När gymmet på Fridhemsgatan 71 i Sundsvall är färdigt planerar vi för öppet dygnet runt, så att du kan välja en tid som passar jobbet, familjen och resten av livet. Här skapar vi en varm, ombonad miljö med handplockade maskiner, hantlar och skivstänger. Vi vill att du ska känna dig hemma från ditt första besök och trygg med hur du tränar.",
    address: "Fridhemsgatan 71, Sundsvall", street: "Fridhemsgatan 71",
    hours: "Öppna dörrar alla vardagar från mitten av oktober 2026. Kontakta oss för besökstider.", opens: "00:00", closes: "23:59",
    photos: [
      { src: "/facilities/skonsmon-interior.jpeg", alt: "Styrkemaskiner och varm belysning inne på IW nära Skönsmon i Sundsvall", caption: "Träningsmiljön på IW nära Skönsmon", width: 1086, height: 1448 },
      { src: "/facilities/skonsmon-exterior.jpeg", alt: "Entrén till IW nära Skönsmon på Fridhemsgatan 71 i Sundsvall", caption: "Här hittar du oss – Fridhemsgatan 71", width: 1567, height: 1004 },
    ],
    memberships: [{ name: "Medlemskap i Skönsmon", price: "Priser kommer", detail: "Medlemsalternativ och villkor publiceras här. Du som är intresserad får prova ett träningspass gratis." }],
  },
];
