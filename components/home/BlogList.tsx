'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CalendarDays, Clock, UserRound, X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { BLOG_POSTS, type BlogPost } from '@/components/sections/Blogs';

const POSTS = BLOG_POSTS;

function Cover({ index }: { index: number }) {
  const line = { fill: 'none', stroke: '#ff6a55', strokeWidth: 1.6 };
  return (
    <svg className="bl-art" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id={`bl-glow-${index}`} cx="65%" cy="40%" r="70%">
          <stop offset="0" stopColor="#5a1520" />
          <stop offset="1" stopColor="#120a0e" />
        </radialGradient>
        <pattern id={`bl-grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="rgba(255,236,232,.05)" />
        </pattern>
      </defs>
      <rect width="320" height="200" fill={`url(#bl-glow-${index})`} />
      <rect width="320" height="200" fill={`url(#bl-grid-${index})`} />
      {index === 0 && (
        <g>
          {[0, 1, 2, 3, 4].map((n) => <rect key={n} x={50 + n * 46} y={92} width="38" height="28" rx="4" {...line} fill={n === 2 ? '#ff5a5f' : 'rgba(255,106,85,.08)'} />)}
          {[0, 1, 2].map((n) => <rect key={n} x={96 + n * 46} y={58} width="38" height="28" rx="4" {...line} opacity=".55" />)}
          <path d="M30 150 C120 180 220 176 296 140" {...line} />
          <path d="M276 132 l20 8 -16 14" {...line} />
        </g>
      )}
      {index === 1 && (
        <g>
          <path d="M112 72 H160 V128 H208" {...line} opacity=".7" />
          <rect x="48" y="48" width="64" height="48" rx="6" {...line} />
          <rect x="136" y="104" width="64" height="48" rx="6" fill="#ff5a5f" />
          <rect x="208" y="48" width="64" height="104" rx="6" {...line} />
          <path d="M48 64 H112 M208 70 H272 M208 92 H272 M208 114 H272" {...line} opacity=".5" />
        </g>
      )}
      {index === 2 && (
        <g>
          <path d="M70 110 L150 60 L250 78 M70 110 L164 148 L250 78 M150 60 L164 148" {...line} opacity=".65" />
          {[[70, 110, 14], [150, 60, 10], [164, 148, 12], [250, 78, 18]].map(([cx, cy, r], n) => (
            <circle key={n} cx={cx} cy={cy} r={r} fill={n === 3 ? '#ff5a5f' : '#140b0f'} stroke="#ff6a55" strokeWidth="1.6" />
          ))}
        </g>
      )}
      {index === 3 && (
        <g>
          {[0, 1, 2].map((n) => <rect key={n} x={80 + n * 10} y={48 + n * 34} width={160 - n * 20} height="26" rx="5" {...line} fill={n === 2 ? '#ff5a5f' : 'rgba(255,106,85,.08)'} />)}
          <path d="M160 74 V82 M160 108 V116" {...line} />
          <circle cx="160" cy="166" r="6" fill="#ff6a55" />
        </g>
      )}
    </svg>
  );
}

/** Home shows a linked list; with `reader`, rows open the full article in a dialog. */
export function BlogList({ reader = false, bare = false }: { reader?: boolean; bare?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [reading, setReading] = useState<{ post: BlogPost; index: number } | null>(null);
  const lenis = useLenis();

  const openPost = (post: BlogPost, index: number) => {
    setReading({ post, index });
    dialog.current?.showModal();
    lenis?.stop();
  };
  const closePost = () => {
    dialog.current?.close();
  };

  const list = useRef<HTMLDivElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const movers = useRef<{ x: (v: number) => void; y: (v: number) => void; r: (v: number) => void } | null>(null);
  const last = useRef(0);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    if (!float.current) return;
    movers.current = {
      x: gsap.quickTo(float.current, 'x', { duration: 0.55, ease: 'power3.out' }),
      y: gsap.quickTo(float.current, 'y', { duration: 0.55, ease: 'power3.out' }),
      r: gsap.quickTo(float.current, 'rotation', { duration: 0.7, ease: 'power3.out' }),
    };
  }, []);

  const follow = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !list.current || !movers.current) return;
    const box = list.current.getBoundingClientRect();
    const x = event.clientX - box.left;
    movers.current.x(x);
    movers.current.y(event.clientY - box.top);
    movers.current.r(gsap.utils.clamp(-7, 7, (x - last.current) * 0.3));
    last.current = x;
  };

  return (
    <section className="bl" aria-labelledby="bl-title">
      {bare ? <h2 id="bl-title" className="sr-only">All articles</h2> : (
        <header className="bl-head">
          <div>
            <p className="tag">From my blog</p>
            <h2 id="bl-title">Latest Insights <span>&amp; Articles.</span></h2>
          </div>
          <Link href="/blogs" className="text-link">View All Posts <ArrowRight size={15} /></Link>
        </header>
      )}

      <div
        ref={list}
        className="bl-list"
        onPointerMove={follow}
        onPointerEnter={(event) => { if (list.current) last.current = event.clientX - list.current.getBoundingClientRect().left; }}
        onPointerLeave={() => setHover(null)}
      >
        {POSTS.map((post, index) => {
          const inner = (
            <>
              <span className="bl-thumb"><Cover index={index % 4} /></span>
              <span className="bl-num">{String(index + 1).padStart(2, '0')}</span>
              <span className="bl-main">
                <span className="bl-cat">{post.category}</span>
                <strong>{post.title}</strong>
              </span>
              <span className="bl-meta"><span>{post.date}</span><span>{post.readTime}</span></span>
              <span className="bl-go" aria-hidden="true"><ArrowUpRight size={18} /></span>
            </>
          );
          const className = `bl-row ${hover !== null && hover !== index ? 'is-dim' : ''}`;
          return reader ? (
            <button key={post.id} type="button" className={className} onPointerEnter={() => setHover(index)} onClick={() => openPost(post, index)} aria-haspopup="dialog">
              {inner}
            </button>
          ) : (
            <Link key={post.id} href="/blogs" className={className} onPointerEnter={() => setHover(index)}>
              {inner}
            </Link>
          );
        })}

        <div ref={float} className={`bl-float ${hover !== null ? 'is-on' : ''}`} aria-hidden="true">
          {POSTS.map((post, index) => (
            <div key={post.id} className={`bl-float-card ${hover === index ? 'is-shown' : ''}`}>
              <Cover index={index % 4} />
              <p>{post.excerpt}</p>
            </div>
          ))}
        </div>
      </div>

      {reader && (
        <dialog
          ref={dialog}
          className="bl-reader"
          aria-labelledby="bl-reader-title"
          onClose={() => { setReading(null); lenis?.start(); }}
          onClick={(event) => { if (event.target === dialog.current) closePost(); }}
        >
          {reading && (
            <article>
              <button type="button" className="bl-close" onClick={closePost} aria-label="Close article"><X size={18} /></button>
              <div className="bl-reader-cover"><Cover index={reading.index % 4} /></div>
              <div className="bl-reader-body">
                <p className="bl-cat">{reading.post.category}</p>
                <h2 id="bl-reader-title">{reading.post.title}</h2>
                <p className="bl-reader-meta">
                  <span><UserRound size={14} aria-hidden="true" /> {reading.post.author}</span>
                  <span><CalendarDays size={14} aria-hidden="true" /> {reading.post.date}</span>
                  <span><Clock size={14} aria-hidden="true" /> {reading.post.readTime}</span>
                </p>
                <p className="bl-lede">{reading.post.excerpt}</p>
                {reading.post.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <Link href="/contact" className="text-link" onClick={closePost}>Talk to me about this <ArrowRight size={15} /></Link>
              </div>
            </article>
          )}
        </dialog>
      )}
    </section>
  );
}
