'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface NumberCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const NumberCounter: React.FC<NumberCounterProps> = ({
  end,
  suffix = '',
  duration = 1.5,
  className = '',
}) => {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const hasAnimated = useRef(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      const frameId = window.requestAnimationFrame(() => {
        setDisplayValue(end);
        hasAnimated.current = true;
      });
      return () => window.cancelAnimationFrame(frameId);
    }

    const obj = { value: 0 };

    const tween = gsap.to(obj, {
      value: end,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplayValue(Math.round(obj.value));
      },
      onComplete: () => {
        setDisplayValue(end);
        hasAnimated.current = true;
      },
    });

    return () => tween.kill();
  }, [inView, end, duration]);

  return (
    <span ref={elementRef} className={`font-mono tabular-nums ${className}`}>
      {displayValue}{suffix}
    </span>
  );
};
