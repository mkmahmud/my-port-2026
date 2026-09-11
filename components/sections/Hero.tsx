'use client';

import React from 'react';
import Image from 'next/image';
import { Button, CapsuleGroup } from '@/components/ui/Button';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden bg-[#FAF6EE]"
    >
      {/* 1440px Desktop Max Width Container with responsive padding */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex-1 flex flex-col justify-between relative">

        {/* TOP HEADER GROUP */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto z-20 pt-2">

          {/* Main Headline with Stamp */}
          <div className="relative inline-block px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[82px] font-heading font-extrabold tracking-tight text-[#181512] leading-[1.08]">
              I&apos;m <span className="text-[#F6991A]">Mahmudul Hasan</span>
              <span className="inline-block text-[#181512] text-xl sm:text-3xl ml-1 align-top opacity-70">✦</span>
            </h1>

            {/* Circular Scalloped "HIRE ME" Stamp Badge (Desktop) */}
            <div className="hidden lg:block absolute -right-24 xl:-right-32 -top-2 select-none pointer-events-auto">
              <a
                href="#contact"
                className="relative w-24 h-24 rounded-full bg-[#181512] border-2 border-dashed border-[#F6991A]/60 flex items-center justify-center shadow-xl hover:scale-105 transition-transform group"
                aria-label="Hire Me Badge"
              >
                {/* Rotating SVG circular text */}
                <svg className="w-full h-full animate-[spin_16s_linear_infinite]" viewBox="0 0 100 100">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                    fill="none"
                  />
                  <text className="text-[9.5px] font-mono font-bold tracking-[0.25em] fill-[#FAF6EE] uppercase">
                    <textPath href="#circlePath">
                      • HIRE ME • HIRE ME •
                    </textPath>
                  </text>
                </svg>

                {/* Center orange arrow circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#F6991A] text-[#181512] flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-[#E0850B] transition-colors">
                    ➔
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Subtitle with high contrast bold font and clear visibility */}
          <p className="text-black sm:text-lg md:text-xl text-[#181512] font-semibold mt-3 px-4 tracking-wide">
            Full Stack and Devops Engineer in the Earth
          </p>
        </div>

        {/* CENTER CANVAS WITH 1440PX GEOMETRY */}
        <div className="relative w-full max-w-[1280px] mx-auto mt-4 sm:mt-6 flex-1 min-h-[420px] sm:min-h-[500px] md:min-h-[560px] lg:min-h-[620px] flex items-end justify-center">

          {/* THE EXACT LAYERED SHAPE BEHIND THE IMAGE */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
            <div className="w-[320px] sm:w-[460px] md:w-[560px] lg:w-[620px] h-[320px] sm:h-[460px] md:h-[560px] lg:h-[620px] rounded-full bg-[#EFE9DC] relative flex items-center justify-center">
              {/* Horizontal layered wave ribbons inside the circular shape */}
              <div className="absolute top-[28%] left-0 right-0 h-11 sm:h-14 bg-[#FAF6EE]/80 rounded-full blur-[1px] -rotate-1 scale-105" />
              <div className="absolute top-[48%] left-0 right-0 h-11 sm:h-14 bg-[#FAF6EE]/80 rounded-full blur-[1px] -rotate-1 scale-105" />
              <div className="absolute top-[68%] left-0 right-0 h-11 sm:h-14 bg-[#FAF6EE]/80 rounded-full blur-[1px] -rotate-1 scale-105" />
            </div>
          </div>

          {/* LEFT SIDE: TESTIMONIAL QUOTE (NICELY ALIGNED WITH COMFORTABLE SPACING) */}
          <div className="absolute left-2 sm:left-6 lg:left-10 xl:left-14 top-8 sm:top-14 md:top-20 z-20 max-w-[240px] sm:max-w-[280px] text-left">
            <div className="text-4xl sm:text-5xl text-[#F6991A] font-serif font-black leading-none mb-2">“</div>
            <p className="text-sm sm:text-base md:text-lg font-bold !text-black leading-snug  ">
              Highly Professional Product Designer with Great Creativity!
            </p>
          </div>

          {/* CENTER: PROPORTIONAL SUBJECT PORTRAIT WITH SEAMLESS MULTI-DIRECTIONAL MASK */}
          <div className="relative w-[320px] sm:w-[460px] md:w-[560px] lg:w-[640px] xl:w-[680px] h-[400px] sm:h-[480px] md:h-[560px] lg:h-[620px] xl:h-[660px] z-10 flex items-end justify-center pointer-events-none">
            <div
              className="relative w-full h-full"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, black 75%, transparent 98%), linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskComposite: 'source-in',
                maskImage: 'linear-gradient(to right, black 75%, transparent 98%), linear-gradient(to bottom, black 80%, transparent 100%)',
                maskComposite: 'intersect',
              }}
            >
              <Image
                src="/images/profile.png"
                alt="Mahmudul Hasan"
                fill
                priority
                className="object-contain object-bottom drop-shadow-2xl"
                sizes="(max-width: 768px) 320px, (max-width: 1200px) 560px, 680px"
              />
            </div>
          </div>

          {/* RIGHT SIDE: FLOATING TAG PILLS CLUSTER */}
          <div className="absolute right-2 sm:right-6 lg:right-10 xl:right-14 bottom-24 sm:bottom-32 lg:bottom-36 z-20 hidden sm:flex flex-col gap-2.5 items-end">
            {/* Row 1 */}
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-[#181512] text-white text-xs font-semibold shadow-sm">
                Prototype
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#F6991A] text-[#181512] text-xs font-bold shadow-sm">
                Dashboard
              </span>
            </div>
            {/* Row 2 with golden four-petal icon */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#F6991A] text-[#181512] flex items-center justify-center font-bold text-xs shadow-sm">
                ✦
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-[#181512] text-white text-xs font-semibold shadow-sm">
                Mobile App Design
              </span>
            </div>
            {/* Row 3 */}
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-[#181512] text-white text-xs font-semibold shadow-sm">
                Website
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#F6991A] text-[#181512] text-xs font-bold shadow-sm">
                Design System
              </span>
            </div>
          </div>

          {/* BOTTOM FLOATING DUAL CAPSULE BUTTON */}
          <div className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 z-30 w-auto">
            <CapsuleGroup className="border border-[#DCD3C3] shadow-2xl">
              {/* Left Orange Pill: Portfolio */}
              <Button
                variant="primary"
                size="md"
                href="#projects"
                withArrow
                className="font-extrabold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base"
              >
                Portfolio
              </Button>

              {/* Right Crisp Outlined Pill: Hire Me */}
              <Button
                variant="outline"
                size="md"
                href="#contact"
                className="!border-none !text-black font-extrabold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base shadow-sm"
              >
                Hire Me
              </Button>
            </CapsuleGroup>
          </div>

        </div>

      </div>
    </section>
  );
}
