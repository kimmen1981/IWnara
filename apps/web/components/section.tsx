import type { ReactNode } from "react";

export function Section({ id, number, title, children }: {
  id: string; number: string; title: string; children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="section-shell">
      <div className="flex items-baseline gap-4">
        <span className="text-sm text-muted" aria-hidden="true">{number}</span>
        <h2 id={`${id}-heading`} className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      </div>
      <div className="mt-7 md:mt-0">{children}</div>
    </section>
  );
}
