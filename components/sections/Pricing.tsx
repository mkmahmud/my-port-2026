'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Pricing() {
  const models = [
    {
      title: 'Fixed Scope Project',
      subtitle: 'Ideal for MVPs, Landing Systems & Turnkey Web Apps',
      badge: 'Defined Deliverables',
      features: [
        'Complete UI/UX design to code translation',
        'Next.js 15 & React 19 Frontend',
        'Database modeling & REST/GraphQL API',
        'Standard authentication & authorization',
        'Docker setup & cloud deployment',
        '2 weeks post-launch bug warranty',
      ],
      popular: false,
    },
    {
      title: 'Monthly Dedicated Retainer',
      subtitle: 'For scaling startups needing an autonomous engineer',
      badge: 'Most Popular',
      features: [
        'Full-stack frontend, backend & AI integration',
        'Continuous sprint cycles & daily commits',
        'Direct Slack/Discord communication',
        'LangChain / RAG AI agents implementation',
        'Database optimization & caching (Redis/Postgres)',
        'Priority feature requests & instant bug fixes',
      ],
      popular: true,
    },
    {
      title: 'Technical Advisory & Consultation',
      subtitle: 'Code audit, architecture review & AI roadmapping',
      badge: 'Hourly / Sprint',
      features: [
        'Deep codebase architecture review',
        'Performance & database index audits',
        'AI agent implementation roadmap',
        'CI/CD pipeline hardening',
        '1-on-1 technical pairing sessions',
        'Written architectural recommendations',
      ],
      popular: false,
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
              Engagement Models
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              Flexible <span className="text-[#F6991A]">Collaboration Models</span>
            </h2>
          </div>
          <p className="text-base text-[#F5EFEB]/70 max-w-md leading-relaxed">
            Transparent, straightforward partnership terms suited to both fast-moving startup MVPs and established enterprise products.
          </p>
        </div>

        {/* 3 Pricing / Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {models.map((model) => (
            <div
              key={model.title}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                model.popular
                  ? 'bg-[#241F1A] border-2 border-[#F6991A] shadow-2xl scale-[1.02]'
                  : 'bg-[#1D1915] border border-[#362F27] hover:border-[#F6991A]/40'
              }`}
            >
              {model.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F6991A] text-[#181512] text-xs font-bold px-4 py-1 rounded-full shadow-md">
                  ★ RECOMMENDED MODEL
                </div>
              )}

              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#F6991A] font-semibold mb-3">
                  {model.badge}
                </div>

                <h3 className="text-2xl font-heading font-bold text-white mb-2">
                  {model.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#F5EFEB]/70 mb-8 leading-relaxed">
                  {model.subtitle}
                </p>

                <div className="space-y-3 mb-8">
                  {model.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-[#F5EFEB]/80">
                      <div className="w-5 h-5 rounded-full bg-[#F6991A]/20 text-[#F6991A] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Button
                  variant={model.popular ? 'primary' : 'dark'}
                  size="md"
                  href="#contact"
                  withArrow
                  className="w-full justify-center"
                >
                  Discuss Terms
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
