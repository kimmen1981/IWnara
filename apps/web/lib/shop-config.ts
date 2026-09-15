export type ShopProduct = {
  name: string;
  price: number;
  description: string;
  image?: string;
};

export const shopConfig = {
  swishNumber: "123 594 67 44",
  email: "info@iwnara.se",
};

// Lägg in bekräftade produkter här. Pris anges i kronor.
// Exempel på format (inte en publicerad produkt):
// { name: "Produktnamn", price: 249, description: "Kort beskrivning", image: "/butik/produkt.webp" }
export const products: readonly ShopProduct[] = [];
