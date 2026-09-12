import Image from "next/image";
import type { Facility } from "@/lib/site-config";

export function FacilityGallery({ facility }: { facility: Facility }) {
  return (
    <section id="bilder" aria-labelledby="gallery-heading" className="page-width pb-16 sm:pb-20">
      <p className="eyebrow text-muted">Bilder från {facility.name}</p>
      <h2 id="gallery-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Ta en titt hos oss.</h2>
      <div className={`mt-8 grid items-start gap-6 ${facility.photos.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {facility.photos.map(photo => (
          <figure key={photo.src} className="overflow-hidden rounded-lg border border-line bg-surface">
            <a href={photo.src} aria-label={`Visa hela bilden: ${photo.alt}`} className="block focus-visible:outline-offset-[-4px]">
              <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}
                sizes={facility.photos.length === 3 ? "(min-width: 768px) 33vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                className="h-auto w-full" />
            </a>
            <figcaption className="px-5 py-4 text-sm leading-6 text-muted">{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
