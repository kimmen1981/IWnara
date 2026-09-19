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
  { name: "Ashwagandha", price: 249, description: "Kosttillskott med koncentrerat ashwagandha-extrakt, för dig som är intresserad av återhämtning och välmående.", message: "Ashwagandha", image: "/butik/ashwagandha.png", illustration: "bottle" },
  { name: "Kreatin Monohydrat – 500 g", price: 249, description: "Kreatinmonohydrat i pulverform – ett smidigt tillskott till din styrketräning.", message: "Kreatin", image: "/butik/creatin-monohydrate.jpg", illustration: "tub" },
  { name: "Neuro Prime – B-vitaminkomplex", price: 199, subtitle: "Metylerade B-vitaminer", description: "Ett B-vitaminkomplex med metylerade former av B-vitaminer som stödjer normal energiomsättning och nervsystemets funktion.", message: "Neuro Prime", image: "/butik/neuroprime.png", illustration: "bottle" },
  { name: "Magnesium", price: 119, description: "Magnesium bidrar till normal muskelfunktion, nervsystemets funktion och minskad trötthet och utmattning.", message: "Magnesium", image: "/butik/magnesium-bisglycinate.png", illustration: "bottle" },
  { name: "NAD Plus", price: 299, subtitle: "30 kapslar", description: "NAD Plus i kapslar – ett kosttillskott för dig som är intresserad av NAD och cellernas energiomsättning.", message: "NAD Plus", illustration: "bottle" },
  { name: "Rewind Plus", price: 549, description: "Premiumformulering med sex utvalda ingredienser i ett samlat kosttillskott. Läs innehåll och användning på förpackningen.", message: "Rewind Plus", image: "/butik/rewind-plus.png", illustration: "bottle" },
  { name: "Whey Protein", price: 329, description: "Högkvalitativt vassleprotein som hjälper dig att öka ditt dagliga proteinintag och stödjer muskeltillväxt och återhämtning efter träning.", message: "Whey Protein", image: "/butik/whey-protein.png", imageNote: "Smak på förpackningen kan variera.", illustration: "pouch" },
];

export function swishUrl(product: Pick<ShopProduct, "price" | "message">) {
  const data = { version: 1, payee: { value: shopConfig.swishNumber.replaceAll(" ", "") }, amount: { value: product.price }, message: { value: product.message } };
  return `swish://payment?data=${encodeURIComponent(JSON.stringify(data))}`;
}
