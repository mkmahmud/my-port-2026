'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  content: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Ava Wilson',
    role: 'Owner, Clothing Brand',
    rating: 5.0,
    content:
      'Working with Mahmudul completely transformed our product experience. The UI felt modern, user-friendly, and perfectly aligned with our brand vision. Communication was smooth, revisions were handled quickly, and every technical decision felt thoughtful and strategic. The final result not only looked premium but also improved usability and customer engagement.',
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'Tech Lead & Co-Founder, LeoPhoenix',
    rating: 5.0,
    content:
      'Mahmudul is an outstanding full-stack engineer. His deep command across Next.js state management, FastAPI microservices, and Docker CI/CD pipelines enabled us to ship our core multi-tenant platform weeks ahead of deadline. Clean code, proactive communication, and top-tier craftsmanship throughout the engagement.',
  },
  {
    id: '3',
    name: 'Sarah Jenkins',
    role: 'Product Director, EdTech Solutions',
    rating: 5.0,
    content:
      'The Blossom Academy platform required complex live batching and real-time attendance handling. Mahmudul designed the entire architecture from database schema to interactive classroom modules with zero latency. A truly dependable software architect who solves problems before they arise.',
  },
  {
    id: '4',
    name: 'Marcus Vance',
    role: 'Engineering Manager, Codexmine Enterprise',
    rating: 5.0,
    content:
      'Building the AI Sales Pilot and our automated computer-vision OMR sheet scanner with Mahmudul was phenomenal. He understands both agentic LLM pipelines and production containerization intimately. An invaluable partner for any serious engineering initiative.',
  },
];

const CARD_CLIP_PATH =
  'polygon(0% 20px, 20px 0%, calc(100% - 20px) 0%, calc(100% - 8px) 14px, calc(100% - 8px) 45%, 100% 52%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px))';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const current = TESTIMONIALS[currentIndex];

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="testimonials"
      className="py-20 sm:py-24 md:py-28 bg-[#FAF6EE] relative overflow-hidden"
    >
      <Container>
        {/* CENTERED SECTION HEADER */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-18 select-none">
          {/* Double Circle Icon + What Clients Say label */}
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex items-center">
              <span className="w-3.5 h-3.5 rounded-full bg-[#181512]" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#F6991A] -ml-1.5" />
            </div>
            <span className="text-[#181512] font-semibold text-sm tracking-tight">
              What Clients Say
            </span>
          </div>

          {/* Heading with 3-leaf sparkle decoration on 'Say' */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-heading font-extrabold tracking-tight leading-[1.12]">
            <span className="relative inline-block text-[#F6991A]">
              What Clients Say
              {/* 3 decorative leaf petals at top-right of 'Say' */}
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
            <span className="text-[#181512]">About My Work</span>
          </h2>
        </div>

        {/* DUAL CARDS: LEFT DARK STATS CARD | RIGHT WHITE SLIDER CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* LEFT COLUMN: DARK REVIEW STATS BADGE CARD (approx 35-38% width) */}
          <div className="lg:col-span-4 flex">
            <div className="relative w-full filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.15)] flex">
              <div
                className="w-full bg-[#181512] text-white p-8 sm:p-10 flex flex-col items-center justify-center text-center select-none"
                style={{ clipPath: CARD_CLIP_PATH }}
              >
                {/* Big Score 4.9 */}
                <div className="text-5xl sm:text-6xl md:text-[68px] font-heading font-extrabold text-white tracking-tight leading-none mb-3">
                  4.9
                </div>

                {/* 5 Golden Stars */}
                <div className="flex items-center gap-1 text-[#F6991A] mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 sm:w-6 sm:h-6 fill-[#F6991A] text-[#F6991A]"
                    />
                  ))}
                </div>

                {/* Review count */}
                <div className="text-xs sm:text-sm text-[#A8A29E] font-medium tracking-wide mb-6">
                  (350+ Reviews)
                </div>

                {/* Tagline */}
                <p className="text-white/90 text-sm sm:text-[15px] font-medium leading-snug mb-7 max-w-[200px]">
                  Trusted Experiences Shared by Clients
                </p>

                {/* 4 Overlapping Client Avatars */}
                <div className="flex items-center justify-center">
                  {[
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-[#181512] overflow-hidden -ml-2.5 first:ml-0 shadow-md"
                    >
                      <Image
                        src={src}
                        alt="Client Avatar"
                        fill
                        className="object-cover"
                        sizes="36px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: WHITE TESTIMONIAL CAROUSEL SLIDER CARD (approx 62-65% width) */}
          <div className="lg:col-span-8 flex">
            <div className="relative w-full filter drop-shadow-[0_4px_20px_rgba(24,21,18,0.05)] hover:drop-shadow-[0_10px_28px_rgba(246,153,26,0.1)] transition-all duration-400 flex">
              <div
                className="w-full bg-white p-7 sm:p-10 md:p-12 flex flex-col justify-between relative overflow-hidden"
                style={{ clipPath: CARD_CLIP_PATH }}
              >
                {/* GIANT SUBTLE WATERMARK QUOTATION MARKS IN BACKGROUND */}
                <div
                  className="absolute top-12 right-12 text-[#FAF6EE] select-none pointer-events-none text-[180px] font-serif font-black leading-none opacity-80"
                  aria-hidden="true"
                >
                  ”
                </div>

                <div>
                  {/* STAR RATING + SCORE HEADER */}
                  <div className="flex items-center gap-2 mb-6 sm:mb-8 select-none">
                    <div className="flex items-center gap-1 text-[#F6991A]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 sm:w-5 sm:h-5 fill-[#F6991A] text-[#F6991A]"
                        />
                      ))}
                    </div>
                    <span className="font-heading font-extrabold text-sm sm:text-base text-[#181512] ml-1">
                      {current.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* TESTIMONIAL QUOTE CONTENT WITH SLIDING TRANSITION */}
                  <div className="relative min-h-[140px] sm:min-h-[160px] flex items-center">
                    <div
                      key={current.id}
                      className={`transition-all duration-400 ease-out ${
                        direction === 'right'
                          ? 'animate-in fade-in slide-in-from-right-6'
                          : 'animate-in fade-in slide-in-from-left-6'
                      }`}
                    >
                      <p className="text-[#3A352F] text-sm sm:text-base md:text-[17px] leading-relaxed font-normal">
                        {current.content}
                      </p>
                    </div>
                  </div>
                </div>

                {/* BOTTOM ROW: CLIENT INFO (LEFT) | SLIDER CONTROLS (RIGHT) */}
                <div className="flex items-center justify-between gap-4 pt-8 mt-6 border-t border-[#E5DFD3]/60 relative z-10">
                  {/* Client Info */}
                  <div>
                    <h4 className="font-heading font-extrabold text-base sm:text-lg text-[#181512] tracking-tight">
                      {current.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#7A746B] font-medium tracking-normal mt-0.5">
                      {current.role}
                    </p>
                  </div>

                  {/* Slider Controls: Prev (Dark) and Next (Orange) */}
                  <div className="flex items-center gap-3 select-none">
                    <button
                      onClick={handlePrev}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#181512] text-white flex items-center justify-center font-bold hover:bg-[#F6991A] hover:text-[#181512] transition-colors duration-200 shadow-sm cursor-pointer group"
                      aria-label="Previous Testimonial"
                    >
                      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F6991A] text-[#181512] flex items-center justify-center font-bold hover:bg-[#E0850B] transition-colors duration-200 shadow-sm cursor-pointer group"
                      aria-label="Next Testimonial"
                    >
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
