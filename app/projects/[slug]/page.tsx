import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Github } from "@/components/ui/Icons";

import { DEFAULT_PROJECTS } from "@/lib/constants";

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const project = await Project.findOne({ slug }).lean();
      if (project) return JSON.parse(JSON.stringify(project));
    }
  } catch {
    // fallback below
  }
  const fallback = DEFAULT_PROJECTS.find((p) => p.slug === slug);
  return fallback ? JSON.parse(JSON.stringify(fallback)) : null;
}

export async function generateMetadata({
  params,
}: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — Mahmudul Hasan`,
      description: project.description,
      type: "article",
      images: project.thumbnailUrl
        ? [{ url: project.thumbnailUrl, width: 1200, height: 630 }]
        : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const isCaseStudy = project.projectType === 'case-study';
  const displayTitle = project.title || project.projectTitle || 'Untitled Project';
  const liveLink = project.liveUrl || project.liveSite;
  const tech = project.techStack || project.Technologies || [];
  const categories = project.category || project.projectCategory || [];
  const gallery = project.gellaryImages || project.images || [];
  const heroImage = project.thumbnailUrl || gallery[0];
  const role = project.developersRole;
  const duration = project.duration || project.Duration;
  const resultText = project.result || project.Result;

  // Overview normalization
  const overviewParagraphs: string[] = Array.isArray(project.overview)
    ? project.overview
    : typeof project.overview === 'string'
    ? [project.overview]
    : project.longDescription
    ? project.longDescription.split('\n').filter(Boolean)
    : [project.description];

  return (
    <main className="min-h-screen bg-base pt-24 pb-24">
      <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-16">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-mono text-text-muted hover:text-accent transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Works
          </Link>

          <span className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full border ${
            isCaseStudy
              ? 'bg-secondary/15 border-secondary/40 text-secondary'
              : 'bg-surface border-border text-text-muted'
          }`}>
            {isCaseStudy ? '// Deep-Dive Case Study' : '// Project Showcase'}
          </span>
        </div>

        {/* Header */}
        <header className="mb-12">
          {project.projectKeyWord && (
            <p className="font-mono text-xs text-accent-muted uppercase tracking-widest mb-3">
              {project.projectKeyWord}
            </p>
          )}

          <h1 className="font-heading text-h1 text-text font-bold tracking-tight mb-5">
            {displayTitle}
          </h1>

          <p className="text-body-lg text-text-muted max-w-3xl leading-relaxed">
            {project.description || overviewParagraphs[0]}
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 p-5 bg-surface/60 border border-border rounded-xl backdrop-blur-sm">
            {role && (
              <div>
                <span className="block text-[11px] font-mono text-text-muted uppercase tracking-wider mb-1">
                  Role
                </span>
                <span className="text-sm font-mono text-text font-medium">
                  {role}
                </span>
              </div>
            )}
            {duration && (
              <div>
                <span className="block text-[11px] font-mono text-text-muted uppercase tracking-wider mb-1">
                  Timeline
                </span>
                <span className="text-sm font-mono text-text font-medium">
                  {duration}
                </span>
              </div>
            )}
            {project.projectFor && (
              <div>
                <span className="block text-[11px] font-mono text-text-muted uppercase tracking-wider mb-1">
                  Target / For
                </span>
                <span className="text-sm font-mono text-text font-medium truncate block">
                  {project.projectFor}
                </span>
              </div>
            )}
            <div>
              <span className="block text-[11px] font-mono text-text-muted uppercase tracking-wider mb-1">
                Type
              </span>
              <span className="text-sm font-mono text-accent font-medium">
                {isCaseStudy ? 'Case Study' : 'Production Build'}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-base text-sm font-medium rounded-lg hover:bg-accent-muted transition-colors shadow-sm"
              >
                <ExternalLink size={16} />
                Visit Live Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border-strong text-text text-sm font-medium rounded-lg hover:bg-surface transition-colors"
              >
                <Github size={16} />
                View Source Code
              </a>
            )}
          </div>
        </header>

        {/* Primary Hero Banner */}
        {heroImage && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border/80 mb-16 shadow-2xl bg-surface/30">
            <Image
              src={heroImage}
              alt={`${displayTitle} hero preview`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1000px"
              priority
            />
          </div>
        )}

        {/* Section 01: Overview */}
        <section className="mb-16">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-muted mb-6 flex items-center gap-2">
            <span>// 01. Overview &amp; Background</span>
            <span className="h-px flex-1 bg-border/40"></span>
          </h2>
          <div className="space-y-4">
            {overviewParagraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-body text-text leading-relaxed font-sans"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Section 02: Key Features */}
        {project.features && project.features.length > 0 && (
          <section className="mb-16">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-muted mb-6 flex items-center gap-2">
              <span>// 02. Key Architectural Features</span>
              <span className="h-px flex-1 bg-border/40"></span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.features.map((feature: string, i: number) => {
                const parts = feature.split(':');
                const title = parts.length > 1 ? parts[0] : `Feature 0${i + 1}`;
                const desc = parts.length > 1 ? parts.slice(1).join(':') : feature;

                return (
                  <div
                    key={i}
                    className="p-5 bg-surface/50 border border-border/80 rounded-xl hover:border-accent/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2 font-mono text-sm text-accent font-semibold">
                      <span>›</span>
                      <span>{title}</span>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Section 03: Challenges & Technical Solutions */}
        {project.challenges && project.challenges.length > 0 && (
          <section className="mb-16">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-muted mb-6 flex items-center gap-2">
              <span>// 03. Engineering Challenges &amp; Solutions</span>
              <span className="h-px flex-1 bg-border/40"></span>
            </h2>
            <div className="space-y-6">
              {project.challenges.map((challenge: string, i: number) => {
                const solution = project.solutions?.[i];
                return (
                  <div
                    key={i}
                    className="p-6 bg-surface/40 border border-border rounded-xl space-y-4"
                  >
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider text-red-400/90 mb-1 flex items-center gap-2">
                        <span>● Challenge 0{i + 1}</span>
                      </div>
                      <p className="text-sm text-text leading-relaxed">
                        {challenge}
                      </p>
                    </div>

                    {solution && (
                      <div className="pt-3 border-t border-border/60">
                        <div className="font-mono text-xs uppercase tracking-wider text-accent mb-1 flex items-center gap-2">
                          <span>✓ Technical Solution</span>
                        </div>
                        <p className="text-sm text-text-muted leading-relaxed">
                          {solution}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Section 04: Tech Stack */}
        <section className="mb-16">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-muted mb-6 flex items-center gap-2">
            <span>// 04. Technology Stack</span>
            <span className="h-px flex-1 bg-border/40"></span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {tech.map((item: string) => (
              <span
                key={item}
                className="px-3.5 py-1.5 text-xs font-mono bg-surface border border-border hover:border-accent/40 text-text-muted hover:text-text rounded-full transition-colors"
              >
                {item}
              </span>
            ))}
          </div>

          {categories.length > 0 && (
            <div className="mt-6 pt-6 border-t border-border/50">
              <span className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-3">
                Categories
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat: string) => (
                  <span
                    key={cat}
                    className="px-3 py-1 text-xs font-mono bg-accent/10 border border-accent/20 text-accent rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Section 05: Results & Key Takeaways */}
        {resultText && (
          <section className="mb-16">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-muted mb-6 flex items-center gap-2">
              <span>// 05. Results &amp; Impact</span>
              <span className="h-px flex-1 bg-border/40"></span>
            </h2>
            <div className="p-8 bg-surface/70 border-l-2 border-accent border-y border-r border-border rounded-r-xl">
              <p className="text-body text-text-muted leading-relaxed italic">
                "{resultText}"
              </p>
            </div>
          </section>
        )}

        {/* Section 06: Image Gallery */}
        {gallery.length > 0 && (
          <section className="mb-16">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-muted mb-6 flex items-center gap-2">
              <span>// 06. Visual Documentation</span>
              <span className="h-px flex-1 bg-border/40"></span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {gallery.map((img: string, i: number) => (
                <div
                  key={i}
                  className="relative aspect-video w-full rounded-xl overflow-hidden border border-border group bg-surface/20"
                >
                  <Image
                    src={img}
                    alt={`${displayTitle} visual documentation ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Back link at bottom */}
        <div className="pt-8 border-t border-border flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-mono text-text-muted hover:text-accent transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to all Works &amp; Case Studies
          </Link>

          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
            >
              Launch Live Site <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
