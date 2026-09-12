'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { X, ArrowRight, Calendar, User, Tag, Clock } from 'lucide-react';

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  excerpt: string;
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Zero-Downtime Deployments with Docker & GitHub Actions',
    category: 'DevOps & CI/CD',
    author: 'Mahmudul Hasan',
    date: '05 June 2026',
    readTime: '5 min read',
    image: '/images/blogs/blog-1.png',
    slug: 'zero-downtime-deployments-docker-github-actions',
    excerpt:
      'Explore how containerizing multi-tier web applications with Docker and automating CI/CD pipelines eliminates deployment failures and downtime.',
    content: [
      'Modern production environments demand automated, reproducible release cycles. Containerization using Docker guarantees parity across local development, staging, and production clusters.',
      'By integrating GitHub Actions workflows with automated testing, linting, Docker image build and push, and AWS EC2 rolling updates, engineering teams achieve zero downtime with absolute confidence.',
      'We discuss environment variable secrets management, health checks, multi-stage Docker builds for minimal image footprints, and reverse-proxy routing with Nginx.',
    ],
  },
  {
    id: '2',
    title: 'Architecting Scalable Multi-Tenant Systems with Next.js & PostgreSQL',
    category: 'Backend Architecture',
    author: 'Mahmudul Hasan',
    date: '04 June 2026',
    readTime: '6 min read',
    image: '/images/blogs/blog-2.png',
    slug: 'architecting-scalable-multitenant-systems',
    excerpt:
      'How to design performant schema isolation, Redis caching, and role-based access control for enterprise SaaS platforms.',
    content: [
      'Building an enterprise-ready SaaS application requires deliberate data modeling from day one. In high-concurrency systems, optimizing database connection pooling and query performance is vital.',
      'Leveraging Next.js App Router alongside PostgreSQL and Prisma ORM enables clean domain-driven design, while Redis handles session persistence and distributed rate limiting.',
      'We walk through indexing strategies, row-level security, JWT RBAC authorization middleware, and automated database migrations in continuous deployment workflows.',
    ],
  },
  {
    id: '3',
    title: 'Integrating AI Agents & LangChain into Production Web Apps',
    category: 'AI Engineering',
    author: 'Mahmudul Hasan',
    date: '03 June 2026',
    readTime: '4 min read',
    image: '/images/blogs/blog-3.png',
    slug: 'integrating-ai-agents-langchain-production',
    excerpt:
      'Bridging LLM capabilities with production web backends using FastAPI, LangChain, vector retrieval (RAG), and streaming responses.',
    content: [
      'AI agents are moving from simple chat prompts to autonomous workflow orchestrators that interact with live business APIs and private knowledge bases.',
      'By combining Python FastAPI microservices, LangChain/LangGraph pipelines, and PostgreSQL pgvector embeddings, we build deterministic, grounded AI features with low latency.',
      'Discover best practices for error recovery, prompt caching, token usage monitoring, and securing LLM endpoints in high-volume production applications.',
    ],
  },
];

