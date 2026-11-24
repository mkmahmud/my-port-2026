'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Send } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { BrandMark, HOME_LINKS } from './HomeNav';

export function ClosingCta() {
  return (
    <section className="cta-wrap">
      <Image src="/images/home/ribbon.webp" alt="" fill sizes="100vw" className="band-art" />
      <div className="cta">
        <Send size={40} aria-hidden="true" />
        <div>
          <h2>Let&apos;s Build Something Amazing Together</h2>
          <p>Have a project in mind? Let&apos;s turn your ideas into reality.</p>
        </div>
        <Link href="/contact" className="btn btn-primary">Get in Touch <ArrowRight size={16} /></Link>
      </div>
    </section>
  );
}

const SOCIALS = [
  { label: 'GitHub', href: SITE_CONFIG.github, path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
  { label: 'LinkedIn', href: SITE_CONFIG.linkedin, path: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.27 1.64 1.64 0 0 0 0 3.27m1.39 9.74v-8.37H5.07v8.37h2.78z' },
  { label: 'X', href: 'https://x.com/mahmudulmk4', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { label: 'Facebook', href: 'https://www.facebook.com/mkmahmuddev/', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
];

export function HomeFooter() {
  return (
    <footer className="foot">
      <BrandMark />
      <nav aria-label="Footer">
        {HOME_LINKS.filter((link) => link.label !== 'Process').map((link) => (
          <Link key={link.href} href={link.href} aria-current={link.href === '/' ? 'page' : undefined}>{link.label}</Link>
        ))}
      </nav>
      <div className="foot-end">
        <div className="socials">
          {SOCIALS.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={social.path} /></svg>
            </a>
          ))}
        </div>
        <small>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</small>
      </div>
    </footer>
  );
}
