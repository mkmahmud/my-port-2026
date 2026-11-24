'use client';

import type { PointerEvent } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Bot, Cloud, CodeXml, Database, Server } from 'lucide-react';
import { SERVICES } from '@/components/sections/Services';
import { iconFor } from './iconFor';

const ICONS = [CodeXml, Cloud, Server, Database, Bot];

function spotlight(event: PointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  const box = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${event.clientX - box.left}px`);
  card.style.setProperty('--my', `${event.clientY - box.top}px`);
}

export function ServicesBento() {
  return (
    <section className="sv" aria-labelledby="sv-title">
      <div className="sv-head">
        <p className="tag">Services</p>
        <h2 id="sv-title">What I <span>Build.</span></h2>
        <p>Five ways I help teams ship, from the first commit to a monitored production deploy.</p>
      </div>
      <ul className="sv-grid">
        {SERVICES.map((service, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <li key={service.id} className={`sv-card sv-card-${index + 1}`} onPointerMove={spotlight}>
              <div className="sv-top">
                <span className="sv-icon"><Icon size={26} aria-hidden="true" /></span>
                <span className="sv-num">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="sv-tags" aria-label={`${service.title} tools`}>
                {service.tags.map((tag) => {
                  const icon = iconFor(tag);
                  return (
                    <li key={tag}>
                      {icon && <svg width="15" height="15" viewBox="0 0 24 24" fill={icon.color} aria-hidden="true"><path d={icon.path} /></svg>}
                      {tag}
                    </li>
                  );
                })}
              </ul>
              <Link href="/contact" className="sv-go" aria-label={`Start a ${service.title} project`}>
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
