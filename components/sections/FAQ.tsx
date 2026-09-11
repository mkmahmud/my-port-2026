'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: 'What is your primary tech stack for new web projects?',
      a: 'My primary stack consists of Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS on the frontend. For backend services and APIs, I specialize in FastAPI (Python) and Node.js (Express / NestJS) paired with PostgreSQL, Redis, and MongoDB.',
    },
    {
      q: 'Can you build custom AI agents or LangChain workflows?',
      a: 'Yes, extensively. I build multi-agent systems using LangChain and LangGraph, including custom RAG pipelines, contextual document search using vector embeddings, automated sales outreach bots, and intelligent data parsers.',
    },
    {
      q: 'How do you handle project timelines and communication?',
      a: 'I work with structured milestones, clear documentation, and daily or weekly asynchronous progress reports. Communication can be conducted via Slack, Discord, email, or video syncs depending on your team preference.',
    },
    {
      q: 'Are you available for full-time roles or contract projects?',
      a: 'Yes, I am actively open to both high-impact contract projects (fixed-price or monthly retainer) and selective full-time engineering roles with forward-thinking tech teams.',
    },
    {
      q: 'Do you provide maintenance and post-launch support?',
      a: 'Absolutely. Every fixed-scope project includes a 2-week warranty period for bug fixes and adjustments. Ongoing support packages and monthly retainers are also available for continuous feature shipping.',
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#181512] text-[#FBF8F2] relative border-t border-[#362F27]">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241F1A] border border-[#362F27] text-[#F6991A] text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F6991A]" />
              Got Questions?
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              Frequently Asked <span className="text-[#F6991A]">Questions</span>
            </h2>
          </div>
          <p className="text-base text-[#F5EFEB]/70 max-w-md leading-relaxed">
            Common questions about technical capabilities, pricing, communication cadence, and project delivery.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#241F1A] border border-[#362F27] rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-[#181512] text-[#F6991A] flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#F6991A] text-[#181512]' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-[#F5EFEB]/75 leading-relaxed border-t border-[#362F27] pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
