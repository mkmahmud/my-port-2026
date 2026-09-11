'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Download, Award, Briefcase, Code, CheckCircle2 } from 'lucide-react';
import { NumberCounter } from '@/components/animations/NumberCounter';

export function About() {
  const stats = [
    { label: 'Years Experience', value: 3, suffix: '+' },
    { label: 'Completed Projects', value: 15, suffix: '+' },
    { label: 'Technologies Mastered', value: 25, suffix: '+' },
    { label: 'Client Satisfaction', value: 100, suffix: '%' },
  ];

  return (
    <section id="about" className="py-24 bg-[#181512] text-[#FBF8F2] relative overflow-hidden border-t border-[#362F27]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#F6991A]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Stylized Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Outer decorative card frame */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#362F27] bg-[#241F1A] shadow-2xl">
                <Image
                  src="/images/profile.png"
                  alt="Mahmudul Hasan - Full Stack Developer"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181512] via-transparent to-transparent opacity-80" />
                
                {/* Bottom Overlay Pill on Photo */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#181512]/90 backdrop-blur-md border border-[#362F27] rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <div className="text-white font-heading font-bold text-sm">Mahmudul Hasan</div>
                    <div className="text-xs text-[#F6991A] font-mono">Full-Stack & AI Engineer</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#F6991A] text-[#181512] flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Details, Stats & CV */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241F1A] border border-[#362F27] text-[#F6991A] text-xs font-semibold uppercase tracking-wider mb-4 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F6991A]" />
              About Me
            </div>

            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight mb-6">
              Who is <span className="text-[#F6991A]">Mahmudul Hasan?</span>
            </h2>

            <p className="text-[#F5EFEB]/80 text-base sm:text-lg leading-relaxed mb-6 font-normal">
              I am a dedicated software engineer with deep expertise across modern web ecosystems and automated AI agents. Based in Dhaka, Bangladesh, I specialize in crafting ultra-responsive web experiences with Next.js, robust backend microservices with FastAPI and Node.js, and cutting-edge RAG systems with LangChain.
            </p>

            <p className="text-[#F5EFEB]/60 text-sm sm:text-base leading-relaxed mb-8">
              Whether architecting full-fledged multi-tenant ERPs or deploying low-latency LLM workflows to production, my focus is always on engineering precision, accessibility, and measurable business impact.
            </p>

            {/* 4 Stat Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#362F27] mb-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#F6991A]">
                    <NumberCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-[#F5EFEB]/70 mt-1 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Download CV & Hire Action */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="md"
                href="/resume.pdf"
                external
                withArrow
                icon={<Download size={16} />}
              >
                Download CV
              </Button>
              <Button
                variant="dark"
                size="md"
                href="#contact"
              >
                Let&apos;s Connect
              </Button>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
