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

    return () => {
      gsap.ticker.remove(update);
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
