import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BarChart3, Code2, ExternalLink, Layers3, Target } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";


interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

function slugify(value: string) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
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
      <main className="pt-[68px]">
        <section className="relative overflow-hidden border-b-[3px] border-[#F6991A] bg-[#181512] text-[#FBF8F2]">
          <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#F6991A]/10 blur-3xl" />
          <Container className="relative py-12 sm:py-16 md:py-20">
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/#projects"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#D5CBB9] transition-colors hover:text-white"
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Back to Works
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F6991A]/40 bg-[#F6991A]/10 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#F6991A]">
                <span className="h-2 w-2 rounded-full bg-[#F6991A]" />
                {isCaseStudy ? 'Deep-Dive Case Study' : 'Project Showcase'}
              </span>
            </div>

            <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
              <header className="lg:col-span-8">
                {project.projectKeyWord && (
                  <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#F6991A]">
                    {project.projectKeyWord}
                  </p>
                )}
                <h1 className="max-w-5xl font-heading text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-[68px]">
                  {displayTitle}
                </h1>
                <p className="mt-6 max-w-3xl text-body leading-relaxed text-[#D5CBB9] sm:text-lg">
                  {project.description || overviewParagraphs[0]}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {liveLink && (
                    <a
                      href={liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#F6991A] px-5 py-3 text-sm font-extrabold text-[#181512] transition-colors hover:bg-[#E0850B]"
                    >
                      Visit Live Site <ExternalLink size={15} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#5A5046] px-5 py-3 text-sm font-bold text-white transition-colors hover:border-[#F6991A] hover:text-[#F6991A]"
                    >
                      <Github size={16} /> View Source Code
                    </a>
                  )}
                </div>
              </header>

              <dl className="grid grid-cols-2 gap-x-5 gap-y-5 border-t border-[#4B4035] pt-5 sm:grid-cols-4 lg:col-span-4 lg:grid-cols-2">
                {[
                  ...(role ? [{ label: 'Role', value: role }] : []),
                  ...(duration ? [{ label: 'Timeline', value: duration }] : []),
                   { label: 'Type', value: isCaseStudy ? 'Case Study' : 'Production Build' },
                ].map((item) => (
                  <div key={item.label}>
                    <dt className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A8A29E]">
                      {item.label}
                    </dt>
                    <dd className="text-sm font-semibold leading-snug text-white">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {heroImage && (
              <div className="mt-12 border border-[#F6991A]/40 bg-[#362F27] p-1 sm:mt-16">
                <div
                  className="group relative aspect-[16/9] w-full overflow-hidden bg-[#241F1A] sm:aspect-[2/1]"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 36px 100%, 0 calc(100% - 36px))',
                  }}
                >
                  <Image
                    src={heroImage}
                    alt={`${displayTitle} project preview`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 1280px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181512]/30 via-transparent to-transparent" />
                </div>
              </div>
            )}
          </Container>
        </section>

        <section className="bg-[#FAF6EE] py-16 sm:py-20 md:py-24">
          <Container>
            <div className="grid gap-8 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#181512]" />
                  <span className="h-3 w-3 -ml-1.5 rounded-full bg-[#F6991A]" />
                  <span className="ml-1 text-sm font-semibold text-[#181512]">01 / Overview</span>
                </div>
                <h2 className="font-heading text-3xl font-extrabold leading-tight text-[#181512] sm:text-4xl">
                  The project <span className="text-[#F6991A]">story.</span>
                </h2>
              </div>
              <div className="space-y-4 md:col-span-8">
                {overviewParagraphs.map((paragraph, index) => (
                  <p key={index} className="max-w-3xl text-body leading-relaxed text-[#5B5349] sm:text-lg">
                    {paragraph}
                  </p>
                ))}
                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3">
                    {categories.map((category: string) => (
                      <span key={category} className="rounded-full border border-[#D5CBB9] px-3.5 py-1.5 text-xs font-semibold text-[#5B5349]">
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        {project.features && project.features.length > 0 && (
          <section className="border-y-[3px] border-[#F6991A] bg-[#181512] py-16 text-white sm:py-20 md:py-24">
            <Container>
              <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-white" />
                    <span className="h-3 w-3 -ml-1.5 rounded-full bg-[#F6991A]" />
                    <span className="ml-1 text-sm font-semibold text-white">02 / What it does</span>
                  </div>
                  <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
                    Built around <span className="text-[#F6991A]">the details.</span>
                  </h2>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-[#A8A29E]">Core capabilities designed to make the product reliable, useful, and ready for real-world use.</p>
              </div>
              <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                {project.features.map((feature: string, index: number) => {
                  const parts = feature.split(':');
                  const title = parts.length > 1 ? parts[0] : `Feature 0${index + 1}`;
                  const description = parts.length > 1 ? parts.slice(1).join(':') : feature;
                  return (
                    <article key={index} className="border-t border-[#4B4035] py-6">
                      <p className="mb-3 font-mono text-xs font-semibold text-[#F6991A]">0{index + 1}</p>
                      <h3 className="mb-2 font-heading text-lg font-bold text-white">{title}</h3>
                      <p className="text-sm leading-relaxed text-[#A8A29E]">{description}</p>
                    </article>
                  );
                })}
              </div>
            </Container>
          </section>
        )}

        {project.challenges && project.challenges.length > 0 && (
          <section className="bg-[#FAF6EE] py-16 sm:py-20 md:py-24">
            <Container>
              <div className="mb-10">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#181512]" />
                  <span className="h-3 w-3 -ml-1.5 rounded-full bg-[#F6991A]" />
                  <span className="ml-1 text-sm font-semibold text-[#181512]">03 / Engineering</span>
                </div>
                <h2 className="font-heading text-3xl font-extrabold leading-tight text-[#181512] sm:text-4xl md:text-5xl">
                  Problems, <span className="text-[#F6991A]">solved.</span>
                </h2>
              </div>
              <div className="divide-y divide-[#D5CBB9] border-y border-[#D5CBB9]">
                {project.challenges.map((challenge: string, index: number) => (
                  <article key={index} className="grid gap-4 py-6 md:grid-cols-12 md:gap-8 md:py-8">
                    <div className="md:col-span-5">
                      <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#B84B35]">Challenge 0{index + 1}</p>
                      <p className="text-sm leading-relaxed text-[#181512] sm:text-body">{challenge}</p>
                    </div>
                    {project.solutions?.[index] && (
                      <div className="md:col-span-7">
                        <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#C97205]">Approach</p>
                        <p className="text-sm leading-relaxed text-[#5B5349] sm:text-body">{project.solutions[index]}</p>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </Container>
          </section>
        )}

        <section className="bg-[#F0E9DB] py-16 sm:py-20 md:py-24">
          <Container>
            <div className="grid gap-8 md:grid-cols-12 md:items-start md:gap-12">
              <div className="md:col-span-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#181512]" />
                  <span className="h-3 w-3 -ml-1.5 rounded-full bg-[#F6991A]" />
                  <span className="ml-1 text-sm font-semibold text-[#181512]">04 / Toolkit</span>
                </div>
                <h2 className="font-heading text-3xl font-extrabold leading-tight text-[#181512] sm:text-4xl">
                  Made with <span className="text-[#F6991A]">the right tools.</span>
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 md:col-span-8">
                {tech.map((item: string) => (
                  <span key={item} className="rounded-full border border-[#CFC4B2] bg-[#FAF6EE] px-4 py-2 text-sm font-semibold text-[#39332D] transition-colors hover:border-[#F6991A]">
                    {item}
                  </span>
                ))}
              </div>
              {project.features?.length > 0 && <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature: string, index: number) => <div key={index} className="rounded-xl border border-[#303030] bg-[#171717] p-4 text-xs leading-relaxed text-[#B8B1AA]"><span className="block text-[#F6991A] mb-2">Feature {String(index + 1).padStart(2, '0')}</span>{feature}</div>)}
              </div>}
            </div>
          </Container>
        </section>

        {resultText && (
          <section className="bg-[#F6991A] py-14 sm:py-16">
            <Container>
              <div className="grid gap-6 md:grid-cols-12 md:items-center md:gap-12">
                <div className="md:col-span-4">
                  <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#5D3707]">05 / Outcome</p>
                  <h2 className="font-heading text-3xl font-extrabold leading-tight text-[#181512] sm:text-4xl">Results that matter.</h2>
                </div>
                <p className="md:col-span-8 text-lg font-semibold leading-relaxed text-[#181512] sm:text-xl">{resultText}</p>
              </div>
            </Container>
          </section>
        )}

        {gallery.length > 0 && (
          <section className="bg-[#181512] py-16 text-white sm:py-20 md:py-24">
            <Container>
              <div className="mb-10">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-white" />
                  <span className="h-3 w-3 -ml-1.5 rounded-full bg-[#F6991A]" />
                  <span className="ml-1 text-sm font-semibold text-white">06 / In the product</span>
                </div>
                <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
                  A closer <span className="text-[#F6991A]">look.</span>
                </h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {gallery.map((image: string, index: number) => (
                  <div key={index} className="group relative aspect-video overflow-hidden border border-[#4B4035] bg-[#241F1A] p-1">
                    <div className="relative h-full w-full overflow-hidden" style={{ clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))' }}>
                      <Image
                        src={image}
                        alt={`${displayTitle} project screen ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        <section className="bg-[#FAF6EE] py-12 sm:py-16">
          <Container className="flex flex-col gap-5 border-t border-[#D5CBB9] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/#projects" className="group inline-flex items-center gap-2 text-sm font-bold text-[#5B5349] transition-colors hover:text-[#181512]">
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Back to all projects
            </Link>
            {liveLink && (
              <a href={liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[#C97205] hover:text-[#181512]">
                Launch Live Site <ExternalLink size={15} />
              </a>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}