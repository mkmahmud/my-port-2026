import type { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

/** The opening band of every inner page: crumb, label, script title, and a short line. */
export function PageHero({ crumb, tag, title, sub, children }: { crumb: string; tag: string; title: ReactNode; sub?: ReactNode; children?: ReactNode }) {
  return (
    <section className="pg-hero" aria-labelledby="pg-title">
      <span className="pg-glow" aria-hidden="true" />
      <span className="pg-rings" aria-hidden="true" />
      <div className="pg-in">
        <nav className="pg-crumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">{crumb}</span>
        </nav>
        <p className="tag">{tag}</p>
        <h1 id="pg-title">{title}</h1>
        {sub && <p className="pg-sub">{sub}</p>}
        {children && <div className="pg-actions">{children}</div>}
      </div>
    </section>
  );
}
