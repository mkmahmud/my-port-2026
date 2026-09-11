'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Client Partner',
      role: 'Founder & Tech Lead, LeoPhoenix',
      content: 'Mahmudul is an exceptional engineer. His mastery across both Next.js frontend state management and high-concurrency backend services delivered our platform weeks ahead of schedule. The code was exceptionally well-structured.',
      rating: 5,
    },
    {
      name: 'Product Director',
      role: 'Education Systems Directorate',
      content: 'The Blossom Academy platform required complex live batching and real-time attendance handling. Mahmudul designed the entire system from database schema to classroom chat flawlessly with zero downtime.',
      rating: 5,
    },
    {
      name: 'Engineering Manager',
      role: 'Codexmine Enterprise',
      content: 'Working with Mahmudul on AI Sales Pilot and the OMR evaluation pipeline was a breeze. He understands both LLM agents and production containerization intimately. Highly recommended!',
      rating: 5,
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
              Client Feedback
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#181512] tracking-tight">
              What Collaborators <span className="text-[#F6991A]">Say About Me</span>
            </h2>
          </div>

          {/* Rating Summary Badge */}
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-[#EBE3D5] shadow-sm">
            <span className="text-2xl font-heading font-extrabold text-[#181512]">5.0</span>
            <div>
              <div className="text-xs text-[#F6991A]">★★★★★</div>
              <div className="text-[11px] text-[#7A746B] font-mono">100% Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Testimonials 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-[#EBE3D5] shadow-sm hover:shadow-xl hover:border-[#D5CBB9] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1 text-[#F6991A]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-[#F6991A]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#EBE3D5]" />
                </div>

                <p className="text-sm sm:text-base text-[#7A746B] leading-relaxed mb-8 italic">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-[#EBE3D5] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#181512] text-[#F6991A] font-bold flex items-center justify-center text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-heading font-bold text-[#181512]">{t.name}</div>
                  <div className="text-xs text-[#7A746B]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
