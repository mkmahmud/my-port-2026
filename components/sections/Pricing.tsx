'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Check, ArrowUpRight } from 'lucide-react';

export function Pricing() {
  const hourlyFeatures = [
    'Flexible hourly hiring',
    'Fast design turnaround',
    'Pay as you go',
    'Quick design updates',
    'Transparent hourly pricing',
    'Perfect for short projects',
  ];

  const monthlyFeatures = [
    'Dedicated monthly designer',
    'Priority design support',
    'Fast design turnaround',
    'Flexible design revisions',
    'Long-term product support',
    'Built for business growth',
    'Smooth team collaboration',
    'Consistent design quality',
  ];

  return (
    <section
      id="pricing"
      className="py-20 sm:py-24 md:py-28 bg-[#181512] text-white relative border-t-4 border-b-4 border-[#F6991A] overflow-hidden"
    >
      {/* Subtle Radial Glow Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#F6991A]/5 blur-[120px] pointer-events-none rounded-full" />

      <Container>
        {/* 3-COLUMN GRID: LEFT INFO + HOURLY CARD + MONTHLY CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          
          {/* COLUMN 1: HEADER & CUSTOM QUOTE CARD */}
          <div className="flex flex-col justify-between space-y-8 md:space-y-6">
            {/* Header Area */}
            <div>
              {/* Section Badge: White Circle + Orange Circle + Label */}
              <div className="flex items-center gap-2 mb-3 select-none">
                <div className="relative flex items-center">
                  <span className="w-3.5 h-3.5 rounded-full bg-white" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#F6991A] -ml-1.5" />
                </div>
                <span className="text-white/90 font-semibold text-sm tracking-tight">
                  Pricing Table
                </span>
              </div>

              {/* Title with White 3-Leaf Floral Sparkle */}
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-heading font-extrabold text-white tracking-tight leading-[1.12]">
                <span className="relative inline-block text-[#F6991A]">
                  My Pricing
                  {/* 3 decorative leaf petals at top right in crisp white */}
                  <svg
                    className="absolute -top-2.5 -right-5 sm:-top-3 sm:-right-6 w-5 h-5 sm:w-6 sm:h-6 text-white pointer-events-none"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 11C13 6 16.5 2.5 21 2C20.5 6.5 17 10 12 11Z" />
                    <path d="M13 12C17 11 21.5 12 24 15.5C21.5 18 17 17.5 13 14C12.5 13.5 12.5 12.5 13 12Z" />
                    <path d="M12 13C13 17 15 20.5 17.5 23.5C14.5 23 11.5 20.5 10.5 16.5C10.5 14 11.5 13 12 13Z" />
                  </svg>
                </span>
                <br />
                <span className="text-white">Model</span>
              </h2>
            </div>

            {/* Need a Custom Quote? Card with Cyber Geometric Cut */}
            <div
              className="relative bg-[#1F1914] text-white p-7 sm:p-8 border border-[#3A3026] shadow-xl rounded-2xl flex flex-col justify-between"
              style={{
                clipPath:
                  'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 48%, calc(100% - 8px) 51%, calc(100% - 8px) 100%, 0 100%)',
              }}
            >
              <div>
                <h3 className="text-xl sm:text-[22px] font-heading font-extrabold text-white tracking-tight mb-2.5">
                  Need a{' '}
                  <span className="text-[#F6991A]">Custom Quote?</span>
                </h3>
                <p className="text-[#BDB4AA] text-xs sm:text-[13.5px] leading-relaxed mb-6 font-normal">
                  Get a personalized product design quote tailored to your goals, timeline, and project needs.
                </p>
              </div>

              <div>
                <a
                  href="#contact"
                  className="inline-flex items-center bg-[#181512] border border-[#F6991A]/30 p-1.5 rounded-full shadow-md hover:border-[#F6991A] transition-all duration-300 group hover:scale-[1.02]"
                >
                  <span className="px-5 py-2 text-white font-heading font-bold text-xs sm:text-sm tracking-tight group-hover:text-[#F6991A] transition-colors">
                    Contact Me
                  </span>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F6991A] p-0.5 ml-1 transition-transform duration-200 group-hover:translate-x-0.5">
                    <div className="w-full h-full rounded-full bg-white text-[#181512] flex items-center justify-center font-bold text-xs shadow-xs">
                      →
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 2: HOURLY CARD (Vibrant Orange & Stepped Chamfer) */}
          <div
            className="relative bg-[#F6991A] text-[#181512] p-8 sm:p-9 shadow-2xl flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 rounded-2xl"
            style={{
              clipPath:
                'polygon(0 0, 100% 0, 100% 48%, calc(100% - 10px) 51%, calc(100% - 10px) calc(100% - 26px), calc(100% - 36px) 100%, 0 100%)',
            }}
          >
            <div>
              {/* Header: Label + Top-Right Arrow Action */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs sm:text-sm font-heading font-extrabold uppercase tracking-wider text-[#181512]/80">
                  HOURLY
                </span>
                <a
                  href="#contact"
                  aria-label="Hire Hourly"
                  className="w-8 h-8 rounded-full bg-[#181512]/15 hover:bg-[#181512]/25 text-[#181512] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowUpRight size={17} strokeWidth={2.5} />
                </a>
              </div>

              {/* Price: $30 / Hour */}
              <div className="flex items-baseline mb-8 pb-6 border-b border-[#181512]/15">
                <span className="text-4xl sm:text-5xl font-heading font-black text-[#181512] tracking-tight">
                  $30
                </span>
                <span className="text-base sm:text-lg font-heading font-bold text-[#181512]/80 ml-2">
                  / Hour
                </span>
              </div>

              {/* 6 Features List with Dark Circular Checks */}
              <ul className="space-y-3.5 sm:space-y-4">
                {hourlyFeatures.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#181512]"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#181512] text-[#F6991A] flex items-center justify-center shrink-0 shadow-xs">
                      <Check size={12} strokeWidth={3.5} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Spacing */}
            <div className="pt-8" />
          </div>

          {/* COLUMN 3: MONTHLY CARD (Espresso Dark & Stepped Chamfer) */}
          <div
            className="relative bg-[#1F1914] text-white p-8 sm:p-9 border border-[#3A3026] shadow-xl flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 rounded-2xl"
            style={{
              clipPath:
                'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 48%, calc(100% - 10px) 51%, calc(100% - 10px) 100%, 0 100%)',
            }}
          >
            <div>
              {/* Header: Label + Top-Right Arrow Action */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs sm:text-sm font-heading font-extrabold uppercase tracking-wider text-white/70">
                  MONTHLY
                </span>
                <a
                  href="#contact"
                  aria-label="Hire Monthly"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/90 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowUpRight size={17} strokeWidth={2.5} />
                </a>
              </div>

              {/* Price: $4800 / Month */}
              <div className="flex items-baseline mb-8 pb-6 border-b border-[#362F27]">
                <span className="text-4xl sm:text-5xl font-heading font-black text-[#F6991A] tracking-tight">
                  $4800
                </span>
                <span className="text-base sm:text-lg font-heading font-bold text-white/80 ml-2">
                  / Month
                </span>
              </div>

              {/* 8 Features List with Orange Circular Checks */}
              <ul className="space-y-3.5 sm:space-y-4">
                {monthlyFeatures.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-xs sm:text-sm font-medium text-[#C8C0B7]"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#F6991A] text-[#181512] flex items-center justify-center shrink-0 shadow-xs">
                      <Check size={12} strokeWidth={3.5} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Spacing */}
            <div className="pt-8" />
          </div>

        </div>
      </Container>
    </section>
  );
}
