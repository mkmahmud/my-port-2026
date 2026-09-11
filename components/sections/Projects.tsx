'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ArrowUpRight } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  tags: string[];
  description: string;
  image: string;
  imageAlt: string;
  liveUrl?: string;
  slug?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: '1',
    title: 'Bakery Shop - Bakery Shop Mobile App Solution',
    tags: ['UI/UX Design', 'App Design', 'Wireframe'],
    description:
      'Modern bakery app for exploring fresh bakery products, easy ordering, seamless shopping, and fast doorstep delivery.',
    image: '/images/projects/bakery-shop.png',
    imageAlt: 'Bakery Shop Mobile App Solution Mockup',
    liveUrl: '#contact',
    slug: 'bakery-shop',
  },
  {
    id: '2',
    title: 'Clothing Store - Clothing E Commerce Website',
    tags: ['UI/UX Design', 'Web Design', 'Wireframe'],
    description:
      'Modern clothing store website for browsing fashion collections, seamless shopping, secure checkout, and smooth online purchasing experience.',
    image: '/images/projects/clothing-store.png',
    imageAlt: 'Clothing Store E Commerce Website Mockup',
    liveUrl: '#contact',
    slug: 'clothing-store',
  },
  {
    id: '3',
    title: 'Blossom Academy - Interactive EdTech Platform',
    tags: ['Full Stack', 'Next.js', 'PostgreSQL'],
    description:
      'Online educational management ecosystem featuring automated class notification dispatches, verified one-click attendance, and role-based student/educator dashboards.',
    image: 'https://i.ibb.co/Kz6SST6B/Whats-App-Image-2025-07-20-at-02-31-35-63e4d26c.jpg',
    imageAlt: 'Blossom Academy EdTech Platform',
    liveUrl: 'https://blossom-academy.netlify.app/',
    slug: 'blossom-academy',
  },
  {
    id: '4',
    title: 'Codex Edumine - Institute ERP & OMR Evaluation',
    tags: ['FastAPI', 'Computer Vision', 'Redis'],
    description:
      'High-performance institutional management ERP integrating real-time biometric terminal ingestion and OpenCV computer-vision answer sheet evaluation in under 3ms.',
    image: '/images/projects/codex-edumine.svg',
    imageAlt: 'Codex Edumine Institute ERP',
    liveUrl: '#contact',
    slug: 'codex-edumine',
  },
];

// Card 1 Polygon: Chamfered corners with notch on the RIGHT edge
const POLYGON_NOTCH_RIGHT =
  'polygon(24px 0%, calc(100% - 24px) 0%, 100% 24px, 100% calc(45% - 8px), calc(100% - 12px) 45%, calc(100% - 12px) 55%, 100% calc(55% + 8px), 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0% calc(100% - 24px), 0% 24px)';

