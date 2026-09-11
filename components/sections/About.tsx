'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { NumberCounter } from '@/components/animations/NumberCounter';

function SparkleFlower({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="10.25" y="1.5" width="3.5" height="8" rx="1.75" />
      <rect x="10.25" y="14.5" width="3.5" height="8" rx="1.75" />
      <rect x="1.5" y="10.25" width="8" height="3.5" rx="1.75" />
      <rect x="14.5" y="10.25" width="8" height="3.5" rx="1.75" />
      <circle cx="12" cy="12" r="1.6" />
    </svg>
  );
}

export function About() {
  const stats = [
    { value: 250, suffix: '+', label: 'Successful Projects' },
    { value: 25, suffix: '+', label: 'Industry Covered' },
    { value: 150, suffix: '+', label: 'Happy Customers' },
    { value: 16, suffix: '+', label: 'Years of Experience' },
  ];

  return (
    <section
      id="about"
      className="relative bg-[#181512] text-[#FBF8F2] pt-20 sm:pt-24 pb-16 sm:pb-20 overflow-hidden border-t-[3px] border-b-[3px] border-[#F6991A]"
    >
      {/* Subtle ambient warmth in background */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#F6991A]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <Container>
        {/* MAIN UPPER GRID: LEFT PORTRAIT COLLAGE | RIGHT CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 sm:mb-20">
          {/* LEFT COLUMN: PORTRAIT WITH ORANGE BACKDROP & 7 FLOATING PILLS */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] select-none">
              {/* VIBRANT ORANGE ARCHED BACKDROP */}
              <div className="relative w-full h-[360px] sm:h-[410px] md:h-[440px] bg-[#F6991A] rounded-t-[38px] rounded-b-[24px] overflow-hidden shadow-2xl">
                {/* Watermark 4-petal floral sparkles inside orange backdrop */}
                <div className="absolute top-6 left-6 text-[#C97205]/35 pointer-events-none">
                  <SparkleFlower className="w-12 h-12" />
                </div>
                <div className="absolute top-14 right-6 text-[#C97205]/25 pointer-events-none">
                  <SparkleFlower className="w-9 h-9" />
                </div>
                <div className="absolute bottom-28 left-8 text-[#C97205]/20 pointer-events-none">
                  <SparkleFlower className="w-8 h-8" />
                </div>

                {/* Profile Portrait Image */}
                <div className="relative w-full h-full flex items-end justify-center">
                  <Image
                    src="/images/direct_head.png"
                    alt="Mahmudul Hasan"
                    fill
                    priority
                    className="object-cover object-top drop-shadow-2xl"
                    sizes="(max-width: 768px) 360px, 420px"
                  />
                </div>
              </div>

              {/* 7 FLOATING COLLAGE PILL BADGES OVERLAPPING THE LOWER PORTRAIT */}
              <div className="absolute inset-x-0 bottom-4 sm:bottom-6 z-20 pointer-events-none">
                <div className="relative w-full h-32 sm:h-36">
                  {/* Pill 1: Mobile App Design (Black, tilted left) */}
                  <div className="absolute left-1 sm:left-3 top-0 -rotate-6">
                    <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#181512] text-white font-semibold text-xs sm:text-[13px] border border-white/10 shadow-xl whitespace-nowrap block">
                      Mobile App Design
                    </span>
                  </div>

                  {/* Pill 2: UX/UI Design (Black, tilted right) */}
                  <div className="absolute right-1 sm:right-3 top-2 rotate-3">
                    <span className="px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#181512] text-white font-semibold text-xs sm:text-[13px] border border-white/10 shadow-xl whitespace-nowrap block">
                      UX/UI Design
                    </span>
                  </div>

                  {/* Pill 3: Website Design (Orange, center) */}
                  <div className="absolute left-1/2 -translate-x-[46%] top-7 sm:top-8 rotate-1">
                    <span className="px-4 sm:px-4.5 py-1 sm:py-1.5 rounded-full bg-[#F6991A] text-[#181512] font-bold text-xs sm:text-[13px] shadow-xl whitespace-nowrap block border border-[#181512]/10">
                      Website Design
                    </span>
                  </div>

                  {/* Pill 4: Design System (Orange, lower left) */}
                  <div className="absolute left-0 sm:left-1 top-14 sm:top-16 rotate-6">
                    <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#F6991A] text-[#181512] font-bold text-xs sm:text-[13px] shadow-xl whitespace-nowrap block border border-[#181512]/10">
                      Design System
                    </span>
                  </div>

                  {/* Pill 5: Prototype (Black, center tilt) */}
                  <div className="absolute left-[33%] top-14 sm:top-15 rotate-12">
                    <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#181512] text-white font-semibold text-xs sm:text-[13px] border border-white/10 shadow-xl whitespace-nowrap block">
                      Prototype
                    </span>
                  </div>

                  {/* Pill 6: Dashboard (Black, lower right) */}
                  <div className="absolute right-1 sm:right-2 top-14 sm:top-16 -rotate-6">
                    <span className="px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#181512] text-white font-semibold text-xs sm:text-[13px] border border-white/10 shadow-xl whitespace-nowrap block">
                      Dashboard
                    </span>
                  </div>

                  {/* Pill 7: Wireframe Design (Orange, bottom center) */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-23 sm:top-25 rotate-0">
                    <span className="px-4 sm:px-5 py-1 sm:py-1.5 rounded-full bg-[#F6991A] text-[#181512] font-bold text-xs sm:text-[13px] shadow-xl whitespace-nowrap block border border-[#181512]/10">
                      Wireframe Design
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ABOUT ME DETAILS, HEADING, BIO, CTA & SIGNATURE */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Double Circle Icon + About Me label */}
            <div className="flex items-center gap-2 mb-3 select-none">
              <div className="relative flex items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-white" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#F6991A] -ml-1.5" />
              </div>
              <span className="text-white font-semibold text-sm tracking-tight">
                About Me
              </span>
            </div>

            {/* Main Heading with 3-leaf sparkle decoration at top-right of ? */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-heading font-extrabold text-white tracking-tight leading-[1.12] mb-6">
              Who is{' '}
              <span className="relative inline-block text-[#F6991A]">
                Mahmudul Hasan?
                {/* 3 decorative leaf petals at top-right */}
                <svg
                  className="absolute -top-3 -right-6 sm:-top-3.5 sm:-right-7 w-5 h-5 sm:w-6 sm:h-6 text-white pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 11C13 6 16.5 2.5 21 2C20.5 6.5 17 10 12 11Z" />
                  <path d="M13 12C17 11 21.5 12 24 15.5C21.5 18 17 17.5 13 14C12.5 13.5 12.5 12.5 13 12Z" />
                  <path d="M12 13C13 17 15 20.5 17.5 23.5C14.5 23 11.5 20.5 10.5 16.5C10.5 14 11.5 13 12 13Z" />
                </svg>
              </span>
            </h2>

            {/* Bio paragraph */}
            <p className="text-[#D5CBB9] text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-normal">
              Hey there, I’m Mahmudul Hasan — a Full Stack Developer & AI Engineer passionate about creating intuitive digital experiences and robust architectures that blend aesthetics with high-performance functionality.
            </p>

            {/* ACTION ROW: DOWNLOAD CV BUTTON + HANDWRITTEN SIGNATURE */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              {/* Download CV Pill Button */}
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center bg-[#181512] border border-[#F6991A] pl-5 sm:pl-6 pr-1.5 py-1 rounded-full shadow-lg hover:scale-[1.03] transition-all duration-200 group"
              >
                <span className="text-white font-bold text-xs sm:text-sm tracking-tight mr-3 sm:mr-4">
                  Download CV
                </span>
                <div className="bg-[#F6991A] px-2.5 py-1.5 rounded-full flex items-center justify-center group-hover:bg-[#E0850B] transition-colors">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#181512] flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm group-hover:translate-x-0.5 transition-transform">
                    ➔
                  </span>
                </div>
              </a>

              {/* Handwritten Cursive Signature */}
              <div className="select-none py-1">
                <span
                  style={{ fontFamily: "'Caveat', 'Great Vibes', cursive" }}
                  className="text-3xl sm:text-4xl md:text-[42px] text-white font-normal tracking-wide italic leading-none drop-shadow-sm"
                >
                  Mahmudul Hasan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM METRICS / STAT COUNTERS ROW WITH ECLIPSE SEPARATORS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-10 border-t border-[#362F27]/60">
          {stats.map((stat, idx) => (
            <div key={idx} className="relative flex items-center justify-between">
              {/* Stat Value & Label */}
              <div className="flex flex-col">
                <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
                  <NumberCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-[#A8A29E] font-medium mt-1 tracking-wide">
                  {stat.label}
                </div>
              </div>

              {/* Eclipse Icon Vertical Divider between columns (Desktop) */}
              {idx < stats.length - 1 && (
                <div className="hidden md:flex flex-col items-center justify-center absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 h-14 pointer-events-none">
                  {/* Top Line */}
                  <div className="w-[1px] h-4 bg-[#F6991A]/40" />
                  {/* Double Circle Eclipse Icon */}
                  <div className="relative flex items-center my-1 select-none">
                    <span className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F6991A] -ml-1 shadow-sm" />
                  </div>
                  {/* Bottom Line */}
                  <div className="w-[1px] h-4 bg-[#F6991A]/40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
