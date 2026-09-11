'use client';

import React from 'react';

const KEYWORDS = [
  'Full Stack Development',
  'DevOps Engineering',
  'CI/CD Pipelines',
  'Cloud Architecture',
  'Docker & Kubernetes',
  'Next.js & React',
  'Microservices & APIs',
  'Automated Testing',
  'Infrastructure as Code',
  'System Architecture',
];

function SparkleFlower() {
  return (
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6 text-[#F6991A] shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top petal */}
      <rect x="10.25" y="1.5" width="3.5" height="8" rx="1.75" />
      {/* Bottom petal */}
      <rect x="10.25" y="14.5" width="3.5" height="8" rx="1.75" />
      {/* Left petal */}
      <rect x="1.5" y="10.25" width="8" height="3.5" rx="1.75" />
      {/* Right petal */}
      <rect x="14.5" y="10.25" width="8" height="3.5" rx="1.75" />
      {/* Center hub */}
      <circle cx="12" cy="12" r="1.6" />
    </svg>
  );
}

export function TechMarquee() {
  return (
    <section
      aria-label="Core Technical Expertise"
      className="relative w-full bg-[#181512] border-b-[3px] border-[#F6991A] overflow-hidden py-4 sm:py-5 md:py-5.5 z-20 select-none shadow-md"
    >
      <div className="overflow-hidden w-full">
        <div className="animate-marquee flex items-center">
          {/* First set of keywords */}
          <div className="flex items-center shrink-0">
            {KEYWORDS.map((keyword, index) => (
              <div key={`primary-${index}`} className="flex items-center">
                <span className="text-white font-heading font-bold text-lg sm:text-xl md:text-2xl tracking-normal whitespace-nowrap px-6 sm:px-8 md:px-10">
                  {keyword}
                </span>
                <SparkleFlower />
              </div>
            ))}
          </div>

          {/* Second identical set for seamless infinite loop */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {KEYWORDS.map((keyword, index) => (
              <div key={`duplicate-${index}`} className="flex items-center">
                <span className="text-white font-heading font-bold text-lg sm:text-xl md:text-2xl tracking-normal whitespace-nowrap px-6 sm:px-8 md:px-10">
                  {keyword}
                </span>
                <SparkleFlower />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
