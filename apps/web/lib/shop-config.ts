export type ShopProduct = {
  name: string;
  price: number;
  description: string;
  subtitle?: string;
  message: string;
  illustration: "bottle" | "tub" | "pouch";
  image?: string;
  imageNote?: string;
};

export const shopConfig = {
  swishNumber: "123 594 67 44",
  email: "info@iwnara.se",
};

// Lägg till image med en lokal produktbild när bekräftade bilder finns.
export const products: readonly ShopProduct[] = [
  { name: "Ashwagandha Forte", price: 249, subtitle: "En kraftfullt tillskott för att optimera.", description: "Adaptogen med koncentrerat ashwagandha-extrakt som kan bidra till bättre stresshantering, lugn och återhämtning.", message: "Ashwagandha Forte", image: "/butik/ashwagandha.png", illustration: "bottle" },
  { name: "Kreatin Monohydrat – 500 g", price: 249, description: "Kreatin stödjer ökad styrka, explosivitet och prestationsförmåga vid högintensiv träning.", message: "Kreatin", image: "/butik/creatin-monohydrate.jpg", illustration: "tub" },
  { name: "Neuro Prime – B-vitaminkomplex", price: 199, subtitle: "Metylerade B-vitaminer", description: "Ett B-vitaminkomplex med metylerade former av B-vitaminer som stödjer normal energiomsättning och nervsystemets funktion.", message: "Neuro Prime", image: "/butik/neuroprime.png", illustration: "bottle" },
  { name: "Magnesium", price: 119, description: "Magnesium bidrar till normal muskelfunktion, nervsystemets funktion och minskad trötthet och utmattning.", message: "Magnesium", image: "/butik/magnesium-bisglycinate.png", illustration: "bottle" },
  { name: "NAD Plus", price: 299, subtitle: "30 kapslar", description: "Ett tillskott utvecklat för att stödja kroppens energiomsättning och de processer som är kopplade till cellernas energiproduktion.", message: "NAD Plus", illustration: "bottle" },
  { name: "Rewind Plus", price: 549, description: "Premiumformulering med sex utvalda longevity-ingredienser för energi, vitalitet, återhämtning och cellhälsa.", message: "Rewind Plus", image: "/butik/rewind-plus.png", illustration: "bottle" },
  { name: "Whey Protein", price: 329, description: "Högkvalitativt vassleprotein som hjälper dig att öka ditt dagliga proteinintag och stödjer muskeltillväxt och återhämtning efter träning.", message: "Whey Protein", image: "/butik/whey-protein.png", imageNote: "Smak på förpackningen kan variera.", illustration: "pouch" },
];

export function swishUrl(product: Pick<ShopProduct, "price" | "message">) {
  const data = { version: 1, payee: { value: shopConfig.swishNumber.replaceAll(" ", "") }, amount: { value: product.price }, message: { value: product.message } };
  return `swish://payment?data=${encodeURIComponent(JSON.stringify(data))}`;
}
