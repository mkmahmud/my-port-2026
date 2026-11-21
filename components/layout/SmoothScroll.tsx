'use client';

import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenis = useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (!lenis) return;

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // The <html> element is pinned to 100% height (see globals.css), so its
    // box never grows with content and Lenis's own ResizeObserver on it never
    // fires when late content (web fonts swapping in, async data) changes the
    // page's real scroll height. Re-measure explicitly at the points that
    // actually change layout after first paint.
    const resize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    document.fonts?.ready?.then(resize);
    window.addEventListener('load', resize);

    const bodyResizeObserver = new ResizeObserver(resize);
    bodyResizeObserver.observe(document.body);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener('load', resize);
      bodyResizeObserver.disconnect();
    };
  }, [lenis]);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        duration: 1.1,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1,
        anchors: true,
        respectReducedMotion: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
