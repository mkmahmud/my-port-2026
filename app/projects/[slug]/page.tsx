import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BarChart3, ChevronLeft, ChevronRight, Code2, Layers3, Target } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { slugify } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/sections/Footer";


interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  try {
    if (process.env.MONGODB_URI) {
      const db = await connectDB();
      let project = await db.collection('projects').findOne({ slug });
      if (!project) {
        const projects = await db.collection('projects').find().toArray();
        project =
          projects.find(
            (candidate) =>
              slugify(candidate.slug || candidate.title || candidate.projectTitle || String(candidate._id)) === slug
          ) ?? null;
      }
      if (project) return JSON.parse(JSON.stringify(project));
    }
  } catch {
    return null;
  }
  return null;
}

async function getAdjacentProjects(slug: string) {
  try {
    const db = await connectDB();
    const projects = await db
      .collection('projects')
      .find({}, { projection: { slug: 1, title: 1, projectTitle: 1, projectID: 1 } })
      .sort({ projectID: 1 })
      .toArray();
    const index = projects.findIndex(
      (project) => slugify(project.slug || project.title || project.projectTitle || String(project._id)) === slug
    );

    return {
      previous: index > 0 ? projects[index - 1] : null,
      next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : null,
    };
  } catch {
    return { previous: null, next: null };
  }
}

