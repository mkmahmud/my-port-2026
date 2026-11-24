'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { DEFAULT_PROJECTS } from '@/lib/constants';
import type { Project } from '@/lib/types';
import { SafeShot } from './SafeShot';

type Card = { id: string; title: string; slug: string; category: string; summary: string; tags: string[]; image?: string };

function toCard(project: Project): Card {
  const overview = Array.isArray(project.overview) ? project.overview[0] : project.overview;
  return {
    id: project._id,
    title: (project.title || project.projectTitle || 'Untitled project').trim(),
    slug: project.slug,
    category: (project.category || project.projectCategory || [])[0] || 'Project',
    summary: project.description || overview || '',
    tags: (project.techStack || project.Technologies || []).slice(0, 4),
    image: project.thumbnailUrl || project.gellaryImages?.[0] || project.images?.[0],
  };
}

export function ProjectsIndex() {
  const { projects, isLoading } = useProjects();
  const [filter, setFilter] = useState('All');
  const cards = useMemo(() => (projects.length > 0 ? projects : isLoading ? [] : DEFAULT_PROJECTS).map(toCard), [projects, isLoading]);
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    cards.forEach((card) => counts.set(card.category, (counts.get(card.category) ?? 0) + 1));
    return ['All', ...[...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 7).map(([name]) => name)];
  }, [cards]);
  const shown = filter === 'All' ? cards : cards.filter((card) => card.category === filter);

  return (
    <section className="pj" aria-label="Project list">
      <div className="pj-bar">
        <div className="pj-filters" role="group" aria-label="Filter projects">
          {categories.map((category) => (
            <button key={category} type="button" className={filter === category ? 'is-on' : ''} aria-pressed={filter === category} onClick={() => setFilter(category)}>
              {category}
            </button>
          ))}
        </div>
        <p className="pj-count" aria-live="polite">{isLoading ? 'Loading projects…' : `${shown.length} project${shown.length === 1 ? '' : 's'}`}</p>
      </div>

      <ul className="pj-grid" aria-busy={isLoading}>
        {isLoading && cards.length === 0 && [0, 1, 2, 3].map((item) => <li key={item} className="pj-card is-loading" />)}
        {shown.map((card, index) => (
          <li key={card.id} className="pj-card">
            <Link href={`/projects/${card.slug}`} className="pj-link">
              <div className="pj-frame">
                <div className="pj-chrome" aria-hidden="true"><i /><i /><i /><span>{card.title}</span></div>
                <div className="pj-shot">
                  <SafeShot src={card.image} alt={`${card.title} interface`} title={card.title} sizes="(max-width: 900px) 100vw, 600px" priority={index < 2} />
                </div>
              </div>
              <div className="pj-copy">
                <p className="pj-cat">{card.category}</p>
                <h2>{card.title}</h2>
                {card.summary && <p className="pj-sum">{card.summary}</p>}
                <ul className="pj-tags">{card.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </div>
              <span className="pj-go" aria-hidden="true"><ArrowUpRight size={18} /></span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
