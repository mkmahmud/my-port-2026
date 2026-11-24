'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Check, Pause, Play } from 'lucide-react';
import { TESTIMONIALS } from '@/components/sections/Testimonials';

const DURATION = 7; // seconds each review stays in front while auto-playing
const initials = (name: string) => name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('');

export function TestimonialDeck() {
  const count = TESTIMONIALS.length;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [touched, setTouched] = useState(false);
  const [dragX, setDragX] = useState(0);
  const drag = useRef<{ start: number; id: number } | null>(null);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = section.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const go = (step: number, byUser = true) => {
    if (byUser) setTouched(true);
    setIndex((current) => (current + step + count) % count);
  };

  const onKey = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); go(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(-1); }
  };

  const down = (event: PointerEvent<HTMLElement>) => {
    drag.current = { start: event.clientX, id: event.pointerId };
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Capture is a nicety; the drag still works without it.
    }
  };
  const move = (event: PointerEvent<HTMLElement>) => {
    if (drag.current?.id === event.pointerId) setDragX(event.clientX - drag.current.start);
  };
  const up = (event: PointerEvent<HTMLElement>) => {
    if (drag.current?.id !== event.pointerId) return;
    const distance = event.clientX - drag.current.start;
    drag.current = null;
    setDragX(0);
    if (Math.abs(distance) > 110) go(distance < 0 ? 1 : -1);
  };

  const running = playing && inView && !hovered && dragX === 0;

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
      <div className="tt-inner">
        <div className="tt-intro">
          <p className="tag">Testimonials</p>
          <h2 id="tt-title">What Clients <span>Say.</span></h2>
          <p className="tt-sub">Words from founders and teams I have shipped with. Drag a card to see the next one.</p>

          <div className="tt-controls">
            <span className="tt-count" aria-hidden="true"><b>{String(index + 1).padStart(2, '0')}</b> / {String(count).padStart(2, '0')}</span>
            <div className="tt-bars" aria-hidden="true">
              {TESTIMONIALS.map((item, dot) => (
                <i key={item.id} className={dot < index ? 'is-done' : ''}>
                  {dot === index && (
                    <b
                      key={`${index}-${playing}`}
                      className="tt-fill"
                      style={{ animationDuration: `${DURATION}s`, animationPlayState: running ? 'running' : 'paused' }}
                      onAnimationEnd={() => go(1, false)}
                    />
                  )}
                </i>
              ))}
            </div>
            <div className="tt-buttons">
              <button type="button" className="icon-btn" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pause testimonials' : 'Play testimonials'}>
                {playing ? <Pause size={15} /> : <Play size={15} />}
              </button>
              <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Previous testimonial"><ArrowLeft size={16} /></button>
              <button type="button" className="tt-next" onClick={() => go(1)} aria-label="Next testimonial"><ArrowRight size={18} /></button>
            </div>
          </div>
        </div>

        <div className="tt-deck">
          {TESTIMONIALS.map((item, i) => {
            const offset = (i - index + count) % count;
            const front = offset === 0;
            return (
              <figure
                key={item.id}
                className={`tt-card ${front ? 'is-front' : ''} ${front && dragX !== 0 ? 'is-dragging' : ''}`}
                style={{
                  '--o': offset,
                  '--drag': front ? `${dragX}px` : '0px',
                  '--tilt': front ? dragX * 0.04 : 0,
                  zIndex: count - offset,
                } as React.CSSProperties}
                aria-hidden={!front}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                onPointerDown={front ? down : undefined}
                onPointerMove={front ? move : undefined}
                onPointerUp={front ? up : undefined}
                onPointerCancel={front ? up : undefined}
              >
                <div className="tt-card-head">
                  <span className="tt-mark" aria-hidden="true">&ldquo;</span>
                  <span className="tt-approved"><Check size={13} strokeWidth={3} aria-hidden="true" /> review: approved</span>
                </div>
                <blockquote aria-live={touched && front ? 'polite' : 'off'}>{item.content}</blockquote>
                <figcaption>
                  <span className="tt-avatar" aria-hidden="true">{initials(item.name)}</span>
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.role}</small>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
