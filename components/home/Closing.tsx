'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUp, Check, Copy, Mail, MapPin, Phone } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { SITE_CONFIG } from '@/lib/constants';
import { BrandMark, HOME_LINKS } from './HomeNav';
import { SOCIALS, SocialIcon } from './socials';

const PHRASE = "Let's work together";

export function ClosingCta() {
  const belt = useRef<HTMLDivElement>(null);
  const magnet = useRef<HTMLAnchorElement>(null);
  const offset = useRef(0);
  const boost = useRef(0);
  const movers = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);
  const [copied, setCopied] = useState(false);

  useLenis((lenis) => { boost.current = gsap.utils.clamp(-12, 12, lenis.velocity * 0.3); });

  useEffect(() => {
    if (magnet.current) {
      movers.current = {
        x: gsap.quickTo(magnet.current, 'x', { duration: 0.5, ease: 'power3.out' }),
        y: gsap.quickTo(magnet.current, 'y', { duration: 0.5, ease: 'power3.out' }),
      };
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tick = (_: number, delta: number) => {
      const track = belt.current;
      if (!track) return;
      boost.current *= 0.93;
      const half = track.scrollWidth / 2;
      offset.current -= (0.7 + Math.abs(boost.current)) * (delta / 16.7);
      offset.current %= half;
      track.style.transform = `translate3d(${offset.current}px, 0, 0)`;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  const pull = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !magnet.current || !movers.current) return;
    const box = magnet.current.getBoundingClientRect();
    movers.current.x((event.clientX - (box.left + box.width / 2)) * 0.35);
    movers.current.y((event.clientY - (box.top + box.height / 2)) * 0.35);
  };
  const release = () => { movers.current?.x(0); movers.current?.y(0); };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${SITE_CONFIG.email}`;
    }
  };

  const words = Array.from({ length: 6 }, () => PHRASE);

  return (
    <section className="cx" aria-labelledby="cx-title">
      <Image src="/images/home/hero-plate.webp" alt="" fill sizes="100vw" className="cx-plate" />
      <div className="cx-belt" aria-hidden="true">
        <div ref={belt}>
          {[...words, ...words].map((word, index) => <span key={index}>{word} <b>✦</b></span>)}
        </div>
      </div>

      <div className="cx-inner">
        <p className="cx-status"><i aria-hidden="true" /> {SITE_CONFIG.availabilityText}</p>
        <h2 id="cx-title">Let&apos;s Build Something <span>Amazing</span> Together.</h2>
        <p className="cx-sub">Have a product to launch, a system to scale, or a pipeline to fix? Tell me about it.</p>
        <div className="cx-actions">
          <div className="cx-magnet" onPointerMove={pull} onPointerLeave={release}>
            <Link ref={magnet} href="/contact" className="cx-primary">
              Start a Project <span aria-hidden="true"><ArrowRight size={18} /></span>
            </Link>
          </div>
          <button type="button" className={`cx-copy ${copied ? 'is-copied' : ''}`} onClick={copy}>
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            <span>{copied ? 'Email copied' : SITE_CONFIG.email}</span>
          </button>
          <span className="sr-only" aria-live="polite">{copied ? 'Email address copied to clipboard' : ''}</span>
        </div>
      </div>
    </section>
  );
}

function DhakaClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const format = () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dhaka' }).format(new Date());
    const update = () => setTime(format());
    const first = window.setTimeout(update, 0);
    const timer = window.setInterval(update, 20000);
    return () => { window.clearTimeout(first); window.clearInterval(timer); };
  }, []);
  return <span className="ft-clock"><i aria-hidden="true" /> Dhaka {time || '--:--'} <small>UTC+6</small></span>;
}

export function HomeFooter() {
  const lenis = useLenis();
  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: 'smooth' }));

  return (
    <footer className="ft">
      <div className="ft-grid">
        <div className="ft-brand">
          <BrandMark />
          <p>Full Stack &amp; DevOps Engineer building web apps, APIs, and the pipelines that ship them.</p>
          <span className="ft-available"><i aria-hidden="true" /> {SITE_CONFIG.availabilityText}</span>
        </div>

        <nav className="ft-col" aria-label="Footer">
          <h3>Navigate</h3>
          <ul>
            {HOME_LINKS.map((link) => (
              <li key={link.href}><Link href={link.href} aria-current={link.href === '/' ? 'page' : undefined}>{link.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="ft-col">
          <h3>Contact</h3>
          <ul>
            <li><a href={`mailto:${SITE_CONFIG.email}`}><Mail size={15} aria-hidden="true" /> {SITE_CONFIG.email}</a></li>
            {SITE_CONFIG.phone && (
              <li><a href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, '')}`}><Phone size={15} aria-hidden="true" /> {SITE_CONFIG.phone}</a></li>
            )}
            <li><span><MapPin size={15} aria-hidden="true" /> {SITE_CONFIG.location}</span></li>
          </ul>
        </div>

        <div className="ft-col">
          <h3>Elsewhere</h3>
          <ul className="ft-socials">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <SocialIcon path={social.path} size={16} />
                  <span>{social.label}</span>
                  <small>{social.handle}</small>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ft-bar">
        <small>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</small>
        <DhakaClock />
        <button type="button" className="ft-top" onClick={toTop}>
          Back to top <ArrowUp size={15} aria-hidden="true" />
        </button>
      </div>

      <p className="ft-word" aria-hidden="true">Mahmudul.</p>
    </footer>
  );
}