export async function generateMetadata({
  params,
}: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const title = project.title || project.projectTitle || 'Project';
  const description = project.description ||
    (Array.isArray(project.overview) ? project.overview[0] : project.overview) ||
    `${title} project case study by MK Mahmud.`;
  const keywords = [
    title,
    'MK Mahmud',
    'Mahmudul Hasan',
    ...(project.Technologies || project.techStack || []),
    ...(project.projectCategory || project.category || []),
  ];
  const image = project.thumbnailUrl || project.gellaryImages?.[0] || project.images?.[0];

  return {
    title: `${title} — Project Case Study`,
    description,
    keywords,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${title} — MK Mahmud Project Case Study`,
      description,
      type: "article",
      url: `/projects/${slug}`,
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: `${title} project preview` }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — MK Mahmud Project Case Study`,
      description,
      images: image ? [image] : undefined,
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

  const adjacentProjects = await getAdjacentProjects(slug);

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
  const projectNumber = project.projectID ?? '—';
  const impactCards = [
    {
      icon: Target,
      label: 'The Challenge',
      text: project.challenges?.[0] || 'A focused product challenge shaped the project direction.',
    },
    {
      icon: Layers3,
      label: 'Key Solutions',
      text: project.solutions?.[0] || project.features?.[0] || 'A focused, maintainable solution built around the project goals.',
    },
    {
      icon: BarChart3,
      label: 'Results & Impact',
      text: resultText || project.description || 'A production-ready experience designed for measurable impact.',
    },
  ];
  const techGroups = [
    { icon: Code2, name: 'Frontend', items: tech.slice(0, 4) },
    { icon: Layers3, name: 'Backend APIs', items: tech.slice(4, 8) },
    { icon: Target, name: 'Infrastructure', items: tech.slice(8, 12) },
    { icon: BarChart3, name: 'Tools & Services', items: tech.slice(12, 16) },
  ].filter((group) => group.items.length > 0);

  // Overview normalization
  const overviewParagraphs: string[] = Array.isArray(project.overview)
    ? project.overview
    : typeof project.overview === 'string'
    ? [project.overview]
    : project.longDescription
    ? project.longDescription.split('\n').filter(Boolean)
    : [project.description];
  const pageDescription = project.description || overviewParagraphs[0];
  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': isCaseStudy ? 'Article' : 'CreativeWork',
    name: displayTitle,
    headline: displayTitle,
    description: pageDescription,
    url: `https://mkmahmud.dev/projects/${slug}`,
    image: heroImage ? [heroImage, ...gallery] : undefined,
    author: {
      '@type': 'Person',
      name: 'Mahmudul Hasan',
      alternateName: ['MK Mahmud', 'MK Mahmood'],
      url: 'https://mkmahmud.dev',
    },
    keywords: [...tech, ...categories].join(', '),
    about: categories,
  };

  const projectSlug = (value: { slug?: string; title?: string; projectTitle?: string; _id?: unknown }) =>
    value.slug || slugify(value.title || value.projectTitle || String(value._id));

  return (
    <>
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <main className="min-h-screen bg-[#0D0D0D] text-[#F5EFEB] pt-28 pb-24">
        <Container>
          <div className="flex items-center justify-between gap-4 mb-12">
            <Link href="/#projects" className="inline-flex items-center gap-2 text-xs text-[#A8A29E] hover:text-white transition-colors">
              <ArrowLeft size={14} />
              Back to Projects
            </Link>
            <span className="inline-flex items-center gap-2 text-[10px] uppercase text-[#D8D0C8]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F6991A]" />
              {isCaseStudy ? 'Featured Case Study' : 'Project Showcase'}
            </span>
          </div>

          <header className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] items-end mb-12">
            <div>
              <p className="font-mono text-[10px] uppercase text-[#F6991A] mb-3">
                Project #{projectNumber}
              </p>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-none text-white mb-6">
                {displayTitle}
              </h1>
              <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-[#B8B1AA]">
                {project.description || overviewParagraphs[0]}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {tech.map((item: string) => (
                  <span key={item} className="rounded-full bg-[#242424] border border-[#343434] px-3 py-1 text-[11px] text-[#D6D0CA]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:items-stretch">
              {liveLink && (
                <a href={liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F6991A] px-5 py-3 text-xs font-semibold text-[#181512] hover:bg-[#E0850B] transition-colors">
                  Live Interactive Demo <ArrowRight size={14} />
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#343434] bg-[#1B1B1B] px-5 py-3 text-xs font-semibold text-white hover:border-[#F6991A] transition-colors">
                  <Github size={14} /> View Source Code
                </a>
              )}
            </div>
          </header>

          {heroImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#303030] bg-[#181818] mb-20 shadow-2xl">
              <div className="absolute inset-x-0 top-0 z-10 flex h-10 items-center gap-2 border-b border-[#303030] bg-[#191919] px-4">
                <span className="h-2 w-2 rounded-full bg-[#D74B42]" />
                <span className="h-2 w-2 rounded-full bg-[#E3A62F]" />
                <span className="h-2 w-2 rounded-full bg-[#41B883]" />
                <span className="ml-3 font-mono text-[9px] text-[#817A73]">{displayTitle.toLowerCase().replace(/\s+/g, '-')} / workspace / preview</span>
                <span className="ml-auto hidden items-center gap-2 text-[9px] text-[#6ED5B1] sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#6ED5B1]" /> Live Workspace Preview</span>
              </div>
              <Image src={heroImage} alt={`${displayTitle} preview`} fill className="object-cover pt-10" sizes="(max-width: 1280px) 100vw, 1200px" priority />
            </div>
          )}

          <section className="mb-20 text-center">
            <p className="font-mono text-[10px] uppercase text-[#F6991A] mb-3">01 / Project Intelligence</p>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-3">Project Overview <span className="text-[#F6991A]">&amp; Impact</span></h2>
            <p className="mx-auto max-w-2xl text-sm text-[#9E9892]">{overviewParagraphs[0]}</p>
            <div className="grid gap-4 text-left md:grid-cols-3 mt-10">
              {impactCards.map(({ icon: Icon, label, text }) => (
                <article key={label} className="flex min-h-64 flex-col rounded-2xl border border-[#303030] bg-[#171717] p-5 hover:border-[#F6991A]/60 transition-colors">
                  <div className="mb-8 flex h-8 w-8 items-center justify-center rounded-lg bg-[#322611] text-[#F6991A]"><Icon size={16} /></div>
                  <h3 className="font-heading text-base font-bold text-white mb-3">{label}</h3>
                  <p className="text-xs leading-relaxed text-[#A8A29E]">{text}</p>
                  <span className="mt-auto border-t border-[#2A2A2A] pt-4 text-[10px] text-[#6E6963]">{displayTitle}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-20 rounded-2xl border border-[#303030] bg-[#171717] p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#2B2B2B] pb-6 mb-6">
              <div>
                <p className="font-mono text-[10px] uppercase text-[#F6991A] mb-2">02 / System Topology</p>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">Core Tech Stack <span className="text-[#F6991A]">&amp; Architecture</span></h2>
              </div>
              <span className="rounded-full border border-[#3A3A3A] px-3 py-1 text-[10px] text-[#9E9892]">Production-ready build</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {techGroups.map(({ icon: Icon, name, items }) => (
                <div key={name} className="rounded-xl border border-[#2A2A2A] bg-[#111111] p-4">
                  <Icon size={18} className="text-[#F6991A] mb-5" />
                  <h3 className="text-sm font-semibold text-white mb-2">{name}</h3>
                  <p className="text-xs leading-relaxed text-[#8D8780]">{items.join(', ')}</p>
                  <div className="mt-5 text-[10px] text-[#F6991A]">{items.slice(0, 2).join(' + ')}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] mb-20">
            <div>
              <p className="font-mono text-[10px] uppercase text-[#F6991A] mb-3">03 / Full Detail</p>
              <h2 className="font-heading text-3xl font-bold text-white mb-6">How the project works</h2>
              <div className="space-y-4">
                {overviewParagraphs.map((paragraph: string, index: number) => <p key={index} className="text-sm leading-relaxed text-[#B8B1AA]">{paragraph}</p>)}
              </div>
              {project.features?.length > 0 && <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature: string, index: number) => <div key={index} className="rounded-xl border border-[#303030] bg-[#171717] p-4 text-xs leading-relaxed text-[#B8B1AA]"><span className="block text-[#F6991A] mb-2">Feature {String(index + 1).padStart(2, '0')}</span>{feature}</div>)}
              </div>}
            </div>
            <div className="rounded-2xl border border-[#303030] bg-[#171717] p-6">
              <p className="font-mono text-[10px] uppercase text-[#F6991A] mb-5">Project Metadata</p>
              <dl className="space-y-5 text-sm">
                {[
                  ['Role', role],
                  ['Timeline', duration],
                  ['Client', project.projectFor],
                  ['Type', isCaseStudy ? 'Case Study' : 'Production Build'],
                ].map(([label, value]) => value && <div key={label as string} className="border-b border-[#2B2B2B] pb-4"><dt className="text-[10px] uppercase text-[#716B65] mb-1">{label}</dt><dd className="text-[#E3DDD7]">{value}</dd></div>)}
              </dl>
              {categories.length > 0 && <div className="flex flex-wrap gap-2 mt-6">{categories.map((category: string) => <span key={category} className="rounded-full bg-[#322611] px-3 py-1 text-[10px] text-[#F6991A]">{category}</span>)}</div>}
            </div>
          </section>

          {gallery.length > 0 && <section className="mb-20">
            <p className="font-mono text-[10px] uppercase text-[#F6991A] mb-3">04 / Visual Documentation</p>
            <div className="grid gap-5 md:grid-cols-2">{gallery.map((image: string, index: number) => <div key={index} className="relative aspect-video overflow-hidden rounded-2xl border border-[#303030] bg-[#171717]"><Image src={image} alt={`${displayTitle} visual ${index + 1}`} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" /></div>)}</div>
          </section>}

          {project.challenges?.length > 0 && <section className="mb-20">
            <p className="font-mono text-[10px] uppercase text-[#F6991A] mb-3">05 / Engineering Notes</p>
            <div className="grid gap-4 md:grid-cols-2">{project.challenges.map((challenge: string, index: number) => <div key={index} className="rounded-2xl border border-[#303030] bg-[#171717] p-6"><h3 className="text-sm font-semibold text-white mb-3">Challenge {String(index + 1).padStart(2, '0')}</h3><p className="text-xs leading-relaxed text-[#A8A29E]">{challenge}</p>{project.solutions?.[index] && <p className="mt-4 border-t border-[#2A2A2A] pt-4 text-xs leading-relaxed text-[#F0A64A]"><span className="block text-[10px] uppercase mb-1">Solution</span>{project.solutions[index]}</p>}</div>)}</div>
          </section>}

          {resultText && <section className="mb-20 rounded-2xl border border-[#303030] bg-[#171717] p-6 sm:p-10"><p className="font-mono text-[10px] uppercase text-[#F6991A] mb-4">06 / Results &amp; Impact</p><p className="max-w-4xl text-lg leading-relaxed text-[#E2DCD5]">{resultText}</p></section>}

          <div className="grid gap-3 md:grid-cols-2 mb-10">
            {adjacentProjects.previous && <Link href={`/projects/${projectSlug(adjacentProjects.previous)}`} className="group rounded-2xl border border-[#303030] bg-[#171717] p-5 hover:border-[#F6991A] transition-colors"><span className="flex items-center gap-2 text-[10px] uppercase text-[#817A73]"><ChevronLeft size={14} /> Previous Project #{adjacentProjects.previous.projectID}</span><span className="mt-3 block text-sm font-semibold text-white group-hover:text-[#F6991A]">{adjacentProjects.previous.title || adjacentProjects.previous.projectTitle}</span></Link>}
            {adjacentProjects.next && <Link href={`/projects/${projectSlug(adjacentProjects.next)}`} className="group rounded-2xl border border-[#303030] bg-[#171717] p-5 text-right hover:border-[#F6991A] transition-colors"><span className="flex items-center justify-end gap-2 text-[10px] uppercase text-[#817A73]">Next Project #{adjacentProjects.next.projectID}<ChevronRight size={14} /></span><span className="mt-3 block text-sm font-semibold text-white group-hover:text-[#F6991A]">{adjacentProjects.next.title || adjacentProjects.next.projectTitle}</span></Link>}
          </div>

          <section className="rounded-2xl border border-[#303030] bg-[#171717] px-6 py-14 text-center sm:px-10">
            <span className="inline-flex rounded-full border border-[#65501F] bg-[#322611] px-3 py-1 text-[10px] text-[#F6991A]">Ready for new challenges</span>
            <h2 className="mx-auto mt-5 max-w-2xl font-heading text-3xl sm:text-5xl font-bold leading-tight text-white">Have a similar project or idea in mind?</h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#9E9892]">I build scalable web platforms, resilient cloud architectures, and production-ready automated systems.</p>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#F6991A] px-6 py-3 text-xs font-semibold text-[#181512] hover:bg-[#E0850B] transition-colors">Hire Mahmudul <ArrowRight size={14} /></Link>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