export function Blogs() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section
      id="blogs"
      className="py-20 sm:py-24 md:py-28 bg-[#181512] text-white relative border-t-4 border-b-4 border-[#F6991A] overflow-hidden"
    >
      {/* Subtle Warm Radial Glow Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#F6991A]/5 blur-[120px] pointer-events-none rounded-full" />

      <Container>
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            {/* Section Badge: White Circle + Orange Circle + Label */}
            <div className="flex items-center gap-2 mb-3 select-none">
              <div className="relative flex items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-white" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#F6991A] -ml-1.5" />
              </div>
              <span className="text-white/90 font-semibold text-sm tracking-tight">
                Latest Blogs
              </span>
            </div>

            {/* Main Heading with White 3-Leaf Floral Sparkle */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-heading font-extrabold text-white tracking-tight leading-[1.14]">
              Insights from{' '}
              <span className="relative inline-block text-[#F6991A]">
                My Blogs
                {/* 3 decorative leaf petals at top right in crisp white */}
                <svg
                  className="absolute -top-2.5 -right-5 sm:-top-3 sm:-right-6 w-5 h-5 sm:w-6 sm:h-6 text-white pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 11C13 6 16.5 2.5 21 2C20.5 6.5 17 10 12 11Z" />
                  <path d="M13 12C17 11 21.5 12 24 15.5C21.5 18 17 17.5 13 14C12.5 13.5 12.5 12.5 13 12Z" />
                  <path d="M12 13C13 17 15 20.5 17.5 23.5C14.5 23 11.5 20.5 10.5 16.5C10.5 14 11.5 13 12 13Z" />
                </svg>
              </span>
            </h2>
          </div>

          {/* Top-Right CTA Capsule Button */}
          <div className="shrink-0">
            <a
              href="#blogs"
              className="inline-flex items-center bg-[#181512] border border-[#3A332B] p-1.5 rounded-full shadow-lg hover:border-[#F6991A]/60 transition-all duration-300 group hover:scale-[1.02]"
            >
              <span className="px-5 sm:px-6 py-2 text-white font-heading font-bold text-xs sm:text-sm tracking-tight group-hover:text-[#F6991A] transition-colors">
                View All Blogs
              </span>
              <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F6991A] p-0.5 ml-1 transition-transform duration-200 group-hover:translate-x-0.5">
                <div className="w-full h-full rounded-full bg-white text-[#181512] flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs">
                  →
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* 3 BLOGS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer flex flex-col transition-all duration-300 select-none"
            >
              {/* IMAGE WRAPPER WITH NOTCHED CORNER */}
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-[#241F1A] border border-[#362F27]/60">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Bottom-left Category Badge */}
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="inline-block px-3.5 py-1.5 rounded-lg bg-[#F6991A] text-[#181512] font-heading font-extrabold text-xs tracking-tight shadow-md">
                    {post.category}
                  </span>
                </div>

                {/* Bottom-Right Chamfer Cut Accent */}
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#181512] z-10 pointer-events-none"
                  style={{
                    clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
                  }}
                />
              </div>

              {/* BLOG TITLE */}
              <h3 className="text-white font-heading font-extrabold text-lg sm:text-[19px] tracking-tight leading-snug mt-5 mb-3 group-hover:text-[#F6991A] transition-colors duration-200 line-clamp-2">
                {post.title}
              </h3>

              {/* METADATA: AUTHOR & DATE WITH ORANGE DOTS */}
              <div className="flex items-center text-xs sm:text-sm text-[#C4BCB3] font-medium mt-auto">
                <span className="w-2 h-2 rounded-full bg-[#F6991A] inline-block mr-2 shrink-0" />
                <span>{post.author}</span>
                <span className="w-2 h-2 rounded-full bg-[#F6991A] inline-block mx-2 shrink-0 ml-3 sm:ml-4" />
                <span>{post.date}</span>
              </div>
            </article>
          ))}
        </div>
      </Container>

      {/* ARTICLE PREVIEW MODAL */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedPost(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#1D1814] border border-[#3E342B] rounded-3xl p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#2A231C] border border-[#3E342B] text-stone-300 hover:text-white hover:bg-[#F6991A] hover:text-[#181512] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 border border-[#362F27]">
              <Image
                src={selectedPost.image}
                alt={selectedPost.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3">
                <span className="px-3.5 py-1.5 rounded-lg bg-[#F6991A] text-[#181512] font-heading font-extrabold text-xs shadow-md">
                  {selectedPost.category}
                </span>
              </div>
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-4 text-xs text-[#C4BCB3] mb-3">
              <span className="flex items-center gap-1.5">
                <User size={13} className="text-[#F6991A]" />
                {selectedPost.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-[#F6991A]" />
                {selectedPost.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-[#F6991A]" />
                {selectedPost.readTime}
              </span>
            </div>

            {/* Modal Title */}
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight mb-4">
              {selectedPost.title}
            </h3>

            {/* Paragraphs */}
            <div className="space-y-3.5 text-[#C4BCB3] text-sm sm:text-base leading-relaxed">
              {selectedPost.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* CTA in Modal */}
            <div className="mt-6 pt-6 border-t border-[#3E342B] flex items-center justify-between">
              <span className="text-xs text-[#9E988F]">Enjoyed this article?</span>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2 rounded-full bg-[#F6991A] text-[#181512] text-xs font-bold font-heading hover:bg-[#E0850B] transition-colors cursor-pointer"
              >
                Back to Blogs
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
