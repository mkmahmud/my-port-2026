'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { ArrowUpRight, Code, Server, Bot, Layers, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  tags: string[];
  featured?: boolean;
}

export function Services() {
  const services: ServiceItem[] = [
    {
      id: '01',
      title: 'Full-Stack Web Architecture',
      description: 'Engineering responsive, lightning-fast web applications using Next.js 15, React 19, and Node.js with secure authentication and state management.',
      icon: Code,
      tags: ['Next.js', 'React 19', 'TypeScript', 'Tailwind'],
      featured: true,
    },
    {
      id: '02',
      title: 'Backend & High-Throughput APIs',
      description: 'Designing resilient microservices and REST/GraphQL APIs with FastAPI, Express, PostgreSQL, Redis caching, and task worker queues.',
      icon: Server,
      tags: ['FastAPI', 'Node.js', 'PostgreSQL', 'Redis'],
    },
    {
      id: '03',
      title: 'AI Agents & LLM Pipelines',
      description: 'Integrating autonomous LangGraph agents, document-grounded RAG retrieval pipelines, and custom vector search engines into business workflows.',
      icon: Bot,
      tags: ['LangChain', 'LangGraph', 'RAG', 'VectorDB'],
    },
    {
      id: '04',
      title: 'Cloud, CI/CD & DevOps',
      description: 'Configuring multi-stage Docker containers, automated GitHub Actions pipelines, Nginx reverse proxies, and scalable AWS cloud infrastructure.',
      icon: Layers,
      tags: ['Docker', 'AWS', 'CI/CD', 'GitHub Actions'],
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#FBF8F2] relative">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EDE2] border border-[#EBE3D5] text-[#181512] text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F6991A]" />
              Services
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#181512] tracking-tight">
              What I Bring <span className="text-[#F6991A]">To The Table</span>
            </h2>
          </div>
          <p className="text-base text-[#7A746B] max-w-md leading-relaxed">
            From technical discovery to continuous production deployment, I provide end-to-end full-stack capabilities with clean craftsmanship.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv) => {
            const IconComponent = srv.icon;
            if (srv.featured) {
              return (
                <div
                  key={srv.id}
                  className="bg-[#181512] text-[#FBF8F2] rounded-3xl p-8 sm:p-10 border border-[#362F27] flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#F6991A]/50 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#F6991A]/10 rounded-full blur-3xl pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-[#F6991A] text-[#181512] flex items-center justify-center font-bold shadow-md">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <span className="font-mono text-sm text-[#F6991A] font-bold tracking-widest">{srv.id}</span>
                    </div>

                    <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-[#F6991A] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-[#F5EFEB]/75 text-sm sm:text-base leading-relaxed mb-8">
                      {srv.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {srv.tags.map((tag) => (
                        <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full bg-[#241F1A] text-[#F5EFEB]/90 border border-[#362F27]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-3 text-sm font-semibold text-[#F6991A] hover:text-[#E0850B] transition-colors"
                    >
                      <span>Discuss a project</span>
                      <span className="w-8 h-8 rounded-full bg-[#241F1A] border border-[#362F27] flex items-center justify-center text-white group-hover:bg-[#F6991A] group-hover:text-[#181512] transition-all">
                        ➔
                      </span>
                    </a>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={srv.id}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EBE3D5] flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#D5CBB9] transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#F2EDE2] text-[#181512] flex items-center justify-center font-bold group-hover:bg-[#F6991A]/20 transition-colors">
                      <IconComponent className="w-7 h-7 text-[#181512]" />
                    </div>
                    <span className="font-mono text-sm text-[#7A746B] font-bold tracking-widest">{srv.id}</span>
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-[#181512] mb-4 group-hover:text-[#F6991A] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-[#7A746B] text-sm sm:text-base leading-relaxed mb-8">
                    {srv.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {srv.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full bg-[#F2EDE2] text-[#181512] border border-[#EBE3D5]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-3 text-sm font-semibold text-[#181512] group-hover:text-[#F6991A] transition-colors"
                  >
                    <span>Discuss a project</span>
                    <span className="w-8 h-8 rounded-full bg-[#F2EDE2] flex items-center justify-center text-[#181512] group-hover:bg-[#F6991A] group-hover:text-[#181512] transition-all">
                      ➔
                    </span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
