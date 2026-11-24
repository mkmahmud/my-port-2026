'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';

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
        <Image src="/logo.png" alt="" width={36} height={23} loading="eager" />
      </span>
      <span className="brand-name">Mahmudul<span>.</span></span>
    </Link>
  );
}

export function HomeNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    <header className="nav-wrap">
      <nav className={`nav ${scrolled ? 'is-scrolled' : ''}`} aria-label="Main">
        <BrandMark />
        <div className="nav-links">
          {HOME_LINKS.map((link) => (
            <Link key={link.href} href={link.href} aria-current={link.href === '/' ? 'page' : undefined}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <Link href="/contact" className="btn btn-primary btn-sm nav-cta">
            Let&apos;s Talk <ArrowRight size={14} />
          </Link>
          <button
            type="button"
            className="icon-btn nav-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="home-menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      <div id="home-menu" className={`nav-sheet ${open ? 'is-open' : ''}`} hidden={!open}>
        {HOME_LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label} <ArrowRight size={16} />
          </Link>
        ))}
        <Link href="/contact" className="btn btn-primary" onClick={() => setOpen(false)}>
          Let&apos;s Talk <ArrowRight size={16} />
        </Link>
      </div>
    </header>
  );
}
