'use client';

import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { BRAND_ICONS, type BrandIconName } from './brandIcons';

const ROWS: BrandIconName[][] = [
  ['aws', 'docker', 'next', 'postgres', 'actions', 'react', 'typescript', 'nginx', 'linux', 'vercel'],
  ['python', 'fastapi', 'node', 'nestjs', 'redis', 'mongodb', 'prisma', 'tailwind', 'langchain'],
];

function Chip({ name, copy }: { name: BrandIconName; copy?: boolean }) {
  const icon = BRAND_ICONS[name];
  return (
    <li className="tm-chip" aria-hidden={copy || undefined} style={{ '--brand': icon.color } as React.CSSProperties}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill={icon.color} aria-hidden="true"><path d={icon.path} /></svg>
      {icon.label}
    </li>
  );
}

export function TechMarquee() {
  const tracks = useRef<(HTMLUListElement | null)[]>([]);
  const offsets = useRef([0, 0]);
  const boost = useRef(0);
  const paused = useRef(false);

  // Lenis reports scroll speed; scrolling makes the belts run faster, in the scroll's direction.
  useLenis((lenis) => {
    boost.current = gsap.utils.clamp(-14, 14, lenis.velocity * 0.32);
  });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tick = (_: number, delta: number) => {
      const step = (paused.current ? 0.12 : 0.6) * (delta / 16.7);
      boost.current *= 0.92;
      tracks.current.forEach((track, row) => {
        if (!track) return;
        const half = track.scrollWidth / 2;
        const direction = row === 0 ? -1 : 1;
        offsets.current[row] += direction * (step + Math.abs(boost.current)) * (boost.current < 0 ? -1 : 1);
        offsets.current[row] = ((offsets.current[row] % half) - half) % half;
        track.style.transform = `translate3d(${offsets.current[row]}px, 0, 0)`;
      });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <section
      id="explore"
      className="tm"
      aria-labelledby="tm-title"
      onPointerEnter={() => { paused.current = true; }}
      onPointerLeave={() => { paused.current = false; }}
    >
      <div className="tm-head">
        <h2 id="tm-title">Technologies I build <span>and ship with</span></h2>
        <p>{ROWS.flat().length} tools across frontend, backend, cloud and AI.</p>
      </div>
      <div className="tm-belts">
        {ROWS.map((row, index) => (
          <div className="tm-belt" key={index}>
            <ul ref={(node) => { tracks.current[index] = node; }}>
              {row.map((name) => <Chip key={name} name={name} />)}
              {row.map((name) => <Chip key={`${name}-copy`} name={name} copy />)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
