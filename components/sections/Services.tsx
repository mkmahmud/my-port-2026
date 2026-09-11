'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  tags: string[];
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: '01.',
    title: 'UI/UX Design',
    tags: ['User Research', 'Design Systems', 'Wireframing', 'Interactive Prototypes'],
    description:
      'Creating intuitive, engaging, and user-focused interfaces that turn complex workflows into seamless, delightful digital experiences.',
  },
  {
    id: '02.',
    title: 'Website Design',
    tags: [
      'Landing Page Design',
      'Responsive Website Design',
      'Wireframing and Prototyping',
      'Custom Website UI Design',
    ],
    description:
      'Designing modern, user-friendly websites focused on seamless experiences, usability, and business growth.',
  },
  {
    id: '03.',
    title: 'Application Design',
    tags: ['Web Applications', 'Mobile App UI/UX', 'SaaS Platforms', 'Component Libraries'],
    description:
      'Building scalable application architectures with modern interfaces, robust user journeys, and high-performance frontend engineering.',
  },
  {
    id: '04.',
    title: 'Dashboard Design',
    tags: ['Admin Dashboards', 'Data Visualization', 'Analytics Portals', 'Real-time Metrics'],
    description:
      'Engineering data-dense analytics dashboards and administrative consoles that transform complex metrics into clear, actionable intelligence.',
  },
  {
    id: '05.',
    title: 'Wireframing & Prototyping',
    tags: ['Low-Fidelity Wireframes', 'Clickable Prototypes', 'User Flow Mapping', 'Concept Validation'],
    description:
      'Mapping out architectures, user journeys, and interactive prototypes to validate requirements rapidly before writing production code.',
  },
];

export function Services() {
  // Default to '02.' matching the reference screenshot exactly
  const [hoveredId, setHoveredId] = useState<string | null>('02.');

  return (
    <section id="services" className="py-20 sm:py-24 md:py-28 bg-[#FAF6EE] relative overflow-hidden">
      <Container>
        {/* SECTION HEADER GROUP */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            {/* Double Circle Icon + My Services label */}
            <div className="flex items-center gap-2 mb-3 select-none">
              <div className="relative flex items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-[#181512]" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#F6991A] -ml-1.5" />
              </div>
              <span className="text-[#181512] font-semibold text-sm tracking-tight">
                My Services
              </span>
            </div>

            {/* Main Heading with 3-leaf sparkle decoration */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-heading font-extrabold text-[#181512] tracking-tight leading-[1.12]">
              How I Bring{' '}
              <span className="relative inline-block text-[#F6991A]">
                Ideas to Life
                {/* 3 decorative leaf petals at top-right */}
                <svg
                  className="absolute -top-3 -right-6 sm:-top-3.5 sm:-right-7 w-5 h-5 sm:w-6 sm:h-6 text-[#181512] pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  {/* Top leaf */}
                  <path d="M12 11C13 6 16.5 2.5 21 2C20.5 6.5 17 10 12 11Z" />
                  {/* Middle right leaf */}
                  <path d="M13 12C17 11 21.5 12 24 15.5C21.5 18 17 17.5 13 14C12.5 13.5 12.5 12.5 13 12Z" />
                  {/* Bottom leaf */}
                  <path d="M12 13C13 17 15 20.5 17.5 23.5C14.5 23 11.5 20.5 10.5 16.5C10.5 14 11.5 13 12 13Z" />
                </svg>
              </span>
            </h2>
          </div>

          {/* Top-Right CTA Capsule Button */}
          <div className="shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center bg-[#181512] p-1.5 rounded-full shadow-md hover:scale-[1.03] transition-transform duration-200 group"
            >
              <span className="px-5 sm:px-6 py-2.5 rounded-full bg-[#F6991A] text-[#181512] font-bold text-xs sm:text-sm tracking-tight group-hover:bg-[#E0850B] transition-colors">
                View All Services
              </span>
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#181512] flex items-center justify-center font-bold text-xs sm:text-sm ml-2.5 shadow-sm group-hover:translate-x-0.5 transition-transform">
                ➔
              </span>
            </a>
          </div>
        </div>

        {/* SERVICES LIST OF CARDS */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {SERVICES.map((service) => {
            const isExpanded = hoveredId === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onClick={() => setHoveredId(service.id)}
                className="relative cursor-pointer transition-all duration-300 filter drop-shadow-[0_4px_16px_rgba(24,21,18,0.04)] hover:drop-shadow-[0_8px_24px_rgba(24,21,18,0.08)] group"
              >
                {/* CUSTOM CYBER-CHAMFER GEOMETRIC SHAPE */}
                <div
                  className={`w-full transition-all duration-400 ease-out px-4 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 ${
                    isExpanded ? 'bg-[#181512] text-white' : 'bg-white text-[#181512]'
                  }`}
                  style={{
                    clipPath:
                      'polygon(0% 12px, 115px 12px, 138px 0%, calc(100% - 24px) 0%, 100% 24px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 85px 100%, 65px calc(100% - 12px), 0% calc(100% - 12px))',
                  }}
                >
                  <div className="flex items-start justify-between gap-3 sm:gap-6">
                    {/* LEFT: NUMBER PILL + DOTTED CONNECTOR LINE */}
                    <div className="flex items-center w-[85px] sm:w-[110px] shrink-0 pt-0.5">
                      {/* Outlined Dashed Number Pill */}
                      <span
                        className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-bold tracking-tight border border-dashed transition-colors select-none ${
                          isExpanded
                            ? 'border-[#F6991A]/60 text-[#F6991A] bg-[#181512]'
                            : 'border-[#F6991A]/40 text-[#F6991A] bg-white'
                        }`}
                      >
                        {service.id}
                      </span>
                      {/* Horizontal Dotted Line */}
                      <span
                        className={`hidden sm:block flex-1 h-[1px] border-t border-dashed ml-3 transition-colors ${
                          isExpanded ? 'border-[#362F27]' : 'border-[#E5DFD3]'
                        }`}
                      />
                    </div>

                    {/* CENTER: TITLE + SMOOTH EXPANDED TAGS & DESCRIPTION */}
                    <div className="flex-1 min-w-0 pr-2">
                      <h3
                        className={`text-lg sm:text-xl md:text-2xl lg:text-[26px] font-heading font-bold tracking-tight leading-snug transition-colors select-none ${
                          isExpanded ? 'text-white' : 'text-[#181512]'
                        }`}
                      >
                        {service.title}
                      </h3>

                      {/* EXPANDABLE DRAWER: TAGS & DESCRIPTION */}
                      <div
                        className={`grid transition-all duration-400 ease-out overflow-hidden ${
                          isExpanded
                            ? 'grid-rows-[1fr] opacity-100 mt-3.5 sm:mt-4'
                            : 'grid-rows-[0fr] opacity-0 mt-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          {/* Tags Cluster */}
                          <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-3">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 sm:px-3.5 py-1 rounded-full bg-[#241F1A] border border-[#362F27] text-white/90 text-xs sm:text-[13px] font-medium tracking-wide shadow-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Description */}
                          <p className="text-[#A8A29E] text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-2xl pb-1">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT: ORANGE ARROW BUTTON */}
                    <div className="shrink-0 pt-0.5">
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#F6991A] text-[#181512] flex items-center justify-center font-bold shadow-sm transition-all duration-300 ${
                          isExpanded
                            ? 'scale-110 shadow-[0_0_15px_rgba(246,153,26,0.35)]'
                            : 'group-hover:scale-105'
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
