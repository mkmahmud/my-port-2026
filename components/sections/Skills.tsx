'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { 
  Code2, 
  Database, 
  Cpu, 
  Terminal, 
  Globe, 
  Layout, 
  Server, 
  Layers, 
  Workflow, 
  CheckCircle2 
} from 'lucide-react';

interface ToolSkill {
  name: string;
  category: string;
  proficiency: number;
  iconName: string;
}

export function Skills() {
  const tools: ToolSkill[] = [
    { name: 'TypeScript', category: 'Language', proficiency: 95, iconName: 'TS' },
    { name: 'React / Next.js', category: 'Frontend', proficiency: 95, iconName: 'NX' },
    { name: 'Node.js / Express', category: 'Backend', proficiency: 90, iconName: 'NO' },
    { name: 'Python / FastAPI', category: 'Backend & AI', proficiency: 88, iconName: 'PY' },
    { name: 'PostgreSQL', category: 'Database', proficiency: 88, iconName: 'PG' },
    { name: 'MongoDB', category: 'Database', proficiency: 92, iconName: 'MG' },
    { name: 'LangChain & RAG', category: 'AI Ecosystem', proficiency: 85, iconName: 'AI' },
    { name: 'Docker & AWS', category: 'DevOps', proficiency: 82, iconName: 'DK' },
  ];

  return (
    <section id="skills" className="py-24 bg-[#FBF8F2] relative border-t border-[#EBE3D5]">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EDE2] border border-[#EBE3D5] text-[#181512] text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F6991A]" />
              My Skills
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#181512] tracking-tight">
              Exploring the <span className="text-[#F6991A]">Tools Behind</span> My Work
            </h2>
          </div>
          <p className="text-base text-[#7A746B] max-w-md leading-relaxed">
            A battle-tested stack honed over years of shipping production systems, spanning full-stack web applications, AI graphs, and resilient cloud architectures.
          </p>
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="bg-white rounded-3xl p-6 border border-[#EBE3D5] shadow-sm hover:shadow-xl hover:border-[#D5CBB9] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Tool Icon Badge */}
                  <div className="w-12 h-12 rounded-2xl bg-[#FBF8F2] border border-[#EBE3D5] text-[#181512] font-mono font-bold flex items-center justify-center text-sm group-hover:bg-[#F6991A] group-hover:text-[#181512] group-hover:border-[#F6991A] transition-colors">
                    {tool.iconName}
                  </div>
                  {/* Percentage Badge */}
                  <span className="px-3 py-1 rounded-full bg-[#F2EDE2] text-[#181512] text-xs font-mono font-bold">
                    {tool.proficiency}%
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-[#181512] mb-1 group-hover:text-[#F6991A] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-[#7A746B] font-medium mb-6">
                  {tool.category}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#F2EDE2] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#F6991A] h-full rounded-full transition-all duration-500 group-hover:bg-[#E0850B]" 
                  style={{ width: `${tool.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Skill Taxonomy Tags */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#F2EDE2] border border-[#EBE3D5] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-heading font-bold text-[#181512]">Also proficient in:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['NestJS', 'GraphQL', 'Redis', 'Socket.io', 'Supabase', 'Celery', 'Tailwind CSS', 'Shadcn UI', 'CI/CD', 'Jest', 'Git'].map((tech) => (
              <span key={tech} className="text-xs font-mono px-3 py-1.5 rounded-full bg-white text-[#181512] border border-[#EBE3D5]">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
