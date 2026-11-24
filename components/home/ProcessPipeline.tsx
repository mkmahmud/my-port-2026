'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, CodeXml, FlaskConical, MessagesSquare, Rocket } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STAGES = [
  { icon: MessagesSquare, title: 'Plan & Discuss', text: 'Understand your goals, then scope the work and the architecture.', chips: ['Requirements', 'Architecture'], job: 'plan' },
  { icon: CodeXml, title: 'Build & Develop', text: 'Write clean, typed, scalable code in small reviewed steps.', chips: ['Clean code', 'Code review'], job: 'build' },
  { icon: FlaskConical, title: 'Test & Optimize', text: 'Automated tests and performance passes before anything ships.', chips: ['Automated tests', 'Performance'], job: 'test' },
  { icon: Rocket, title: 'Launch & Support', text: 'Deploy through CI/CD, then monitor and keep improving.', chips: ['CI/CD deploy', 'Monitoring'], job: 'deploy' },
];

// Pipeline track in a 1200 x 220 box. Nodes sit on alternating crests and troughs.
const NODES = [[150, 60], [450, 160], [750, 60], [1050, 160]] as const;
const TRACK = 'M0 110 C 60 60, 100 60, 150 60 S 360 160, 450 160 S 660 60, 750 60 S 960 160, 1050 160 S 1160 110, 1200 110';

export function ProcessPipeline() {
  const section = useRef<HTMLElement>(null);
  const lit = useRef<SVGPathElement>(null);
  const packet = useRef<HTMLSpanElement>(null);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const node = section.current;
    const path = lit.current;
    if (!node || !path) return;
    gsap.registerPlugin(ScrollTrigger);

    const total = path.getTotalLength();
    // Where along the track each stage node sits, as a fraction of its length.
    const marks = NODES.map(([x]) => {
      let lo = 0;
      let hi = total;
      for (let i = 0; i < 24; i++) {
        const mid = (lo + hi) / 2;
        if (path.getPointAtLength(mid).x < x) lo = mid; else hi = mid;
      }
      return lo / total;
    });
    path.style.strokeDasharray = `${total}`;

    const render = (progress: number) => {
      const wide = window.matchMedia('(min-width: 900px)').matches;
      const thresholds = wide ? marks : STAGES.map((_, i) => (i + 0.35) / STAGES.length);
      setReached(thresholds.filter((mark) => progress >= mark - 0.004).length);
      node.style.setProperty('--pp', progress.toFixed(4));
      path.style.strokeDashoffset = `${total * (1 - progress)}`;
      if (packet.current && wide) {
        const point = path.getPointAtLength(total * progress);
        packet.current.style.left = `${(point.x / 1200) * 100}%`;
        packet.current.style.top = `${(point.y / 220) * 100}%`;
      }
    };

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      render(0);
      const st = ScrollTrigger.create({
        trigger: '.pp-board',
        start: 'top 72%',
        end: 'bottom 58%',
        scrub: 0.6,
        onUpdate: (self) => render(self.progress),
      });
      gsap.from('.pp-head > *', { y: 28, autoAlpha: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', clearProps: 'transform,opacity,visibility', scrollTrigger: { trigger: node, start: 'top 75%', once: true } });
      return () => st.kill();
    });
    mm.add('(prefers-reduced-motion: reduce)', () => render(1));
    return () => mm.revert();
  }, []);

  const done = reached === STAGES.length;
  const running = STAGES[Math.min(reached, STAGES.length - 1)];

  return (
    <section ref={section} className="pp" aria-labelledby="pp-title">
      <div className="pp-glow" aria-hidden="true" />
      <header className="pp-head">
        <div>
          <p className="tag">My process</p>
          <h2 id="pp-title">A Simple <span>Process.</span></h2>
          <p className="pp-sub">From idea to impact, one stage at a time, the same way I ship code.</p>
        </div>
        <div className={`pp-status ${done ? 'is-done' : ''}`} aria-hidden="true">
          <span className="pp-status-text">
            {done ? 'Pipeline passed · shipped' : reached === 0 ? 'Pipeline queued' : `Running · ${running.job}`}
          </span>
          <span className="pp-status-count">{reached}/{STAGES.length}</span>
        </div>
      </header>

      <div className="pp-board">
        <div className="pp-row pp-row-top">
          {STAGES.map((stage, index) => (index % 2 === 0 ? <StageCard key={stage.job} index={index} reached={reached} /> : <span key={stage.job} className="pp-gap" />))}
        </div>

        <div className="pp-track" aria-hidden="true">
          <svg viewBox="0 0 1200 220" preserveAspectRatio="none">
            <path className="pp-rail" d={TRACK} />
            <path ref={lit} className="pp-lit" d={TRACK} />
          </svg>
          {NODES.map(([x, y], index) => (
            <span key={x} className={`pp-node ${index < reached ? 'is-on' : ''}`} style={{ left: `${(x / 1200) * 100}%`, top: `${(y / 220) * 100}%` }}>
              {index < reached ? <Check size={14} strokeWidth={3} /> : String(index + 1).padStart(2, '0')}
            </span>
          ))}
          <span ref={packet} className="pp-packet" />
        </div>

        <div className="pp-row pp-row-bottom">
          {STAGES.map((stage, index) => (index % 2 === 1 ? <StageCard key={stage.job} index={index} reached={reached} /> : <span key={stage.job} className="pp-gap" />))}
        </div>

        <ol className="pp-list">
          {STAGES.map((stage, index) => <StageCard key={stage.job} index={index} reached={reached} as="li" />)}
        </ol>
      </div>
    </section>
  );
}

function StageCard({ index, reached, as = 'article' }: { index: number; reached: number; as?: 'article' | 'li' }) {
  const { icon: Icon, title, text, chips, job } = STAGES[index];
  const passed = index < reached;
  const active = index === reached;
  const Tag = as;
  return (
    <Tag className={`pp-card ${passed ? 'is-passed' : ''} ${active ? 'is-active' : ''}`}>
      <div className="pp-card-top">
        <span className="pp-icon"><Icon size={22} aria-hidden="true" /></span>
        <span className="pp-num">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      <ul>{chips.map((chip) => <li key={chip}>{chip}</li>)}</ul>
      <p className="pp-job" aria-hidden="true">
        <span>job/{job}</span>
        <b>{passed ? '✓ passed' : active ? '● running' : '○ queued'}</b>
      </p>
    </Tag>
  );
}
