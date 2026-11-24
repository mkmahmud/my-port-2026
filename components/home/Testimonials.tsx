'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Check, Pause, Play } from 'lucide-react';
import { TESTIMONIALS } from '@/components/sections/Testimonials';

const DURATION = 8; // seconds per review while auto-playing
const RING = 2 * Math.PI * 27;
const initials = (name: string) => name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('');

export function TestimonialDeck() {
  const count = TESTIMONIALS.length;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [touched, setTouched] = useState(false);
  const swipe = useRef<number | null>(null);
  const section = useRef<HTMLElement>(null);
  const review = TESTIMONIALS[index];

  useEffect(() => {
    const node = section.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const show = (next: number, byUser = true) => {
    if (byUser) setTouched(true);
    setIndex(((next % count) + count) % count);
  };

  const onKey = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); }
  };

  const down = (event: PointerEvent<HTMLElement>) => { swipe.current = event.clientX; };
  const up = (event: PointerEvent<HTMLElement>) => {
    if (swipe.current === null) return;
    const distance = event.clientX - swipe.current;
    swipe.current = null;
    if (Math.abs(distance) > 70) show(index + (distance < 0 ? 1 : -1));
  };

  const running = playing && inView && !hovered;

  return (
    <section
      ref={section}
      className="tt"
      aria-labelledby="tt-title"
      aria-roledescription="carousel"
      onKeyDown={onKey}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <Image src="/images/home/ribbon.webp" alt="" fill sizes="100vw" className="tt-art" />
      <span className="tt-disc" aria-hidden="true" />
      <span className="tt-glyph" aria-hidden="true">&ldquo;</span>

      <header className="tt-head">
        <p className="tag">Testimonials</p>
        <h2 id="tt-title">What Clients <span>Say.</span></h2>
      </header>

      <div className="tt-stage" onPointerDown={down} onPointerUp={up} onPointerCancel={() => { swipe.current = null; }}>
        <span className="tt-approved"><Check size={13} strokeWidth={3} aria-hidden="true" /> review: approved</span>
        <blockquote key={review.id} className="tt-quote" aria-live={touched ? 'polite' : 'off'}>
          {review.content.split(' ').map((word, i) => (
            <span key={i} style={{ '--w': i } as React.CSSProperties}>{word} </span>
          ))}
        </blockquote>
        <p className="tt-by" key={`${review.id}-by`}>
          <strong>{review.name}</strong>
          <span>{review.role}</span>
        </p>
      </div>

      <div className="tt-people" role="tablist" aria-label="Choose a testimonial">
        {TESTIMONIALS.map((item, i) => {
          const offset = i - (count - 1) / 2;
          const active = i === index;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`${item.name}, ${item.role}`}
              className={`tt-person ${active ? 'is-active' : ''}`}
              style={{ '--off': offset, '--abs': Math.abs(offset) } as React.CSSProperties}
              onClick={() => show(i)}
            >
              <span className="tt-avatar">
                <svg viewBox="0 0 60 60" aria-hidden="true">
                  <circle className="tt-ring-bg" cx="30" cy="30" r="27" />
                  {active && (
                    <circle
                      key={`${index}-${playing}`}
                      className="tt-ring"
                      cx="30"
                      cy="30"
                      r="27"
                      style={{ strokeDasharray: RING, animationDuration: `${DURATION}s`, animationPlayState: running ? 'running' : 'paused' }}
                      onAnimationEnd={() => show(index + 1, false)}
                    />
                  )}
                </svg>
                <b>{initials(item.name)}</b>
              </span>
              <span className="tt-name">{item.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      <div className="tt-controls">
        <button type="button" className="icon-btn" onClick={() => show(index - 1)} aria-label="Previous testimonial"><ArrowLeft size={16} /></button>
        <span className="tt-count" aria-hidden="true"><b>{String(index + 1).padStart(2, '0')}</b> / {String(count).padStart(2, '0')}</span>
        <button type="button" className="icon-btn" onClick={() => show(index + 1)} aria-label="Next testimonial"><ArrowRight size={16} /></button>
        <button type="button" className="icon-btn tt-play" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pause testimonials' : 'Play testimonials'}>
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>
    </section>
  );
}
