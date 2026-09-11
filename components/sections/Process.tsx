'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';

export function Process() {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Architecture',
      description:
        'Understanding core business requirements, system constraints, database schemas, and choosing the optimal tech stack.',
    },
    {
      number: '02',
      title: 'UI/UX & Prototyping',
      description:
        'Translating design specifications into responsive, accessible components with strict design system token discipline.',
    },
    {
      number: '03',
      title: 'Full-Stack Development',
      description:
        'Writing high-throughput backend APIs, integrating database transactions, and engineering seamless frontend states.',
    },
    {
      number: '04',
      title: 'Testing & Launch',
      description:
        'Executing unit/integration tests, setting up Docker containers and CI/CD pipelines, and ensuring zero-downtime deployment.',
    },
  ];

  return (
    <section
      id="process"
      className="py-20 sm:py-24 md:py-28 bg-[#FAF6EE] relative overflow-hidden"
    >
      <Container>
        {/* SECTION HEADER AREA */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          {/* Double Circle Badge: Black Circle + Orange Circle + Label */}
          <div className="flex items-center justify-center gap-2 mb-3 select-none">
            <div className="relative flex items-center">
              <span className="w-3.5 h-3.5 rounded-full bg-[#181512]" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#F6991A] -ml-1.5" />
            </div>
            <span className="text-[#181512] font-semibold text-sm tracking-tight">
              My Work Process
            </span>
          </div>

          {/* Heading with Black 3-Leaf Floral Sparkle */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-heading font-extrabold tracking-tight leading-[1.14]">
            <span className="relative inline-block text-[#F6991A] mr-1.5">
              The Way I Design
              {/* 3 black decorative leaf petals at top right */}
              <svg
                className="absolute -top-2.5 -right-5 sm:-top-3 sm:-right-6 w-5 h-5 sm:w-6 sm:h-6 text-[#181512] pointer-events-none"
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
            <span className="text-[#181512]">Experiences</span>
          </h2>
        </div>

        {/* 2x2 PROCESS CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative group transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Card Container with Folder-Tab Tech Silhouette */}
              <div
                className="relative bg-white border border-[#EBE3D5] p-7 sm:p-8 md:p-9 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(246,153,26,0.1)] transition-all duration-300 rounded-3xl"
                style={{
                  clipPath:
                    'polygon(0 0, 52% 0, 58% 8px, calc(100% - 20px) 8px, 100% 28px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)',
                }}
              >
                {/* Top Row: Pill Badge + Dashed Horizontal Track */}
                <div className="flex items-center gap-3 w-full mb-2">
                  <div className="inline-flex items-center px-3.5 py-0.5 rounded-full border border-[#F6991A] bg-white text-[#F6991A] text-xs font-heading font-extrabold tracking-tight shrink-0 shadow-xs">
                    {step.number}.
                  </div>
                  <div className="h-[1px] flex-1 border-t border-dashed border-[#E3DBD0]" />
                </div>

                {/* Step Title */}
                <h3 className="text-xl sm:text-[22px] font-heading font-extrabold text-[#181512] tracking-tight mt-5 mb-2.5 group-hover:text-[#F6991A] transition-colors duration-200">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[#7A746B] text-sm sm:text-[15px] leading-relaxed">
                  {step.description}
                </p>

                {/* Subtle 4-Point Star Watermark in Bottom-Right Corner */}
                <div className="absolute bottom-5 right-6 pointer-events-none opacity-35">
                  <svg
                    className="w-5 h-5 text-[#D5CDBC]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
