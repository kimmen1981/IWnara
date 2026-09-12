import type { Facility } from "./site-config";
import { siteConfig } from "./site-config";

// Preview and local environments should not be indexed. Vercel sets this itself.
export const publicIndexing = process.env.VERCEL_ENV === "production";
export const pageUrl = (path: string) => new URL(path, siteConfig.url).toString();

export function facilityStructuredData(facility: Facility) {
  return {
    "@context": "https://schema.org", "@type": "ExerciseGym",
    "@id": `${pageUrl(`/${facility.slug}`)}#gym`,
    name: `IW nära ${facility.name}`, url: pageUrl(`/${facility.slug}`),
    description: facility.description,
    image: facility.photos.map(photo => pageUrl(photo.src)),
    address: {
      "@type": "PostalAddress", streetAddress: facility.street,
      addressLocality: facility.area, addressCountry: "SE",
      ...(facility.postalCode ? { postalCode: facility.postalCode } : {}),
    },
    ...(facility.email ? { email: facility.email } : {}),
    telephone: facility.phones[0],
    contactPoint: facility.phones.map(phone => ({ "@type": "ContactPoint", telephone: phone, contactType: "customer service", availableLanguage: "Swedish" })),
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: facility.opens, closes: facility.closes,
    }],
  };
}