// Card 2 Polygon: Chamfered corners with notch on the LEFT edge
const POLYGON_NOTCH_LEFT =
  'polygon(24px 0%, calc(100% - 24px) 0%, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0% calc(100% - 24px), 0% calc(55% + 8px), 12px 55%, 12px 45%, 0% calc(45% - 8px), 0% 24px)';

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? PROJECTS : PROJECTS.slice(0, 2);

  return (
    <section
      id="projects"
      className="relative bg-[#181512] text-[#FBF8F2] pt-20 sm:pt-24 pb-16 sm:pb-24 overflow-hidden border-t-[3px] border-b-[3px] border-[#F6991A]"
    >
      {/* Subtle ambient warm backdrop glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#F6991A]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <Container>
        {/* SECTION HEADER GROUP */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-18 gap-6">
          <div>
            {/* Double Circle Icon + My Portfolio label */}
            <div className="flex items-center gap-2 mb-3 select-none">
              <div className="relative flex items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-white" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#F6991A] -ml-1.5" />
              </div>
              <span className="text-white font-semibold text-sm tracking-tight">
                My Portfolio
              </span>
            </div>

            {/* Main Heading with 3-leaf sparkle decoration on 'Look' */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-heading font-extrabold tracking-tight leading-[1.12]">
              <span className="text-white">Let’s Have a </span>
              <span className="relative inline-block text-[#F6991A]">
                Look
                {/* 3 decorative leaf petals at top-right of 'Look' */}
                <svg
                  className="absolute -top-3 -right-6 sm:-top-3.5 sm:-right-7 w-5 h-5 sm:w-6 sm:h-6 text-white pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 11C13 6 16.5 2.5 21 2C20.5 6.5 17 10 12 11Z" />
                  <path d="M13 12C17 11 21.5 12 24 15.5C21.5 18 17 17.5 13 14C12.5 13.5 12.5 12.5 13 12Z" />
                  <path d="M12 13C13 17 15 20.5 17.5 23.5C14.5 23 11.5 20.5 10.5 16.5C10.5 14 11.5 13 12 13Z" />
                </svg>
              </span>
              <br />
              <span className="text-[#F6991A]">at My Portfolio</span>
            </h2>
          </div>

          {/* Top-Right CTA Capsule Button */}
          <div className="shrink-0">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center bg-[#181512] border border-[#362F27] pl-5 sm:pl-6 pr-1.5 py-1 rounded-full shadow-lg hover:border-[#F6991A]/60 hover:scale-[1.03] transition-all duration-200 group cursor-pointer"
            >
              <span className="text-white font-bold text-xs sm:text-sm tracking-tight mr-3 sm:mr-4">
                {showAll ? 'Show Featured' : 'View All Projects'}
              </span>
              <div className="bg-[#F6991A] px-2.5 py-1.5 rounded-full flex items-center justify-center group-hover:bg-[#E0850B] transition-colors">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#181512] flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm group-hover:translate-x-0.5 transition-transform">
                  ➔
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* PROJECTS SHOWCASE LIST */}
        <div className="flex flex-col gap-8 sm:gap-12">
          {displayedProjects.map((project, idx) => {
            const isEven = idx % 2 === 1; // 0 = notch right, 1 = notch left
            const clipPathStyle = isEven ? POLYGON_NOTCH_LEFT : POLYGON_NOTCH_RIGHT;

            return (
              <div
                key={project.id}
                className="relative filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.4)] transition-all duration-500 hover:drop-shadow-[0_16px_40px_rgba(246,153,26,0.12)] group"
              >
                {/* 1px GEOMETRIC CHAMFERED BORDER WRAPPER */}
                <div
                  className="p-[1px] bg-[#362F27] group-hover:bg-[#F6991A]/60 transition-colors duration-400"
                  style={{ clipPath: clipPathStyle }}
                >
                  {/* CARD INNER CONTAINER */}
                  <div
                    className="bg-[#241F1A] p-5 sm:p-8 md:p-10 lg:p-12 w-full transition-colors duration-300"
                    style={{ clipPath: clipPathStyle }}
                  >
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                        isEven ? 'lg:flex-row-reverse' : ''
                      }`}
                    >
                      {/* CARD IMAGE CONTAINER (Left on Card 1, Right on Card 2) */}
                      <div
                        className={`lg:col-span-6 w-full ${
                          isEven ? 'lg:order-2' : 'lg:order-1'
                        }`}
                      >
                        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#181512] border border-[#362F27] shadow-inner group/img">
                          <Image
                            src={project.image}
                            alt={project.imageAlt}
                            fill
                            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                            priority={idx === 0}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#181512]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                      </div>

                      {/* CARD CONTENT (Right on Card 1, Left on Card 2) */}
                      <div
                        className={`lg:col-span-6 flex flex-col justify-center ${
                          isEven ? 'lg:order-1 lg:pr-4' : 'lg:order-2 lg:pl-4'
                        }`}
                      >
                        {/* 3 Golden Orange Pill Tags */}
                        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-4 sm:mb-5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3.5 sm:px-4 py-1.5 rounded-full bg-[#F6991A] text-[#181512] font-bold text-xs sm:text-[13px] tracking-tight shadow-sm select-none"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Project Title */}
                        <h3 className="text-2xl sm:text-3xl md:text-[32px] font-heading font-extrabold text-white tracking-tight leading-snug mb-3 sm:mb-4 group-hover:text-[#F6991A] transition-colors duration-300">
                          {project.title}
                        </h3>

                        {/* Project Description */}
                        <p className="text-[#A8A29E] text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 font-normal max-w-xl">
                          {project.description}
                        </p>

                        {/* Bottom Action Button (Circular arrow button) */}
                        <div>
                          <a
                            href={project.liveUrl || '#contact'}
                            target={project.liveUrl?.startsWith('http') ? '_blank' : '_self'}
                            rel="noopener noreferrer"
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#181512] border border-[#362F27] flex items-center justify-center text-white/90 group-hover:bg-[#F6991A] group-hover:text-[#181512] group-hover:border-[#F6991A] transition-all duration-300 shadow-md group-hover:scale-105"
                            aria-label={`View ${project.title}`}
                          >
                            <ArrowUpRight className="w-5 h-5 stroke-[2.5] transition-transform duration-300 group-hover:rotate-45" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
