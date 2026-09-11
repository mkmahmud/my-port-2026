'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Briefcase, GraduationCap } from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
}

const EDUCATION_ITEMS: TimelineItem[] = [
  {
    id: 'edu-1',
    title: 'Uttara University',
    subtitle: 'B.Sc. in Computer Science & Engineering',
    date: '2022 - 2026',
  },
  {
    id: 'edu-2',
    title: 'Dhaka College',
    subtitle: 'Higher Secondary Certificate (Science)',
    date: '2019 - 2021',
  },
  {
    id: 'edu-3',
    title: 'Model Academy',
    subtitle: 'Secondary School Certificate (Science)',
    date: '2017 - 2019',
  },
];

const WORK_ITEMS: TimelineItem[] = [
  {
    id: 'work-1',
    title: 'Codexmine',
    subtitle: 'Senior Full Stack Developer',
    date: '2024 - Present',
  },
  {
    id: 'work-2',
    title: 'LeoPhoenix',
    subtitle: 'Full Stack Engineer (Remote)',
    date: '2023 - 2024',
  },
  {
    id: 'work-3',
    title: 'Self-Employed',
    subtitle: 'Full Stack & DevOps Freelancer',
    date: '2021 - 2023',
  },
];

// Card Polygon: Top-left chamfer, top-right chamfer, and right-edge stepped notch
const CARD_CLIP_PATH =
  'polygon(0% 20px, 20px 0%, calc(100% - 20px) 0%, calc(100% - 8px) 14px, calc(100% - 8px) 45%, 100% 52%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px))';

export function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-24 md:py-28 bg-[#FAF6EE] relative overflow-hidden">
      <Container>
        {/* CENTERED SECTION HEADER */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-18 select-none">
          {/* Double Circle Icon + Education & Work label */}
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex items-center">
              <span className="w-3.5 h-3.5 rounded-full bg-[#181512]" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#F6991A] -ml-1.5" />
            </div>
            <span className="text-[#181512] font-semibold text-sm tracking-tight">
              Education & Work
            </span>
          </div>

          {/* Heading with 3-leaf sparkle decoration on 'and' */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-heading font-extrabold tracking-tight leading-[1.12]">
            <span className="text-[#181512]">My </span>
            <span className="relative inline-block text-[#F6991A]">
              Academic and
              {/* 3 decorative leaf petals at top-right of 'and' */}
              <svg
                className="absolute -top-3 -right-6 sm:-top-3.5 sm:-right-7 w-5 h-5 sm:w-6 sm:h-6 text-[#181512] pointer-events-none"
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
            <span className="text-[#F6991A]">Professional </span>
            <span className="text-[#181512]">Journey</span>
          </h2>
        </div>

        {/* DUAL COLUMNS: EDUCATION (LEFT) & WORK EXPERIENCE (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* LEFT CARD: EDUCATION */}
          <div className="relative filter drop-shadow-[0_4px_20px_rgba(24,21,18,0.05)] hover:drop-shadow-[0_12px_32px_rgba(246,153,26,0.1)] transition-all duration-400 group">
            <div
              className="w-full bg-white p-7 sm:p-9 md:p-10 transition-transform duration-300 group-hover:-translate-y-1"
              style={{ clipPath: CARD_CLIP_PATH }}
            >
              {/* CARD HEADER: ORANGE CIRCLE WITH GRADUATION CAP ICON + TITLE */}
              <div className="flex items-center gap-3.5 sm:gap-4 select-none">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F6991A] flex items-center justify-center text-[#181512] shadow-sm shrink-0">
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                </div>
                <h3 className="font-heading font-extrabold text-2xl sm:text-[26px] text-[#181512] tracking-tight">
                  Education
                </h3>
              </div>

              {/* HORIZONTAL DOTTED CONNECTOR LINE */}
              <div className="w-full border-t border-dashed border-[#E5DFD3] my-6 sm:my-8" />

              {/* 3 EDUCATION ENTRIES */}
              <div className="space-y-6 sm:space-y-8">
                {EDUCATION_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 group/item"
                  >
                    <div>
                      <h4 className="font-heading font-bold text-lg sm:text-xl text-[#181512] tracking-tight group-hover/item:text-[#F6991A] transition-colors duration-200">
                        {item.title}
                      </h4>
                      <p className="text-sm sm:text-[15px] text-[#7A746B] font-medium mt-0.5 tracking-normal">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* BLACK DATE PILL BADGE */}
                    <span className="px-3.5 sm:px-4 py-1.5 rounded-full bg-[#181512] text-white font-mono font-bold text-xs sm:text-[13px] tracking-tight shadow-sm select-none shrink-0 group-hover/item:bg-[#F6991A] group-hover/item:text-[#181512] transition-colors duration-200">
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CARD: WORK EXPERIENCE */}
          <div className="relative filter drop-shadow-[0_4px_20px_rgba(24,21,18,0.05)] hover:drop-shadow-[0_12px_32px_rgba(246,153,26,0.1)] transition-all duration-400 group">
            <div
              className="w-full bg-white p-7 sm:p-9 md:p-10 transition-transform duration-300 group-hover:-translate-y-1"
              style={{ clipPath: CARD_CLIP_PATH }}
            >
              {/* CARD HEADER: ORANGE CIRCLE WITH BRIEFCASE ICON + TITLE */}
              <div className="flex items-center gap-3.5 sm:gap-4 select-none">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F6991A] flex items-center justify-center text-[#181512] shadow-sm shrink-0">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                </div>
                <h3 className="font-heading font-extrabold text-2xl sm:text-[26px] text-[#181512] tracking-tight">
                  Work Experience
                </h3>
              </div>

              {/* HORIZONTAL DOTTED CONNECTOR LINE */}
              <div className="w-full border-t border-dashed border-[#E5DFD3] my-6 sm:my-8" />

              {/* 3 WORK ENTRIES */}
              <div className="space-y-6 sm:space-y-8">
                {WORK_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 group/item"
                  >
                    <div>
                      <h4 className="font-heading font-bold text-lg sm:text-xl text-[#181512] tracking-tight group-hover/item:text-[#F6991A] transition-colors duration-200">
                        {item.title}
                      </h4>
                      <p className="text-sm sm:text-[15px] text-[#7A746B] font-medium mt-0.5 tracking-normal">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* BLACK DATE PILL BADGE */}
                    <span className="px-3.5 sm:px-4 py-1.5 rounded-full bg-[#181512] text-white font-mono font-bold text-xs sm:text-[13px] tracking-tight shadow-sm select-none shrink-0 group-hover/item:bg-[#F6991A] group-hover/item:text-[#181512] transition-colors duration-200">
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
