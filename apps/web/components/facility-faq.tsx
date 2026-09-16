import type { Facility } from '@/lib/site-config';
import { facilityFaq } from '@/lib/faq';

export function FacilityFaq({ facility }: { facility: Facility }) {
  const groups = facilityFaq(facility);
  return <section id="faq" className="page-width py-16 sm:py-20" aria-labelledby="faq-heading">
    <div className="max-w-3xl"><p className="eyebrow text-muted">Bra att veta innan du börjar</p>
      <h2 id="faq-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Dina frågor. Våra svar.</h2>
      <p className="body-copy mt-5">Allt från första passet till medlemskapet på IW nära {facility.name}. Hitta det du undrar över – eller hör av dig så pratar vi.</p>
    </div>
    <nav aria-label="FAQ-kategorier" className="faq-categories mt-8 flex flex-wrap gap-2">{groups.map(group => <a key={group.id} className="button" href={`#faq-${group.id}`}>{group.title}</a>)}</nav>
    <div className="mt-10 grid items-start gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="rounded-lg border border-line bg-surface p-6"><p className="eyebrow text-muted">IW nära {facility.name}</p><p className="mt-4 text-lg font-medium">En personlig start</p><p className="mt-3 text-sm leading-7 text-muted">Prova ett pass gratis och få en genomgång av gymmet. Vi kommer överens om en tid tillsammans.</p><a className="nav-link mt-4 inline-flex min-h-12 items-center text-sm" href="#kontakt">Prata med oss →</a></aside>
      <div className="min-w-0 space-y-10">{groups.map(group => <section key={group.id} id={`faq-${group.id}`} aria-labelledby={`faq-${group.id}-heading`}>
        <h3 id={`faq-${group.id}-heading`} className="mb-4 text-xl font-semibold">{group.title}</h3>
        <div className="overflow-hidden rounded-lg border border-line bg-surface">{group.items.map(item => <details key={item.id} id={`faq-${item.id}`} className="faq-item">
          <summary><span>{item.question}</span><svg className="faq-icon" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6 9 6 6 6-6" /></svg></summary>
          <div className="faq-answer"><p>{item.answer}</p>{item.link && <a className="nav-link mt-3 inline-flex min-h-12 items-center text-sm font-medium text-foreground" href={item.link.href}>{item.link.label} →</a>}</div>
        </details>)}</div>
      </section>)}</div>
    </div>
    <div className="mt-12 rounded-lg border border-line bg-surface p-6 sm:p-8"><h3 className="text-2xl font-semibold">Ska vi ta första steget tillsammans?</h3><p className="body-copy mt-3 max-w-2xl">Du behöver inte ha koll på allt innan du hör av dig. Vi hjälper dig med frågor om gymmet och kommer överens om en tid om du vill prova.</p><a className="button button-light mt-6" href="#kontakt">Kontakta oss om gratis provträning</a></div>
  </section>;
}
