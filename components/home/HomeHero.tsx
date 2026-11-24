import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Send } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { BRAND_ICONS, type BrandIconName } from './brandIcons';

// Stage coordinates use a 1000 x 430 box so chips, wires, and the disc line up.
const CHIPS: { name: BrandIconName; x: number; y: number; wire: string }[] = [
  { name: 'aws', x: 131, y: 128, wire: 'M188 128 C 240 128, 262 170, 304 196' },
  { name: 'next', x: 84, y: 243, wire: 'M146 243 C 200 243, 228 262, 262 286' },
  { name: 'docker', x: 856, y: 139, wire: 'M780 139 C 740 139, 724 168, 694 196' },
  { name: 'postgres', x: 910, y: 257, wire: 'M832 257 C 790 257, 766 272, 740 290' },
];

const SHARDS = [
  { left: '7%', top: '43%', size: 118, rotate: -14, delay: 0 },
  { left: '10%', top: '22%', size: 34, rotate: 22, delay: -2 },
  { left: '14%', top: '50%', size: 36, rotate: 8, delay: -4 },
  { left: '11%', top: '66%', size: 46, rotate: -30, delay: -1 },
  { left: '92%', top: '43%', size: 92, rotate: 18, delay: -3 },
  { left: '82%', top: '54%', size: 34, rotate: -12, delay: -5 },
];

const SOCIALS = [
  { label: 'GitHub', href: SITE_CONFIG.github, path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
  { label: 'LinkedIn', href: SITE_CONFIG.linkedin, path: 'M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z' },
  { label: 'Facebook', href: 'https://www.facebook.com/mkmahmuddev/', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
];

function Shard({ size, rotate, delay, left, top }: (typeof SHARDS)[number]) {
  return (
    <svg
      className="hx-shard"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ left, top, rotate: `${rotate}deg`, animationDelay: `${delay}s` }}
      aria-hidden="true"
    >
      <polygon points="18,32 52,10 86,28 54,46" fill="#2b1b20" />
      <polygon points="18,32 54,46 50,90 12,70" fill="#100a0c" />
      <polygon points="54,46 86,28 82,70 50,90" fill="#1d1216" />
      <polyline points="86,28 82,70 50,90" fill="none" stroke="#ff6a55" strokeWidth="1.6" strokeOpacity=".85" />
      <polyline points="52,10 86,28" fill="none" stroke="#ff9a8a" strokeWidth="1" strokeOpacity=".6" />
    </svg>
  );
}

export function HomeHero() {
  return (
    <section className="hx" aria-labelledby="hero-title">
      <Image src="/images/home/hero-plate.webp" alt="" fill preload sizes="100vw" className="hx-plate" />
      <span className="hx-watermark" aria-hidden="true">MH</span>
      {SHARDS.map((shard) => <Shard key={`${shard.left}${shard.top}`} {...shard} />)}

      <div className="hx-stage">
        <div className="hx-orbit" aria-hidden="true" />
        <div className="hx-disc" aria-hidden="true" />
        <svg className="hx-wires" viewBox="0 0 1000 430" aria-hidden="true">
          {CHIPS.map((chip, index) => (
            <g key={chip.name}>
              <path id={`wire-${chip.name}`} d={chip.wire} />
              <circle r="3.2" className="hx-packet">
                <animateMotion dur="2.8s" begin={`${index * 0.7}s`} repeatCount="indefinite">
                  <mpath href={`#wire-${chip.name}`} />
                </animateMotion>
              </circle>
            </g>
          ))}
        </svg>
        <div className="hx-portrait">
          <Image
            src="/images/home/portrait-matte.webp"
            alt="Mahmudul Hasan wearing a dark cap, glasses, and a white shirt"
            fill
            preload
            sizes="(max-width: 700px) 92vw, 560px"
          />
        </div>
        {CHIPS.map((chip) => (
          <span
            key={chip.name}
            className={`hx-chip hx-chip-${chip.name}`}
            style={{ left: `${chip.x / 10}%`, top: `${(chip.y / 430) * 100}%` }}
          >
            {chip.name === 'aws' ? (
              <svg className="hx-aws" viewBox="0 0 24 24" aria-label="AWS" role="img">
                <path d={BRAND_ICONS.aws.path} />
              </svg>
            ) : (
              <>
                <span className={`hx-chip-icon ${chip.name === 'next' ? 'is-next' : ''}`}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill={chip.name === 'next' ? '#fff' : BRAND_ICONS[chip.name].color} aria-hidden="true">
                    <path d={BRAND_ICONS[chip.name].path} />
                  </svg>
                </span>
                {BRAND_ICONS[chip.name].label}
              </>
            )}
          </span>
        ))}
      </div>

      <div className="hx-copy">
        <h1 id="hero-title">
          <span className="hx-line-1">I build things.</span>
          <span className="hx-line-2">
            Then make them scale.
            <svg className="hx-swoosh" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="swoosh" x1="0" x2="1">
                  <stop offset="0" stopColor="#ff6a4d" />
                  <stop offset=".7" stopColor="#ff4f6e" />
                  <stop offset="1" stopColor="#ff4f6e" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M4 34 C 90 10, 230 2, 398 6 C 240 8, 110 18, 10 38 Z" fill="url(#swoosh)" />
            </svg>
          </span>
        </h1>
        <p className="hx-role">Full Stack &amp; DevOps Engineer</p>
        <div className="hx-actions">
          <Link href="/projects" className="hx-primary">
            Explore Projects
            <span aria-hidden="true"><ArrowRight size={15} /></span>
          </Link>
          <Link href="/contact" className="hx-secondary">
            <span aria-hidden="true"><Send size={16} /></span>
            Let&apos;s Connect
          </Link>
        </div>
      </div>

      <nav className="hx-rail" aria-label="Social profiles">
        {SOCIALS.map((social) => (
          <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={social.path} /></svg>
          </a>
        ))}
      </nav>

      <a href="#explore" className="hx-scroll">
        <span className="hx-mouse" aria-hidden="true"><i /></span>
        Scroll to explore
      </a>

    </section>
  );
}
