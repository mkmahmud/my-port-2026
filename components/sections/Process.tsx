'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

export function Process() {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Architecture',
      description: 'Understanding core business requirements, system constraints, database schemas, and choosing the optimal tech stack.',
      icon: Search,
    },
    {
      number: '02',
      title: 'UI/UX & Prototyping',
      description: 'Translating design specifications into responsive, accessible components with strict design system token discipline.',
      icon: PenTool,
    },
    {
      number: '03',
      title: 'Full-Stack Development',
      description: 'Writing high-throughput backend APIs, integrating database transactions, and engineering seamless frontend states.',
      icon: Code,
    },
    {
      number: '04',
      title: 'Testing & Launch',
      description: 'Executing unit/integration tests, setting up Docker containers and CI/CD pipelines, and ensuring zero-downtime deployment.',
      icon: Rocket,
    }
  ];

  return (
    <section className="py-24 bg-[#FBF8F2] relative border-t border-[#EBE3D5]">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EDE2] border border-[#EBE3D5] text-[#181512] text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F6991A]" />
              Work Methodology
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#181512] tracking-tight">
              The Clear <span className="text-[#F6991A]">Development Process</span>
            </h2>
          </div>
          <p className="text-base text-[#7A746B] max-w-md leading-relaxed">
            A battle-tested 4-stage engineering lifecycle designed for speed, clarity, and dependable production outcomes.
          </p>
        </div>

        {/* 4 Process Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-3xl p-8 border border-[#EBE3D5] shadow-sm hover:shadow-xl hover:border-[#D5CBB9] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-[#F2EDE2] text-[#181512] flex items-center justify-center font-bold group-hover:bg-[#F6991A] group-hover:text-[#181512] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xl font-extrabold text-[#F6991A]">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-[#181512] mb-3 group-hover:text-[#F6991A] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#7A746B] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#EBE3D5] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F6991A]" />
                  <span className="text-xs font-mono text-[#7A746B]">Milestone {step.number}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
