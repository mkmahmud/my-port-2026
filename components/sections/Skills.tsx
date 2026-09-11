'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';

interface ToolItem {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: React.ReactNode;
}

const TOOLS: ToolItem[] = [
  {
    id: 'docker',
    name: 'Docker',
    category: 'DevOps & Containers',
    proficiency: 95,
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#0db7ed">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m21.758 1.488a7.614 7.614 0 00-3.324-2.176c-.27-.089-.523-.07-.724.03-.666.332-1.46.425-2.264.298-.444-.07-.759-.289-.968-.683l-.031-.059c-.319-.607-.373-1.127-.22-1.748.163-.66.602-1.17 1.173-1.411.332-.14.47-.358.384-.623-.1-.308-.415-.461-.796-.452-1.716.039-3.05 1.05-3.522 2.684-.257.888-.135 1.777.348 2.535a.17.17 0 01.026.046c-.53.305-1.174.37-1.874.22a8.683 8.683 0 01-4.808-2.61.18.18 0 00-.26-.008 8.877 8.877 0 00-2.316 4.606c-.469 2.222.138 4.293 1.714 5.86 2.454 2.44 6.275 3.018 9.382 1.436a10.638 10.638 0 005.405-5.592c.677-.076 1.428-.415 1.954-.875.46-.402.775-.92.935-1.54.072-.279-.084-.447-.291-.437" />
      </svg>
    ),
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Backend & AI',
    proficiency: 92,
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24">
        <path
          fill="#3776AB"
          d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.752h5.8v.825H3.852S0 5.79 0 11.905c0 6.113 3.359 5.922 3.359 5.922h2.004v-2.82s-.109-3.359 3.3-3.359h5.688s3.195.05 3.195-3.136V2.656S18.006 0 11.914 0zm-3.23 1.838a1.05 1.05 0 110 2.1 1.05 1.05 0 010-2.1z"
        />
        <path
          fill="#FFD43B"
          d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.006-2.752h-5.8v-.825h8.154S24 18.21 24 12.095c0-6.113-3.359-5.922-3.359-5.922h-2.004v2.82s.109 3.359-3.3 3.359H9.649s-3.195-.05-3.195 3.136v5.864S5.994 24 12.086 24zm3.23-1.838a1.05 1.05 0 110-2.1 1.05 1.05 0 010 2.1z"
        />
      </svg>
    ),
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Full Stack Core',
    proficiency: 98,
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#F7DF1E">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path
          fill="#000000"
          d="M6.48 18.5c.87.51 1.95.83 2.92.83 1.62 0 2.6-.76 2.6-2.17v-8.48h-1.95v8.42c0 .67-.42 1.02-1.07 1.02-.6 0-1.12-.22-1.52-.51l-.98.91zm8.38.16c1.38.67 3.01 1.04 4.5 1.04 2.82 0 4.47-1.45 4.47-3.83 0-2.22-1.34-3.26-3.23-4.04l-.84-.35c-1.16-.48-1.68-.92-1.68-1.66 0-.81.65-1.42 1.76-1.42.98 0 1.95.35 2.65.81l.92-1.45c-.87-.6-2.06-.97-3.41-.97-2.6 0-4.22 1.48-4.22 3.65 0 2.1 1.3 3.2 3.16 3.97l.84.35c1.24.52 1.84.97 1.84 1.8 0 .97-.81 1.62-2.14 1.62-1.24 0-2.43-.45-3.32-1.07l-1.25 1.54z"
        />
      </svg>
    ),
  },
  {
    id: 'nextjs',
    name: 'Next.js & React',
    category: 'Frontend & SSR',
    proficiency: 98,
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#000000">
        <circle cx="12" cy="12" r="11" fill="#000" />
        <path
          fill="#FFF"
          d="M14.7 17.5L8.5 9.5H7v8h1.7v-5.8l5.8 7.5c.4-.2.8-.4 1.2-.7zm1.3-4.2l-1.6-2.1v-.7h1.6v2.8z"
        />
      </svg>
    ),
  },
  {
    id: 'databases',
    name: 'Databases',
    category: 'Postgres, Mongo, Redis',
    proficiency: 94,
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#336791">
        <path d="M12 2C6.48 2 2 3.34 2 5v14c0 1.66 4.48 3 10 3s10-1.34 10-3V5c0-1.66-4.48-3-10-3zm0 2c4.42 0 8 .9 8 2s-3.58 2-8 2-8-.9-8-2 3.58-2 8-2zm0 16c-4.42 0-8-.9-8-2v-2.2c1.94 1.05 4.81 1.7 8 1.7s6.06-.65 8-1.7V18c0 1.1-3.58 2-8 2zm0-5c-4.42 0-8-.9-8-2v-2.2c1.94 1.05 4.81 1.7 8 1.7s6.06-.65 8-1.7V13c0 1.1-3.58 2-8 2zm0-5c-4.42 0-8-.9-8-2V5.8c1.94 1.05 4.81 1.7 8 1.7s6.06-.65 8-1.7V8c0 1.1-3.58 2-8 2z" />
      </svg>
    ),
  },
  {
    id: 'ai',
    name: 'AI & LangChain',
    category: 'Autonomous Agents & RAG',
    proficiency: 90,
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#F6991A">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5 2.5 2.5 0 0 0 7.5 18a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5Z" />
      </svg>
    ),
  },
  {
    id: 'aws',
    name: 'Cloud & CI/CD',
    category: 'AWS, Actions & Nginx',
    proficiency: 88,
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#FF9900">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
      </svg>
    ),
  },
  {
    id: 'nodejs',
    name: 'Node.js & FastAPI',
    category: 'High-Throughput APIs',
    proficiency: 92,
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#339933">
        <path d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 2.3L5 8.3v7.4l7 4 7-4V8.3l-7-4z" />
      </svg>
    ),
  },
  {
    id: 'git',
    name: 'Git & Linux',
    category: 'VCS & Production Systems',
    proficiency: 96,
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#F05032">
        <path d="M21.62 10.63l-8.25-8.25a2.75 2.75 0 00-3.89 0L7.7 4.16l2.45 2.45a1.86 1.86 0 012.36 2.37l2.36 2.36a1.86 1.86 0 012.37 2.36l3.38-3.38a2.75 2.75 0 000-3.89zM5.92 5.94L2.38 9.48a2.75 2.75 0 000 3.89l8.25 8.25a2.75 2.75 0 003.89 0l3.47-3.47-2.48-2.48a1.86 1.86 0 01-2.36-2.37L10.79 11a1.86 1.86 0 01-2.37-2.36z" />
      </svg>
    ),
  },
];

