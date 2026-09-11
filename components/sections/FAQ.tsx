'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 1,
    question: 'What industries do you specialize in?',
    answer:
      'I specialize in FinTech, EdTech, AI-driven automation, SaaS platforms, and enterprise tooling, building scalable digital products from concept to production.',
  },
  {
    id: 2,
    question: 'Do you design mobile and web applications?',
    answer:
      'Yes, I design responsive mobile apps, websites, dashboards, SaaS platforms, and digital product experiences.',
  },
  {
    id: 3,
    question: 'Do you create wireframes and prototypes?',
    answer:
      'Yes, I build interactive prototypes, design systems, and wireframes to validate UX flows before writing scalable, clean code.',
  },
  {
    id: 4,
    question: 'Do you work with startups and businesses?',
    answer:
      'Absolutely. I collaborate with early-stage founders to build fast MVPs, as well as established enterprises needing robust full-stack systems.',
  },
  {
    id: 5,
    question: 'How long does a product design project take?',
    answer:
      'Typical timelines range from 1-3 weeks for focused landing pages or MVPs, to 4-8 weeks for comprehensive full-stack software platforms.',
  },
  {
    id: 6,
    question: 'What is your product design process?',
    answer:
      'A streamlined 4-phase methodology: Discovery & Architecture, UI/UX Prototyping, Full-Stack Development, and Production Testing & Deployment.',
  },
];

export function FAQ() {
  // Default open to 2nd item (index 1) matching reference screenshot exactly
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <section
      id="faq"
      className="py-20 sm:py-24 md:py-28 bg-[#181512] text-white relative border-t-4 border-b-4 border-[#F6991A] overflow-hidden"
    >
      {/* Subtle Radial Glow in Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#F6991A]/5 blur-[120px] pointer-events-none rounded-full" />

      <Container>
        {/* HEADER AREA */}
        <div className="mb-12 sm:mb-16">
          {/* Double Circle Badge: White Circle + Orange Circle + FAQs Label */}
          <div className="flex items-center gap-2 mb-3 select-none">
            <div className="relative flex items-center">
              <span className="w-3.5 h-3.5 rounded-full bg-white" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#F6991A] -ml-1.5" />
            </div>
            <span className="text-white/90 font-semibold text-sm tracking-tight">
              FAQs
            </span>
          </div>

          {/* Heading with White 3-Leaf Floral Sparkle */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-heading font-extrabold tracking-tight leading-[1.12]">
            <span className="text-white mr-2.5">Question?</span>
            <span className="relative inline-block text-[#F6991A]">
              Look here
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
          </h2>
        </div>

        {/* TWO-COLUMN GRID: LEFT CTA CARD & RIGHT ACCORDION LIST */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: ASK AWAY CARD (4 cols) */}
          <div className="lg:col-span-4">
            <div
              className="relative bg-[#1F1914] text-white p-8 sm:p-9 border border-[#3A3026] shadow-xl flex flex-col items-center text-center rounded-3xl"
              style={{
                clipPath:
                  'polygon(26px 0%, 100% 0%, 100% 100%, 10px 100%, 10px 52%, 0% 48%, 0% 26px)',
              }}
            >
              {/* Overlapping Chat Speech Bubbles Icon */}
              <div className="relative w-14 h-14 mb-5 flex items-center justify-center select-none">
                {/* Background white bubble */}
                <svg
                  className="w-10 h-10 text-white absolute -top-1 -right-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 2H4C2.9 2 2 2.9 2 4v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
                {/* Foreground golden-orange bubble with 3 dark dots */}
                <div className="relative z-10 w-11 h-11 rounded-2xl bg-[#F6991A] text-[#181512] flex items-center justify-center shadow-lg -translate-x-1.5 translate-y-1.5">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#181512]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#181512]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#181512]" />
                  </div>
                </div>
              </div>

              {/* Card Title */}
              <h3 className="text-xl sm:text-[22px] font-heading font-extrabold text-white tracking-tight leading-snug mb-2.5">
                You have different<br />questions? Ask Away!
              </h3>

              {/* Subtitle */}
              <p className="text-[#A89F93] text-xs sm:text-[13.5px] leading-relaxed mb-6 font-normal">
                Your Questions, My Answers.<br />Quick Responses Guaranteed.
              </p>

              {/* Contact Button */}
              <div>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#F6991A] hover:bg-[#E0850B] text-[#181512] font-heading font-extrabold text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 6 ACCORDION ITEMS (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-3.5 sm:gap-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={faq.id}
                  className="transition-all duration-300"
                >
                  <div
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className={`relative p-5 sm:p-6 transition-all duration-300 cursor-pointer rounded-2xl ${
                      isOpen
                        ? 'bg-[#F6991A] text-[#181512] shadow-xl'
                        : 'bg-[#1F1914] text-white border border-[#3A3026] hover:border-[#F6991A]/40 shadow-sm'
                    }`}
                    style={{
                      clipPath:
                        'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)',
                    }}
                  >
                    {/* Header Row: Question Title + Action Button (+/-) */}
                    <div className="flex items-center justify-between gap-4">
                      <h4
                        className={`font-heading font-extrabold text-base sm:text-[17.5px] tracking-tight ${
                          isOpen ? 'text-[#181512]' : 'text-white'
                        }`}
                      >
                        {faq.question}
                      </h4>

                      {/* Plus/Minus Circular Button */}
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-xs ${
                          isOpen
                            ? 'bg-[#181512]/15 text-[#181512]'
                            : 'bg-[#2A231C] border border-[#3E342B] text-white/80'
                        }`}
                      >
                        {isOpen ? (
                          <Minus size={16} strokeWidth={2.5} />
                        ) : (
                          <Plus size={16} strokeWidth={2.5} />
                        )}
                      </div>
                    </div>

                    {/* Expanded Answer Text */}
                    {isOpen && (
                      <p className="text-[#181512]/90 text-xs sm:text-[14px] leading-relaxed mt-2.5 font-medium max-w-xl animate-in fade-in duration-200">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}
