'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  splitType?: 'words' | 'chars' | 'lines';
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  as: Component = 'p',
  className = '',
  delay = 0,
  splitType = 'words',
}) => {
  const elementRef = useRef<HTMLElement>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!elementRef.current || prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const ctx = gsap.context(() => {
      const split = new SplitText(elementRef.current, {
        type: splitType,
      });

      const targets: HTMLElement[] = Array.from(
        (splitType === 'chars'
          ? split.chars
          : splitType === 'lines'
          ? split.lines
          : split.words) || []
      ) as HTMLElement[];

      // Wrap in mask to create clip-path reveal effect
      const wrappedTargets = targets.map((target: HTMLElement) => {
        const wrapper = document.createElement('span');
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';
        wrapper.style.verticalAlign = 'top';
        target.parentNode?.insertBefore(wrapper, target);
        wrapper.appendChild(target);
        return target;
      });

      gsap.from(wrappedTargets, {
        yPercent: 100,
        stagger: 0.05,
        ease: 'power3.out',
        duration: 0.8,
        delay,
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 85%',
        },
      });
    });

    return () => ctx.revert();
  }, [prefersReduced, delay, splitType]);

  if (Component === 'h1') return <h1 ref={elementRef as React.RefObject<HTMLHeadingElement | null>} className={className}>{children}</h1>;
  if (Component === 'h2') return <h2 ref={elementRef as React.RefObject<HTMLHeadingElement | null>} className={className}>{children}</h2>;
  if (Component === 'h3') return <h3 ref={elementRef as React.RefObject<HTMLHeadingElement | null>} className={className}>{children}</h3>;
  if (Component === 'span') return <span ref={elementRef as React.RefObject<HTMLSpanElement | null>} className={className}>{children}</span>;
  return <p ref={elementRef as React.RefObject<HTMLParagraphElement | null>} className={className}>{children}</p>;
};
