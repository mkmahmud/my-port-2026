'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Cloud, CodeXml, Send, Zap } from 'lucide-react';
import { BLOG_POSTS } from '@/components/sections/Blogs';
import { TESTIMONIALS } from '@/components/sections/Testimonials';
import { useProjects } from '@/hooks/useProjects';
import { BIO, DEFAULT_PROJECTS, SITE_CONFIG, STATS } from '@/lib/constants';
import type { Project } from '@/lib/types';
import { BRAND_ICONS, type BrandIconName } from './brandIcons';
import { BrandMark, HOME_LINKS } from './HomeNav';

function BrandIcon({ name, size = 22 }: { name: BrandIconName; size?: number }) {
  const icon = BRAND_ICONS[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={icon.color} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

function SectionIntro({ label, title, children, href, cta }: {
  label: string;
  title: ReactNode;
  children: ReactNode;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="intro">
      <p className="tag">{label}</p>
      <h2>{title}</h2>
      <p className="intro-copy">{children}</p>
      {href && cta && (
        <Link href={href} className="text-link">
          {cta} <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}

export function HomeHero() {
  const chips: { name: BrandIconName; className: string }[] = [
    { name: 'aws', className: 'chip-a' },
    { name: 'next', className: 'chip-b' },
    { name: 'docker', className: 'chip-c' },
    { name: 'postgres', className: 'chip-d' },
  ];

  return (
    <section className="hero" aria-labelledby="hero-title">
      <Image src="/images/home/hero-ridge.webp" alt="" fill preload sizes="100vw" className="hero-bg" />
      <div className="hero-rings" aria-hidden="true" />
      <div className="hero-stage">
        <div className="hero-portrait">
          <Image
            src="/images/home/portrait-matte.webp"
            alt="Mahmudul Hasan wearing a dark cap, glasses, and a white shirt"
            fill
            preload
            sizes="(max-width: 700px) 92vw, 640px"
          />
        </div>
        {chips.map(({ name, className }) => (
          <span key={name} className={`float-chip ${className}`}>
            <BrandIcon name={name} size={24} /> {BRAND_ICONS[name].label}
          </span>
        ))}
        {SITE_CONFIG.available && (
          <span className="status-chip"><i aria-hidden="true" /> {SITE_CONFIG.availabilityText}</span>
        )}
      </div>
      <div className="hero-copy">
        <h1 id="hero-title">I build things.<span>Then make them scale.</span></h1>
        <p className="hero-role">Full Stack &amp; DevOps Engineer</p>
        <div className="hero-actions">
          <Link href="/projects" className="btn btn-primary">Explore Projects <ArrowRight size={16} /></Link>
          <Link href="/contact" className="btn btn-ghost">Let&apos;s Connect</Link>
        </div>
      </div>
    </section>
  );
}

export function TechStrip() {
  const names: BrandIconName[] = ['aws', 'vercel', 'docker', 'postgres', 'next'];
  return (
    <section className="strip" aria-label="Technologies I work with">
      <p>Technologies I build <br />and ship with</p>
      <ul>
        {names.map((name) => (
          <li key={name}><BrandIcon name={name} size={22} /> {BRAND_ICONS[name].label}</li>
        ))}
      </ul>
    </section>
  );
}

function GlassCube() {
  const cells: [number, number, number][] = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (Math.abs(x) + Math.abs(y) + Math.abs(z) !== 3 || y !== -1 || x === z) cells.push([x, y, z]);
      }
    }
  }
  return (
    <div className="cube-panel" aria-hidden="true">
      <Image src="/images/home/ribbon.webp" alt="" fill sizes="(max-width: 900px) 100vw, 480px" />
      <div className="cube-scene">
        <div className="cube-rig">
          {cells.map(([x, y, z]) => {
            const core = x === 0 && y === 0 && z === 0;
            return (
              <div
                key={`${x}${y}${z}`}
                className={`cell ${core ? 'is-core' : ''}`}
                style={{ transform: `translate3d(${x * 58}px, ${y * 58}px, ${z * 58}px)` }}
              >
                {['front', 'back', 'left', 'right', 'top', 'bottom'].map((face) => <b key={face} className={face} />)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function WhatIDo() {
  const services = [
    { icon: CodeXml, title: 'Full Stack Development', text: 'Modern, scalable and high-performance apps.' },
    { icon: Cloud, title: 'DevOps & CI/CD', text: 'Automate, deploy and scale with confidence.' },
    { icon: Zap, title: 'Backend & APIs', text: 'Robust APIs and microservices.' },
  ];
  return (
    <section className="band what">
      <SectionIntro
        label="What I do"
        title={<>Turning Ideas Into <em>Real</em> Products</>}
        href="/services"
        cta="Explore Services"
      >
        I specialize in building modern web applications, scalable infrastructure and seamless user experiences.
      </SectionIntro>
      <GlassCube />
      <ul className="service-list">
        {services.map(({ icon: Icon, title, text }) => (
          <li key={title}>
            <span className="service-icon"><Icon size={24} /></span>
            <div><h3>{title}</h3><p>{text}</p></div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function projectImage(project: Project) {
  return project.thumbnailUrl || project.gellaryImages?.[0] || project.images?.[0] || '/images/projects/codex-edumine.svg';
}

function ProjectTile({ project, large }: { project: Project; large?: boolean }) {
  const title = project.title || project.projectTitle || 'Untitled project';
  const image = projectImage(project);
  const summary = project.description || (Array.isArray(project.overview) ? project.overview[0] : project.overview);
  return (
    <Link href={`/projects/${project.slug}`} className={`work-tile ${large ? 'is-large' : ''}`}>
      <Image
        src={image}
        alt=""
        fill
        loading="eager"
        unoptimized={image.endsWith('.svg')}
        sizes={large ? '(max-width: 900px) 100vw, 560px' : '(max-width: 900px) 100vw, 420px'}
      />
      <span className="work-copy">
        <span><strong>{title}</strong>{summary && <small>{summary}</small>}</span>
        <span className="round-arrow"><ArrowRight size={16} /></span>
      </span>
    </Link>
  );
}

export function RecentWork() {
  const { projects, isLoading } = useProjects();
  const source = projects.length > 0 ? projects : isLoading ? [] : DEFAULT_PROJECTS;
  const featured = [...source].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))).slice(0, 3);

  return (
    <section className="band work">
      <SectionIntro
        label="Featured projects"
        title={<>Some of My<br />Recent Work</>}
        href="/projects"
        cta="View All Projects"
      >
        A selection of projects I&apos;ve worked on recently.
      </SectionIntro>
      <div className="work-grid" aria-busy={isLoading}>
        {featured.length === 0
          ? [0, 1, 2].map((item) => <div key={item} className={`work-tile is-loading ${item === 0 ? 'is-large' : ''}`} />)
          : featured.map((project, index) => <ProjectTile key={project._id} project={project} large={index === 0} />)}
      </div>
    </section>
  );
}

export function AboutStack() {
  const stats = [
    { value: `${STATS.yearsExperience}+`, label: 'Years Experience' },
    { value: `${STATS.projectsShipped}+`, label: 'Projects Shipped' },
    { value: `${STATS.technologies}+`, label: 'Technologies' },
  ];
  const stack: BrandIconName[] = ['react', 'next', 'node', 'docker', 'aws', 'postgres'];
  return (
    <section className="band about">
      <div className="about-photo">
        <Image src="/images/home/portrait-matte.webp" alt="Portrait of Mahmudul Hasan" fill loading="eager" sizes="(max-width: 900px) 90vw, 320px" />
      </div>
      <div className="about-copy">
        <p className="tag tag-dot">About me</p>
        <h2>Hi, I&apos;m {SITE_CONFIG.name}</h2>
        <p>{BIO.split('. ')[0]}.</p>
        <dl>
          {stats.map((stat) => <div key={stat.label}><dd>{stat.value}</dd><dt>{stat.label}</dt></div>)}
        </dl>
      </div>
      <div className="about-stack">
        <p className="tag tag-dot">Tech stack</p>
        <h2>My Tech Stack</h2>
        <p>Modern tools I work with.</p>
        <ul>
          {stack.map((name) => (
            <li key={name} title={BRAND_ICONS[name].label}>
              <BrandIcon name={name} size={30} />
              <span className="sr-only">{BRAND_ICONS[name].label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProcessSteps() {
  const steps = [
    ['Plan & Discuss', 'Understand your needs and plan the solution.'],
    ['Build & Develop', 'Write clean and scalable code.'],
    ['Test & Optimize', 'Ensure quality and performance.'],
    ['Launch & Support', 'Deploy and provide ongoing support.'],
  ];
  return (
    <section className="band process">
      <SectionIntro label="My process" title={<>A Simple<br />Process</>}>
        From idea to impact, step by step.
      </SectionIntro>
      <ol>
        {steps.map(([title, text], index) => (
          <li key={title}>
            <span className="step-no">{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function QuoteBand() {
  const [index, setIndex] = useState(0);
  const quote = TESTIMONIALS[index];
  const move = (step: number) => setIndex((current) => (current + step + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="quote-wrap" aria-label="Client testimonials">
      <Image src="/images/home/ribbon.webp" alt="" fill sizes="100vw" className="band-art" />
      <figure className="quote">
        <span className="quote-mark" aria-hidden="true">&ldquo;</span>
        <div aria-live="polite">
          <blockquote>{quote.content}</blockquote>
          <figcaption>{quote.name}, {quote.role}</figcaption>
        </div>
        <div className="quote-controls">
          <span className="dots" aria-hidden="true">
            {TESTIMONIALS.map((item, dot) => <i key={item.id} className={dot === index ? 'is-on' : ''} />)}
          </span>
          <button type="button" className="icon-btn" onClick={() => move(-1)} aria-label="Previous testimonial"><ArrowLeft size={16} /></button>
          <button type="button" className="icon-btn" onClick={() => move(1)} aria-label="Next testimonial"><ArrowRight size={16} /></button>
        </div>
      </figure>
    </section>
  );
}

function BlogCover({ index }: { index: number }) {
  const stroke = { fill: 'none', stroke: '#FC6C60', strokeWidth: 1.5 };
  return (
    <svg className="blog-cover" viewBox="0 0 320 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="320" height="130" fill="#1B0E13" />
      {index === 0 && [0, 1, 2, 3, 4].map((n) => (
        <g key={n}>
          <rect x={58 + n * 42} y={54} width="36" height="26" rx="3" {...stroke} fill={n === 2 ? '#FC6C60' : 'none'} />
          {n < 3 && <rect x={100 + n * 42} y={24} width="36" height="26" rx="3" {...stroke} opacity=".55" />}
        </g>
      ))}
      {index === 0 && <path d="M28 96 C110 122 210 118 292 88" {...stroke} />}
      {index === 1 && (
        <g>
          <path d="M104 44 H160 V84 H216" {...stroke} opacity=".7" />
          <rect x="44" y="24" width="60" height="42" rx="4" {...stroke} />
          <rect x="130" y="64" width="60" height="42" rx="4" fill="#FC6C60" />
          <rect x="216" y="24" width="60" height="82" rx="4" {...stroke} />
          <path d="M44 38 H104 M216 40 H276 M216 58 H276 M216 76 H276" {...stroke} opacity=".6" />
        </g>
      )}
      {index === 2 && (
        <g>
          <path d="M70 65 L150 32 L250 44 M70 65 L160 96 L250 44 M150 32 L160 96" {...stroke} opacity=".65" />
          {[[70, 65, 13], [150, 32, 9], [160, 96, 11], [250, 44, 15]].map(([cx, cy, r], n) => (
            <circle key={n} cx={cx} cy={cy} r={r} fill={n === 3 ? '#FC6C60' : '#1B0E13'} stroke="#FC6C60" strokeWidth="1.5" />
          ))}
        </g>
      )}
    </svg>
  );
}

export function Insights() {
  return (
    <section className="band insights">
      <SectionIntro
        label="From my blog"
        title={<>Latest Insights<br />&amp; Articles</>}
        href="/blogs"
        cta="View All Posts"
      >
        Thoughts, tutorials and ideas from my journey.
      </SectionIntro>
      <div className="post-grid">
        {BLOG_POSTS.slice(0, 3).map((post, index) => (
          <Link href="/blogs" className="post" key={post.id}>
            <BlogCover index={index} />
            <span className="post-copy"><strong>{post.title}</strong><small>{post.date}</small></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

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