export function Skills() {
  const [showAll, setShowAll] = useState(false);
  const displayedTools = showAll ? TOOLS : TOOLS.slice(0, 6);

  return (
    <section id="skills" className="py-20 sm:py-24 md:py-28 bg-[#FAF6EE] relative overflow-hidden">
      <Container>
        {/* CENTERED SECTION HEADER */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-18 select-none">
          {/* Double Circle Icon + My Favorite Tools label */}
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex items-center">
              <span className="w-3.5 h-3.5 rounded-full bg-[#181512]" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#F6991A] -ml-1.5" />
            </div>
            <span className="text-[#181512] font-semibold text-sm tracking-tight">
              My Favorite Tools
            </span>
          </div>

          {/* Heading with 3-leaf sparkle decoration on 'Tools' */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-heading font-extrabold tracking-tight leading-[1.12]">
            <span className="relative inline-block text-[#F6991A]">
              Exploring the Tools
              {/* 3 decorative leaf petals at top-right of 'Tools' */}
              <svg
                className="absolute -top-3 -right-6 sm:-top-3.5 sm:-right-7 w-5 h-5 sm:w-6 sm:h-6 text-[#181512] pointer-events-none"
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
            <span className="text-[#181512]">Behind My Code</span>
          </h2>
        </div>

        {/* 3-COLUMN TOOLS GRID MATCHING EXACT CARD SILHOUETTE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedTools.map((tool) => (
            <div
              key={tool.id}
              className="relative filter drop-shadow-[0_4px_16px_rgba(24,21,18,0.04)] hover:drop-shadow-[0_10px_28px_rgba(246,153,26,0.12)] transition-all duration-400 group"
            >
              {/* CUSTOM CYBER-CHAMFER TOOL CARD SHAPE */}
              <div
                className="w-full bg-white pt-5 pb-4 px-6 sm:px-7 transition-all duration-300 group-hover:-translate-y-1"
                style={{
                  clipPath:
                    'polygon(0% 16px, 16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 12px 100%, 0% calc(100% - 12px))',
                }}
              >
                {/* CARD UPPER: ICON, TOOL NAME & BLACK PERCENTAGE BADGE */}
                <div className="flex items-center justify-between mb-4">
                  {/* Left Icon + Name Group */}
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    {/* Soft circular icon container */}
                    <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#FAF6EE] flex items-center justify-center p-2.5 shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-300">
                      {tool.icon}
                    </div>
                    {/* Tool Name */}
                    <div>
                      <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#181512] tracking-tight group-hover:text-[#F6991A] transition-colors duration-200">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-[#7A746B] font-medium tracking-wide">
                        {tool.category}
                      </p>
                    </div>
                  </div>

                  {/* Top-Right Black Percentage Pill Badge */}
                  <div className="shrink-0 self-start mt-0.5">
                    <span className="px-2.5 sm:px-3 py-0.5 rounded-full bg-[#181512] text-white font-mono font-bold text-xs sm:text-[13px] tracking-tight shadow-sm select-none">
                      {tool.proficiency}%
                    </span>
                  </div>
                </div>

                {/* BOTTOM EDGE PROFICIENCY PROGRESS BAR */}
                <div className="w-full bg-[#FAF6EE] h-1 sm:h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-[#F6991A] h-full rounded-full transition-all duration-700 ease-out group-hover:bg-[#E0850B]"
                    style={{ width: `${tool.proficiency}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TOGGLE BUTTON FOR ALL TECH STACKS */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-[#D5CBB9] text-[#181512] hover:border-[#F6991A] hover:text-[#F6991A] font-heading font-bold text-sm shadow-sm transition-all duration-200 cursor-pointer"
          >
            <span>{showAll ? 'Show Core Stack' : 'View Full Tech Stack'}</span>
            <span className="text-xs">➔</span>
          </button>
        </div>
      </Container>
    </section>
  );
}
