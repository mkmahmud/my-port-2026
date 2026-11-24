'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { SITE_CONFIG } from '@/lib/constants';
import { SOCIALS, SocialIcon } from './socials';

export const HOME_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Process', href: '/process' },
  { label: 'Blog', href: '/blogs' },
  { label: 'About', href: '/about' },
  { label: 'Testimonials', href: '/testimonials' },
];

export function BrandMark() {
  return (
    <Link href="/" className="brand" aria-label="Mahmudul Hasan, home">
      <span className="brand-ring">
        <Image src="/logo.png" alt="" width={36} height={23} loading="eager" style={{ width: 24, height: 'auto' }} />
      </span>
      <span className="brand-name">Mahmudul<span>.</span></span>
    </Link>
  );
}

export function HomeNav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLElement>(null);
  const links = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);

  // Lenis drives the progress line and the hide-on-scroll-down behaviour.
  const lenis = useLenis((instance) => {
    const progress = instance.limit > 0 ? instance.scroll / instance.limit : 0;
    bar.current?.style.setProperty('--nav-progress', progress.toFixed(4));
    setScrolled(instance.scroll > 16);
    setHidden(instance.scroll > 240 && instance.direction === 1);
  });

  const moveTo = useCallback((target: HTMLElement | null) => {
    if (!target || !links.current || !pill.current) return;
    const box = links.current.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    pill.current.style.setProperty('--x', `${rect.left - box.left}px`);
    pill.current.style.setProperty('--w', `${rect.width}px`);
  }, []);

  const rest = useCallback(() => moveTo(links.current?.querySelector<HTMLElement>('[aria-current="page"]') ?? null), [moveTo]);

  useEffect(() => {
    rest();
    window.addEventListener('resize', rest);
    document.fonts?.ready?.then(rest);
    return () => window.removeEventListener('resize', rest);
  }, [rest]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    lenis?.stop();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [open, lenis]);

  return (
    <header className={`nav-wrap ${hidden && !open ? 'is-hidden' : ''}`}>
      <nav ref={bar} className={`nav ${scrolled ? 'is-scrolled' : ''}`} aria-label="Main">
        <BrandMark />
        <div ref={links} className="nav-links" onPointerLeave={rest}>
          <span ref={pill} className="nav-pill" aria-hidden="true" />
          {HOME_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.href === '/' ? 'page' : undefined}
              onPointerEnter={(event) => moveTo(event.currentTarget)}
              onFocus={(event) => moveTo(event.currentTarget)}
              onBlur={rest}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <Link href="/contact" className="nav-cta">
            <i aria-hidden="true" />
            Let&apos;s Talk
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="nav-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="home-menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <span className="nav-progress" aria-hidden="true" />
      </nav>

      <div id="home-menu" className={`menu ${open ? 'is-open' : ''}`} hidden={!open}>
        <span className="menu-disc" aria-hidden="true" />
        <ol className="menu-links">
          {HOME_LINKS.map((link, index) => (
            <li key={link.href} style={{ '--i': index } as React.CSSProperties}>
              <Link href={link.href} onClick={() => setOpen(false)} aria-current={link.href === '/' ? 'page' : undefined}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {link.label}
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
        <div className="menu-foot">
          <a href={`mailto:${SITE_CONFIG.email}`} className="menu-mail">{SITE_CONFIG.email}</a>
          <div className="menu-socials">
            {SOCIALS.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                <SocialIcon path={social.path} />
              </a>
            ))}
          </div>
          <Link href="/contact" className="hx-primary" onClick={() => setOpen(false)}>
            Let&apos;s Talk <span aria-hidden="true"><ArrowRight size={15} /></span>
          </Link>
        </div>
      </div>
    </header>
  );
}
