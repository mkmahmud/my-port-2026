'use client';

import { useDeferredValue, useMemo, useState, type PointerEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ExternalLink, Search, X } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { DEFAULT_PROJECTS } from '@/lib/constants';
import type { Project } from '@/lib/types';
import { SafeShot } from './SafeShot';
import { iconFor } from './iconFor';

type Card = { id: string; title: string; slug: string; category: string; summary: string; tags: string[]; image?: string; live?: string };

function toCard(project: Project): Card {
  const overview = Array.isArray(project.overview) ? project.overview[0] : project.overview;
  return {
    id: project._id,
    title: (project.title || project.projectTitle || 'Untitled project').trim(),
    slug: project.slug,
    category: (project.category || project.projectCategory || [])[0] || 'Project',
    summary: project.description || overview || '',
    tags: project.techStack || project.Technologies || [],
    image: project.thumbnailUrl || project.gellaryImages?.[0] || project.images?.[0],
    live: project.liveUrl || project.liveSite,
  };
}

const pad = (value: number) => String(value).padStart(2, '0');

function Tech({ name }: { name: string }) {
  const icon = iconFor(name);
  return (
    <li>
      {icon && <svg width="14" height="14" viewBox="0 0 24 24" fill={icon.color} aria-hidden="true"><path d={icon.path} /></svg>}
      {name}
    </li>
  );
}

function spotlight(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== 'mouse') return;
  const card = event.currentTarget;
  const box = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${event.clientX - box.left}px`);
  card.style.setProperty('--my', `${event.clientY - box.top}px`);
}

export function ProjectsIndex() {
  const { projects, isLoading } = useProjects();
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const search = useDeferredValue(query.trim().toLowerCase());

  const cards = useMemo(() => (projects.length > 0 ? projects : isLoading ? [] : DEFAULT_PROJECTS).map(toCard), [projects, isLoading]);
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    cards.forEach((card) => counts.set(card.category, (counts.get(card.category) ?? 0) + 1));
    return [['All', cards.length] as const, ...[...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 7)];
  }, [cards]);

  const shown = cards.filter((card) =>
    (filter === 'All' || card.category === filter) &&
    (!search || `${card.title} ${card.summary} ${card.category} ${card.tags.join(' ')}`.toLowerCase().includes(search))
  );
  const [featured, ...rest] = shown;
  const position = (card: Card) => pad(cards.indexOf(card) + 1);
  const reset = () => { setFilter('All'); setQuery(''); };

  return (
    <section className="pj" aria-label="Project list">
      <div className="pj-tools">
        <div className="pj-search">
          <Search size={18} aria-hidden="true" />
          <label htmlFor="pj-search" className="sr-only">Search projects</label>
          <input id="pj-search" type="search" placeholder="Search by name or tech, e.g. FastAPI" value={query} onChange={(event) => setQuery(event.target.value)} />
          {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={16} /></button>}
        </div>
        <div className="pj-filters" role="group" aria-label="Filter projects by category">
          {categories.map(([name, count]) => (
            <button key={name} type="button" className={filter === name ? 'is-on' : ''} aria-pressed={filter === name} onClick={() => setFilter(name)}>
              {name} <span>{count}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="pj-count" aria-live="polite">
        {isLoading ? 'Loading projects…' : `Showing ${shown.length} of ${cards.length} project${cards.length === 1 ? '' : 's'}`}
      </p>

      {isLoading && cards.length === 0 && (
        <div className="pj-loading" aria-busy="true">
          <div className="pj-skel pj-skel-hero" />
          <div className="pj-grid">{[0, 1, 2].map((item) => <div key={item} className="pj-skel" />)}</div>
        </div>
      )}

      {!isLoading && shown.length === 0 && (
        <div className="pj-empty">
          <p>No projects match {search ? <>&ldquo;{query.trim()}&rdquo;</> : 'this filter'}.</p>
          <button type="button" className="text-link" onClick={reset}>Show all projects <ArrowRight size={15} /></button>
        </div>
      )}

      {featured && (
        <article key={`f-${featured.id}-${filter}-${search}`} className="pj-hero" onPointerMove={spotlight}>
          <Link href={`/projects/${featured.slug}`} className="pj-hero-shot" tabIndex={-1} aria-hidden="true">
            <div className="pj-chrome"><i /><i /><i /><span>{featured.title}</span></div>
            <div className="pj-shot">
              <SafeShot src={featured.image} alt="" title={featured.title} sizes="(max-width: 980px) 100vw, 720px" priority />
            </div>
          </Link>
          <div className="pj-hero-copy">
            <p className="pj-meta"><span className="pj-index">{position(featured)}</span><span className="pj-cat">{featured.category}</span>{filter === 'All' && !search && <span className="pj-flag">Featured</span>}</p>
            <h2><Link href={`/projects/${featured.slug}`}>{featured.title}</Link></h2>
            {featured.summary && <p className="pj-sum">{featured.summary}</p>}
            <ul className="pj-tech" aria-label="Built with">{featured.tags.slice(0, 6).map((tag) => <Tech key={tag} name={tag} />)}</ul>
            <div className="pj-actions">
              <Link href={`/projects/${featured.slug}`} className="hx-primary">View case study <span aria-hidden="true"><ArrowUpRight size={15} /></span></Link>
              {featured.live && (
                <a href={featured.live} target="_blank" rel="noopener noreferrer" className="pj-live">Live site <ExternalLink size={15} aria-hidden="true" /></a>
              )}
            </div>
          </div>
        </article>
      )}

      {rest.length > 0 && (
        <ul className="pj-grid">
          {rest.map((card, index) => (
            <li key={`${card.id}-${filter}-${search}`} className="pj-card" style={{ '--d': index } as React.CSSProperties} onPointerMove={spotlight}>
              <Link href={`/projects/${card.slug}`} className="pj-link">
                <div className="pj-shot">
                  <SafeShot src={card.image} alt={`${card.title} interface`} title={card.title} sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 400px" />
                  <span className="pj-index-float">{position(card)}</span>
                </div>
                <div className="pj-copy">
                  <p className="pj-cat">{card.category}</p>
                  <h3>{card.title}</h3>
                  {card.summary && <p className="pj-sum">{card.summary}</p>}
                  <ul className="pj-tech" aria-label="Built with">{card.tags.slice(0, 3).map((tag) => <Tech key={tag} name={tag} />)}</ul>
                </div>
                <span className="pj-go" aria-hidden="true"><ArrowUpRight size={18} /></span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <aside className="pj-cta">
        <div>
          <h2>Have a project <span>in mind?</span></h2>
          <p>Tell me what you&apos;re building. I&apos;ll reply with how I&apos;d approach it.</p>
        </div>
        <Link href="/contact" className="hx-primary">Start a project <span aria-hidden="true"><ArrowRight size={15} /></span></Link>
      </aside>
    </section>
  );
}
