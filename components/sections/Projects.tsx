'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { Github } from '@/components/ui/Icons';
import { DEFAULT_PROJECTS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export function Projects() {
  const showcaseProjects = DEFAULT_PROJECTS.slice(0, 4);

  return (
    <section id="projects" className="py-24 bg-[#181512] text-[#FBF8F2] relative border-t border-[#362F27]">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#F6991A]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241F1A] border border-[#362F27] text-[#F6991A] text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F6991A]" />
              Selected Portfolio
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              Take a Look At <span className="text-[#F6991A]">My Works</span>
            </h2>
          </div>
          <p className="text-base text-[#F5EFEB]/70 max-w-md leading-relaxed">
            Real production systems, enterprise platforms, and full-stack software built to solve real business challenges.
          </p>
        </div>

        {/* Project Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showcaseProjects.map((project) => {
            const isCaseStudy = project.projectType === 'case-study';
            const displayTitle = project.title || project.projectTitle || 'Untitled Project';
            const displayThumb = project.thumbnailUrl || project.gellaryImages?.[0] || project.images?.[0];
            const techList = project.techStack || project.Technologies || [];
            const isFlagship = project.slug === 'blossom-academy';

            return (
              <div
                key={project._id}
                className="bg-[#241F1A] border border-[#362F27] rounded-3xl overflow-hidden flex flex-col justify-between hover:border-[#F6991A]/40 transition-all duration-300 group shadow-xl"
              >
                <div>
                  {/* Card Thumbnail Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-[#181512]">
                    {displayThumb ? (
                      <Image
                        src={displayThumb}
                        alt={displayTitle}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center font-mono text-white/30 text-xl font-bold">
                        {displayTitle}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#241F1A] via-transparent to-transparent opacity-60" />

                    {/* Top Type Badge */}
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                      <span className={`px-3 py-1 text-xs font-mono font-semibold rounded-full backdrop-blur-md ${
                        isCaseStudy 
                          ? 'bg-[#F6991A] text-[#181512]' 
                          : 'bg-[#181512]/80 text-[#FBF8F2] border border-[#362F27]'
                      }`}>
                        {isCaseStudy ? 'Featured Case Study' : 'Project'}
                      </span>
                    </div>

                    {/* Live indicator if active */}
                    {project.liveUrl && (
                      <div className="absolute top-4 right-4 z-10">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-[#181512]/90 border border-[#362F27] text-white flex items-center justify-center hover:bg-[#F6991A] hover:text-[#181512] transition-colors shadow-md"
                          aria-label="View Live Project"
                        >
                          <ArrowUpRight size={16} />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8">
                    {project.projectKeyWord && (
                      <div className="text-xs font-mono text-[#F6991A] uppercase tracking-wider mb-2 font-semibold">
                        {project.projectKeyWord}
                      </div>
                    )}

                    <h3 className="text-2xl font-heading font-bold text-white mb-3 group-hover:text-[#F6991A] transition-colors">
                      {displayTitle}
                    </h3>

                    <p className="text-[#F5EFEB]/70 text-sm leading-relaxed mb-6 line-clamp-3">
                      {project.description || (Array.isArray(project.overview) ? project.overview[0] : project.overview)}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {techList.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono px-3 py-1 rounded-full bg-[#181512] text-[#F5EFEB]/90 border border-[#362F27]"
                        >
                          {t}
                        </span>
                      ))}
                      {techList.length > 5 && (
                        <span className="text-xs font-mono px-2 py-1 rounded-full bg-[#181512] text-[#F6991A] border border-[#362F27]">
                          +{techList.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 border-t border-[#362F27] flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#F6991A] group-hover:text-[#E0850B] transition-colors"
                  >
                    <span>{isCaseStudy ? 'Read Deep-Dive Case Study' : 'View Project Details'}</span>
                    <span className="w-7 h-7 rounded-full bg-[#181512] border border-[#362F27] flex items-center justify-center text-xs text-white group-hover:bg-[#F6991A] group-hover:text-[#181512] transition-colors">
                      ➔
                    </span>
                  </Link>

                  <div className="flex items-center gap-3 text-[#F5EFEB]/60">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#F6991A] transition-colors"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#F6991A] transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Explore More CTA */}
        <div className="mt-12 text-center">
          <Button variant="primary" size="md" href="#contact" withArrow>
            Request Custom Development
          </Button>
        </div>
      </Container>
    </section>
  );
}
