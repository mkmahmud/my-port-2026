'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { EXPERIENCE, EDUCATION } from '@/lib/constants';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-[#FBF8F2] relative border-t border-[#EBE3D5]">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EDE2] border border-[#EBE3D5] text-[#181512] text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F6991A]" />
              Career Journey
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#181512] tracking-tight">
              Academic & <span className="text-[#F6991A]">Professional Experience</span>
            </h2>
          </div>
          <p className="text-base text-[#7A746B] max-w-md leading-relaxed">
            A track record of engineering scalable real-world products in agile remote and in-office teams.
          </p>
        </div>

        {/* Dual Columns: Experience (Left) & Education (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Experience Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#F6991A] text-[#181512] flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#181512]">Work Experience</h3>
            </div>

            {EXPERIENCE.map((exp, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE3D5] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-[#F6991A] bg-[#F6991A]/10 px-3 py-1 rounded-full">
                      {exp.startDate} - {exp.endDate}
                    </span>
                    <span className="text-xs text-[#7A746B] flex items-center gap-1">
                      <MapPin size={12} /> {exp.location}
                    </span>
                  </div>

                  <h4 className="text-xl font-heading font-bold text-[#181512] mb-1">
                    {exp.role}
                  </h4>
                  <div className="text-sm font-semibold text-[#7A746B] mb-4">
                    {exp.company}
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="text-sm text-[#7A746B] leading-relaxed flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F6991A] mt-2 flex-shrink-0" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {exp.techStack && (
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#EBE3D5]">
                    {exp.techStack.map((tech) => (
                      <span key={tech} className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#F2EDE2] text-[#181512]">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Education & Certifications Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#181512] text-[#F6991A] flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#181512]">Education & Focus</h3>
            </div>

            {EDUCATION.map((edu, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE3D5] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-[#181512] bg-[#F2EDE2] px-3 py-1 rounded-full">
                      {edu.startDate} - {edu.endDate}
                    </span>
                    <span className="text-xs font-mono text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded">
                      Graduated / Verified
                    </span>
                  </div>

                  <h4 className="text-xl font-heading font-bold text-[#181512] mb-1">
                    {edu.degree}
                  </h4>
                  <div className="text-base font-semibold text-[#F6991A] mb-4">
                    {edu.institution}
                  </div>

                  <p className="text-sm text-[#7A746B] leading-relaxed mb-4">
                    Rigorous academic training in algorithms, database engineering, software architecture, and distributed computer systems.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EBE3D5] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#7A746B]">Major: Computer Science</span>
                  <span className="text-xs font-heading font-bold text-[#181512]">Uttara, Dhaka</span>
                </div>
              </div>
            ))}

            {/* Practical Certifications card */}
            <div className="bg-gradient-to-br from-[#F2EDE2] to-[#EBE3D5]/60 rounded-3xl p-6 sm:p-8 border border-[#EBE3D5]">
              <h4 className="text-lg font-heading font-bold text-[#181512] mb-2">
                Continuous Technical Upskilling
              </h4>
              <p className="text-sm text-[#7A746B] leading-relaxed mb-4">
                Active practitioner of modern AI agent architectures, autonomous LangGraph workflows, and scalable cloud-native architectures.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Modern Next.js 15', 'LangChain AI', 'Docker Containerization', 'PostgreSQL Internals'].map((skill) => (
                  <span key={skill} className="text-xs font-mono px-3 py-1 rounded-full bg-white text-[#181512] border border-[#D5CBB9]">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
