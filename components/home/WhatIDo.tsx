'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Cloud, CodeXml, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CoreScene = dynamic(() => import('./CoreScene'), {
  ssr: false,
  loading: () => <span className="wd-core-fallback" />,
});

const SERVICES = [
  { icon: CodeXml, title: 'Full Stack Development', text: 'Fast, scalable web apps from database to UI.' },
  { icon: Cloud, title: 'DevOps & CI/CD', text: 'Containers, pipelines and zero-downtime deploys.' },
  { icon: Zap, title: 'Backend & APIs', text: 'Secure APIs and services that hold up under load.' },
];

export function WhatIDo() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [still, setStill] = useState(false);

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
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '120px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Walk through the services like stages of a pipeline until the visitor takes over.
  useEffect(() => {
    if (paused || still || !inView) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % SERVICES.length), 3200);
    return () => window.clearInterval(timer);
  }, [paused, still, inView]);

  useEffect(() => {
    if (!section.current || still) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ scrollTrigger: { trigger: section.current, start: 'top 72%', once: true } });
      timeline
        .from('.wd-intro > *', { y: 28, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', clearProps: 'transform,opacity,visibility' })
        .from('.wd-core', { scale: 0.82, autoAlpha: 0, duration: 1.1, ease: 'expo.out', clearProps: 'transform,opacity,visibility' }, 0.1)
        .from('.wd-card', { rotateY: -28, x: 60, z: -80, autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: 'expo.out', clearProps: 'transform,opacity,visibility' }, 0.25);
    }, section);
    return () => context.revert();
  }, [still]);

  const tilt = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'mouse' || still) return;
    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    card.style.setProperty('--ry', `${x * 14}deg`);
    card.style.setProperty('--rx', `${y * -12}deg`);
    card.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
    card.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
  };

  const reset = (card: HTMLAnchorElement) => {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <section ref={section} className="wd" aria-labelledby="wd-title">
      <div className="wd-glow" aria-hidden="true" />
      <div className="wd-inner">
        <div className="wd-intro">
          <p className="tag">What I do</p>
          <h2 id="wd-title">
            <span>Turning Ideas Into</span>
            <span className="wd-hot">Real Products.</span>
          </h2>
          <p className="wd-copy">Web apps, cloud infrastructure and APIs, built to ship and built to scale.</p>
          <Link href="/services" className="text-link">Explore Services <ArrowRight size={15} /></Link>
        </div>

        <div className="wd-core" aria-hidden="true">
          <CoreScene active={active} running={inView} still={still} />
        </div>

        <ul className="wd-cards" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
          {SERVICES.map(({ icon: Icon, title, text }, index) => (
            <li key={title}>
              <Link
                href="/services"
                className={`wd-card ${active === index ? 'is-active' : ''}`}
                onPointerMove={tilt}
                onPointerEnter={() => setActive(index)}
                onPointerLeave={(event) => reset(event.currentTarget)}
                onFocus={() => { setActive(index); setPaused(true); }}
                onBlur={() => setPaused(false)}
              >
                <span className="wd-icon"><Icon size={24} /></span>
                <span className="wd-text">
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
                <ArrowUpRight className="wd-arrow" size={18} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
