'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail, MapPin, RotateCcw } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BIO, EXPERIENCE, SITE_CONFIG, STATS } from '@/lib/constants';
import { BRAND_ICONS, type BrandIconName } from './brandIcons';

const STACK: BrandIconName[] = ['react', 'next', 'node', 'python', 'docker', 'aws', 'postgres'];

const SOCIALS = [
  { label: 'GitHub', href: SITE_CONFIG.github, path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
  { label: 'LinkedIn', href: SITE_CONFIG.linkedin, path: 'M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z' },
];

const yearOf = (date: string) => date.match(/\d{4}/)?.[0] ?? date;

function Badge() {
  const card = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !card.current) return;
    const box = card.current.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    card.current.style.setProperty('--rx', `${(0.5 - y) * 16}deg`);
    card.current.style.setProperty('--ry', `${(x - 0.5) * 20}deg`);
    card.current.style.setProperty('--px', `${x * 100}%`);
    card.current.style.setProperty('--py', `${y * 100}%`);
  };

  const rest = () => {
    card.current?.style.setProperty('--rx', '0deg');
    card.current?.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="ab-badge-wrap">
      <div className="ab-swing">
        <svg className="ab-lanyard" viewBox="0 0 200 160" preserveAspectRatio="none" aria-hidden="true">
          <path d="M70 0 L92 156" />
          <path d="M130 0 L108 156" />
        </svg>
        <div ref={card} className={`ab-badge ${flipped ? 'is-flipped' : ''}`} onPointerMove={tilt} onPointerLeave={rest}>
          <div className="ab-face ab-front" aria-hidden={flipped}>
            <span className="ab-clip" aria-hidden="true" />
            <div className="ab-top">
              <span className="ab-mark"><Image src="/logo.png" alt="" width={30} height={19} /></span>
              <span className="ab-pass">ENGINEER PASS</span>
            </div>
            <div className="ab-photo">
              <Image src="/images/home/portrait-matte.webp" alt="Portrait of Mahmudul Hasan" fill sizes="320px" />
            </div>
            <div className="ab-id">
              <strong>{SITE_CONFIG.name}</strong>
              <span>Full Stack &amp; DevOps Engineer</span>
              <small><MapPin size={13} aria-hidden="true" /> {SITE_CONFIG.location}</small>
            </div>
            <div className="ab-foot">
              <span className="ab-status"><i aria-hidden="true" /> {SITE_CONFIG.availabilityText}</span>
              <span className="ab-code" aria-hidden="true" />
            </div>
            <span className="ab-sheen" aria-hidden="true" />
          </div>
          <div className="ab-face ab-back" aria-hidden={!flipped}>
            <span className="ab-clip" aria-hidden="true" />
            <p className="ab-back-title">Let&apos;s build together</p>
            <ul className="ab-stack" aria-label="Main tools">
              {STACK.map((name) => (
                <li key={name} title={BRAND_ICONS[name].label}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill={BRAND_ICONS[name].color} aria-hidden="true"><path d={BRAND_ICONS[name].path} /></svg>
                  <span className="sr-only">{BRAND_ICONS[name].label}</span>
                </li>
              ))}
            </ul>
            <a href={`mailto:${SITE_CONFIG.email}`} className="ab-mail" tabIndex={flipped ? 0 : -1}><Mail size={16} aria-hidden="true" /> {SITE_CONFIG.email}</a>
            <div className="ab-socials">
              {SOCIALS.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} tabIndex={flipped ? 0 : -1}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={social.path} /></svg>
                </a>
              ))}
            </div>
            <Link href="/contact" className="hx-primary ab-talk" tabIndex={flipped ? 0 : -1}>
              Let&apos;s Talk <span aria-hidden="true"><ArrowRight size={15} /></span>
            </Link>
            <span className="ab-sheen" aria-hidden="true" />
          </div>
        </div>
      </div>
      <button type="button" className="ab-flip" onClick={() => setFlipped((value) => !value)} aria-pressed={flipped}>
        <RotateCcw size={15} aria-hidden="true" /> {flipped ? 'Show front' : 'Flip the badge'}
      </button>
    </div>
  );
}

