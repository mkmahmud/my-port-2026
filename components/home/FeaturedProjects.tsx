'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useProjects } from '@/hooks/useProjects';
import { DEFAULT_PROJECTS } from '@/lib/constants';
import type { Project } from '@/lib/types';

type Card = {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  tags: string[];
  image: string;
  live?: string;
};

function toCard(project: Project): Card {
  const overview = Array.isArray(project.overview) ? project.overview[0] : project.overview;
  return {
    id: project._id,
    title: project.title || project.projectTitle || 'Untitled project',
    slug: project.slug,
    category: (project.category || project.projectCategory || [])[0] || 'Project',
    summary: project.description || overview || '',
    tags: (project.techStack || project.Technologies || []).slice(0, 4),
    image: project.thumbnailUrl || project.gellaryImages?.[0] || project.images?.[0] || '/images/projects/codex-edumine.svg',
    live: project.liveUrl || project.liveSite,
  };
}

const pad = (value: number) => String(value).padStart(2, '0');

function Shot({ card }: { card: Card }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="fp-shot is-missing">
        <span>{card.title.trim().split(/\s+/).slice(0, 2).map((word) => word[0]).join('')}</span>
        <small>Preview coming soon</small>
      </div>
    );
  }
  return (
    <div className="fp-shot">
      <Image
        src={card.image}
        alt={`${card.title} interface`}
        fill
        loading="eager"
        unoptimized={card.image.endsWith('.svg')}
        sizes="(max-width: 1023px) 86vw, 640px"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export function FeaturedProjects() {
  const { projects, isLoading } = useProjects();
  const source = projects.length > 0 ? projects : isLoading ? [] : DEFAULT_PROJECTS;
  const cards = source.slice(0, 6).map(toCard);

  const section = useRef<HTMLElement>(null);
  const deck = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const lenis = useLenis();
  const project = cards[active];

  // Place every card on a curved rail around the focused one.
  const layout = (position: number) => {
    const nodes = deck.current?.querySelectorAll<HTMLElement>('.fp-card');
    nodes?.forEach((node, index) => {
      const offset = index - position;
      const distance = Math.abs(offset);
      node.style.transform = `translate3d(calc(-50% + ${offset * 62}%), -50%, ${-distance * 220}px) rotateY(${offset * -32}deg)`;
      node.style.opacity = String(Math.max(0, 1 - distance * 0.38));
      node.style.zIndex = String(100 - Math.round(distance * 10));
      node.style.filter = `brightness(${Math.max(0.35, 1 - distance * 0.4)})`;
      node.classList.toggle('is-focus', distance < 0.5);
    });
  };

  useEffect(() => {
    const node = section.current;
    if (!node || cards.length === 0) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      setPinned(true);
      layout(0);
      trigger.current = ScrollTrigger.create({
        trigger: node,
        start: 'top top',
        end: `+=${cards.length * 65}%`,
        pin: '.fp-stage',
        anticipatePin: 1,
        refreshPriority: 1,
        scrub: true,
        onUpdate: (self) => {
          const position = self.progress * (cards.length - 1);
          layout(position);
          setActive(Math.round(position));
          node.style.setProperty('--fp-progress', self.progress.toFixed(4));
        },
      });
      // This pin is created after project data loads, so every later trigger must re-measure.
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      gsap.from('.fp-head > *', { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', clearProps: 'transform,opacity,visibility', scrollTrigger: { trigger: node, start: 'top 70%', once: true } });
      return () => {
        trigger.current = null;
        setPinned(false);
      };
    });

    return () => mm.revert();
  }, [cards.length]);

  const focus = (index: number) => {
    const st = trigger.current;
    if (!st || !lenis) return;
    lenis.scrollTo(st.start + (index / Math.max(1, cards.length - 1)) * (st.end - st.start), { duration: 1.3 });
  };

  const tilt = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;
    const frame = event.currentTarget;
    const box = frame.getBoundingClientRect();
    frame.style.setProperty('--tx', `${((event.clientX - box.left) / box.width - 0.5) * 10}deg`);
    frame.style.setProperty('--ty', `${((event.clientY - box.top) / box.height - 0.5) * -8}deg`);
  };

  return (
    <section ref={section} className={`fp ${pinned ? 'is-pinned' : ''}`} aria-labelledby="fp-title">
      <div className="fp-stage">
        <div className="fp-glow" aria-hidden="true" />
        <span className="fp-ghost" aria-hidden="true">{pad(active + 1)}</span>

        <header className="fp-head">
          <div>
            <p className="tag">Featured projects</p>
            <h2 id="fp-title">Some of My <span>Recent Work.</span></h2>
          </div>
          <Link href="/projects" className="text-link">View All Projects <ArrowRight size={15} /></Link>
        </header>

        <div ref={deck} className="fp-deck" aria-busy={isLoading}>
          {cards.length === 0 && <div className="fp-card is-loading" />}
          {cards.map((card, index) => (
            <article
              key={card.id}
              className="fp-card"
              onClick={() => { if (pinned && index !== active) focus(index); }}
            >
              <div className="fp-frame" onPointerMove={tilt} onPointerLeave={(event) => { event.currentTarget.style.setProperty('--tx', '0deg'); event.currentTarget.style.setProperty('--ty', '0deg'); }}>
                <div className="fp-bar" aria-hidden="true">
                  <i /><i /><i />
                  <span>{card.title}</span>
                </div>
                <Shot card={card} />
              </div>
              <div className="fp-caption">
                <p className="fp-cat">{card.category}</p>
                <h3><Link href={`/projects/${card.slug}`}>{card.title}</Link></h3>
                <p className="fp-sum">{card.summary}</p>
                <ul>{card.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>

        {project && (
          <div className="fp-readout" aria-live="polite">
            <div className="fp-count">
              <b>{pad(active + 1)}</b>
              <span>/ {pad(cards.length)}</span>
            </div>
            <div className="fp-info" key={project.id}>
              <p className="fp-cat">{project.category}</p>
              <h3>{project.title}</h3>
              <p className="fp-sum">{project.summary}</p>
            </div>
            <ul className="fp-tags" key={`${project.id}-tags`}>
              {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            <div className="fp-actions">
              <Link href={`/projects/${project.slug}`} className="hx-primary">
                View Case Study <span aria-hidden="true"><ArrowUpRight size={15} /></span>
              </Link>
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="fp-live" aria-label={`Open ${project.title} live site`}>
                  <ExternalLink size={17} />
                </a>
              )}
            </div>
          </div>
        )}

        <div className="fp-progress" aria-hidden="true">
          {cards.map((card, index) => <i key={card.id} className={index === active ? 'is-on' : ''} />)}
        </div>
      </div>
    </section>
  );
}
