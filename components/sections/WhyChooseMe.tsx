'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { CheckCircle2, ShieldCheck, Zap, Sparkles, Clock, Users } from 'lucide-react';

export function WhyChooseMe() {
  const reasons = [
    {
      id: '01',
      title: 'Obsessive Code Quality & Architecture',
      description: 'Clean, type-safe, maintainable TypeScript and Python code written with clear separation of concerns, exhaustive error handling, and robust tests.',
      icon: ShieldCheck,
    },
    {
      id: '02',
      title: 'Full-Stack & Autonomous AI Fluency',
      description: 'Not just a frontend coder or database admin. I seamlessly bridge high-fidelity UI/UX with asynchronous background workers, vector databases, and LLM pipelines.',
      icon: Zap,
    },
    {
      id: '03',
      title: 'Fast Delivery With Zero Excuses',
      description: 'Direct communication, transparent timeline tracking, and pragmatic milestone execution without unnecessary friction or delays.',
      icon: Clock,
    }
  ];

  return (
    <section className="py-24 bg-[#181512] text-[#FBF8F2] relative border-t border-[#362F27]">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241F1A] border border-[#362F27] text-[#F6991A] text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F6991A]" />
              Value Proposition
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              Why Choose Me <span className="text-[#F6991A]">for Your Project?</span>
            </h2>
          </div>
          <p className="text-base text-[#F5EFEB]/70 max-w-md leading-relaxed">
            I combine deep technical engineering rigor with an eye for modern agency-grade design.
          </p>
        </div>

        {/* 3 Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-[#241F1A] border border-[#362F27] rounded-3xl p-8 flex flex-col justify-between hover:border-[#F6991A]/50 transition-all duration-300 group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-[#181512] text-[#F6991A] border border-[#362F27] flex items-center justify-center font-bold group-hover:bg-[#F6991A] group-hover:text-[#181512] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-sm text-[#F6991A] font-bold">{item.id}</span>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-white mb-4 group-hover:text-[#F6991A] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#F5EFEB]/70 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#362F27] flex items-center gap-2 text-xs font-mono text-[#F6991A]">
                  <CheckCircle2 size={14} />
                  <span>Production-Grade Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