export function AboutMe() {
  const section = useRef<HTMLElement>(null);
  const words = BIO.split(' ');
  const [current, previous] = EXPERIENCE;

  useEffect(() => {
    const node = section.current;
    if (!node) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // The bio lights up word by word as Lenis scrolls it through the viewport.
      gsap.fromTo('.ab-bio span', { opacity: 0.16 }, {
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: { trigger: '.ab-bio', start: 'top 82%', end: 'bottom 48%', scrub: true },
      });
      gsap.from('.ab-swing', { y: -120, rotate: -9, autoAlpha: 0, duration: 1.4, ease: 'elastic.out(1, 0.55)', clearProps: 'transform,opacity,visibility', scrollTrigger: { trigger: node, start: 'top 70%', once: true } });
      ScrollTrigger.create({ trigger: '.ab-term', start: 'top 85%', once: true, onEnter: () => node.classList.add('is-typing') });
      node.querySelectorAll<HTMLElement>('.ab-num').forEach((el) => {
        const target = Number(el.dataset.value);
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: 'power3.out',
          onUpdate: () => { el.textContent = `${Math.round(counter.value)}+`; },
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });
    });
    mm.add('(prefers-reduced-motion: reduce)', () => { node.classList.add('is-typing'); });
    return () => mm.revert();
  }, []);

  const stats = [
    { value: STATS.yearsExperience, label: 'Years experience' },
    { value: STATS.projectsShipped, label: 'Projects shipped' },
    { value: STATS.technologies, label: 'Technologies' },
  ];

  const lines = [
    { cmd: 'whoami', out: [`${SITE_CONFIG.name.toLowerCase().replace(' ', '-')} · Full Stack & DevOps Engineer`] },
    { cmd: 'cat location.txt', out: [`${SITE_CONFIG.location} (UTC+6)`] },
    { cmd: 'git log --career', out: [`${yearOf(current.startDate)} → now   ${current.role} @ ${current.company}`, `${yearOf(previous.startDate)} → ${yearOf(previous.endDate)}  ${previous.role} @ ${previous.company}, ${previous.location}`] },
    { cmd: 'status', out: [`● ${SITE_CONFIG.availabilityText.toLowerCase()}`], live: true },
  ];

  return (
    <section ref={section} className="ab" aria-labelledby="ab-title">
      <div className="ab-glow" aria-hidden="true" />
      <div className="ab-inner">
        <Badge />

        <div className="ab-story">
          <p className="tag tag-dot">About me</p>
          <h2 id="ab-title">Hi, I&apos;m <span>Mahmudul Hasan</span></h2>
          <p className="ab-bio" aria-label={BIO}>
            {words.map((word, index) => <span key={index} aria-hidden="true">{word} </span>)}
          </p>

          <div className="ab-term" role="img" aria-label={`Terminal summary: ${SITE_CONFIG.name}, ${SITE_CONFIG.location}. ${current.role} at ${current.company} since ${current.startDate}. Previously ${previous.role} at ${previous.company}. ${SITE_CONFIG.availabilityText}.`}>
            <div className="ab-term-bar" aria-hidden="true"><i /><i /><i /><span>~/about — zsh</span></div>
            <div className="ab-term-body" aria-hidden="true">
              {lines.map((line, index) => (
                <div key={line.cmd} className="ab-line" style={{ '--i': index } as React.CSSProperties}>
                  <p className="ab-cmd"><b>❯</b> {line.cmd}</p>
                  {line.out.map((text) => <p key={text} className={`ab-out ${line.live ? 'is-live' : ''}`}>{text}</p>)}
                </div>
              ))}
              <p className="ab-cmd ab-cursor" style={{ '--i': lines.length } as React.CSSProperties}><b>❯</b> <i /></p>
            </div>
          </div>

          <dl className="ab-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd className="ab-num" data-value={stat.value}>{stat.value}+</dd>
              </div>
            ))}
          </dl>

          <Link href="/about" className="text-link">More about me <ArrowRight size={15} /></Link>
        </div>
      </div>
    </section>
  );
}
