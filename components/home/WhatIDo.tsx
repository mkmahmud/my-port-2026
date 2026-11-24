'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, Cloud, CodeXml, Zap } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CoreScene = dynamic(() => import('./CoreScene'), {
  ssr: false,
  loading: () => <span className="wd-core-fallback" />,
});

const SERVICES = [
  { icon: CodeXml, title: 'Full Stack Development', text: 'Fast, scalable web apps, from the database to a polished UI.', tags: ['Next.js', 'React', 'TypeScript'] },
  { icon: Cloud, title: 'DevOps & CI/CD', text: 'Containers, automated pipelines and zero-downtime deploys.', tags: ['Docker', 'GitHub Actions', 'AWS'] },
  { icon: Zap, title: 'Backend & APIs', text: 'Secure APIs and services that hold up under real load.', tags: ['FastAPI', 'NestJS', 'PostgreSQL'] },
];

export function WhatIDo() {
  const section = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const velocity = useRef(0);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [still, setStill] = useState(false);
  const lenis = useLenis((instance) => { velocity.current = instance.velocity; });

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setStill(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const node = section.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '160px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = section.current;
    if (!node) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // Desktop: pin the stage and let the scroll walk through the three services.
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      trigger.current = ScrollTrigger.create({
        trigger: node,
        start: 'top top',
        end: '+=170%',
        pin: '.wd-stage',
        anticipatePin: 1,
        refreshPriority: 2,
        onUpdate: (self) => {
          setActive(Math.min(SERVICES.length - 1, Math.floor(self.progress * SERVICES.length)));
          node.style.setProperty('--wd-progress', self.progress.toFixed(4));
        },
      });
      return () => { trigger.current = null; };
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ scrollTrigger: { trigger: node, start: 'top 70%', once: true } })
        .from('.wd-head > *', { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', clearProps: 'transform,opacity,visibility' })
        .from('.wd-core', { scale: 0.85, autoAlpha: 0, duration: 1.2, ease: 'expo.out', clearProps: 'transform,opacity,visibility' }, 0.1)
        .from('.wd-step', { x: -40, autoAlpha: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out', clearProps: 'transform,opacity,visibility' }, 0.3);
    });

    return () => mm.revert();
  }, []);

  const select = (index: number) => {
    const st = trigger.current;
    if (st && lenis) {
      lenis.scrollTo(st.start + ((index + 0.5) / SERVICES.length) * (st.end - st.start), { duration: 1.2 });
    } else {
      setActive(index);
    }
  };

  return (
    <section ref={section} className="wd" aria-labelledby="wd-title">
      <div className="wd-stage">
        <div className="wd-glow" aria-hidden="true" />
        <div className="wd-inner">
          <div className="wd-text">
            <div className="wd-head">
              <p className="tag">What I do</p>
              <h2 id="wd-title">
                <span>Turning Ideas Into</span>
                <span className="wd-hot">Real Products.</span>
              </h2>
            </div>

            <ol className="wd-steps">
              {SERVICES.map(({ icon: Icon, title, text, tags }, index) => (
                <li key={title} className={`wd-step ${active === index ? 'is-active' : ''}`}>
                  <button type="button" onClick={() => select(index)} aria-expanded={active === index}>
                    <span className="wd-num">{String(index + 1).padStart(2, '0')}</span>
                    <span className="wd-title">{title}</span>
                    <Icon className="wd-step-icon" size={20} aria-hidden="true" />
                  </button>
                  <div className="wd-detail">
                    <div>
                      <p>{text}</p>
                      <ul aria-label={`${title} tools`}>
                        {tags.map((tag) => <li key={tag}>{tag}</li>)}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <Link href="/services" className="text-link wd-link">Explore Services <ArrowRight size={15} /></Link>
          </div>

          <div className="wd-core" aria-hidden="true">
            <CoreScene active={active} running={inView} still={still} velocity={velocity} />
            <span className="wd-counter">
              <b>{String(active + 1).padStart(2, '0')}</b> / {String(SERVICES.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
