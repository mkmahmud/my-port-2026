import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Boxes, CalendarRange, Check, ExternalLink, Layers3, UserRound } from "lucide-react";
import { connectDB } from "@/lib/db";
import { EmberShell } from "@/components/home/EmberShell";
import { SafeShot } from "@/components/home/SafeShot";
import { BRAND_ICONS } from "@/components/home/brandIcons";
import "@/components/home/case-study.css";

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

export async function generateMetadata({ params }: ProjectDetailProps): Promise<Metadata> {
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
      images: image ? [{ url: image, width: 1200, height: 630, alt: `${title} project preview` }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — MK Mahmud Project Case Study`,
      description,
      images: image ? [image] : undefined,
    },
  };
}

const ICON_BY_LABEL = new Map(
  Object.values(BRAND_ICONS).map((icon) => [icon.label.toLowerCase().replace(/[^a-z0-9]/g, ''), icon])
);

function toolIcon(name: string) {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return ICON_BY_LABEL.get(key) ?? ICON_BY_LABEL.get(key.replace(/\d+$/, ''));
}

function splitFeature(feature: string, index: number) {
  const parts = feature.split(':');
  return parts.length > 1
    ? { title: parts[0].trim(), text: parts.slice(1).join(':').trim() }
    : { title: `Feature ${String(index + 1).padStart(2, '0')}`, text: feature };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const adjacent = await getAdjacentProjects(slug);

  const isCaseStudy = project.projectType === 'case-study';
  const title: string = project.title || project.projectTitle || 'Untitled Project';
  const liveLink: string | undefined = project.liveUrl || project.liveSite;
  const tech: string[] = project.techStack || project.Technologies || [];
  const categories: string[] = project.category || project.projectCategory || [];
  const gallery: string[] = project.gellaryImages || project.images || [];
  const heroImage: string | undefined = project.thumbnailUrl || gallery[0];
  const extraShots = gallery.filter((image) => image !== heroImage);
  const role: string | undefined = project.developersRole;
  const duration: string | undefined = project.duration || project.Duration;
  const resultText: string | undefined = project.result || project.Result;
  const features: string[] = project.features || [];
  const challenges: string[] = project.challenges || [];
  const solutions: string[] = project.solutions || [];

  const overview: string[] = Array.isArray(project.overview)
    ? project.overview
    : typeof project.overview === 'string'
    ? [project.overview]
    : project.longDescription
    ? project.longDescription.split('\n').filter(Boolean)
    : [project.description].filter(Boolean);
  const summary: string = project.description || overview[0] || '';

  const facts = [
    role && { icon: UserRound, label: 'Role', value: role },
    duration && { icon: CalendarRange, label: 'Timeline', value: duration },
    { icon: Layers3, label: 'Type', value: isCaseStudy ? 'Case study' : 'Production build' },
    tech.length > 0 && { icon: Boxes, label: 'Stack', value: `${tech.length} technologies` },
  ].filter(Boolean) as { icon: typeof UserRound; label: string; value: string }[];

  const projectSlug = (value: { slug?: string; title?: string; projectTitle?: string; _id?: unknown }) =>
    value.slug || slugify(value.title || value.projectTitle || String(value._id));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': isCaseStudy ? 'Article' : 'CreativeWork',
    name: title,
    headline: title,
    description: summary,
    url: `https://mkmahmud.dev/projects/${slug}`,
    image: heroImage ? [heroImage, ...extraShots] : undefined,
    author: { '@type': 'Person', name: 'Mahmudul Hasan', alternateName: ['MK Mahmud', 'MK Mahmood'], url: 'https://mkmahmud.dev' },
    keywords: [...tech, ...categories].join(', '),
    about: categories,
  };

  return (
    <EmberShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="cs">
        <header className="cs-hero">
          <span className="cs-glow" aria-hidden="true" />
          <div className="cs-wrap">
            <div className="cs-crumbs">
              <Link href="/projects" className="cs-back"><ArrowLeft size={16} aria-hidden="true" /> All projects</Link>
              <span className="cs-kind">{isCaseStudy ? 'Case study' : 'Project'}</span>
              {categories.slice(0, 2).map((category) => <span key={category} className="cs-cat">{category}</span>)}
            </div>

            <h1>{title}</h1>
            {summary && <p className="cs-summary">{summary}</p>}

            <div className="cs-actions">
              {liveLink && (
                <a href={liveLink} target="_blank" rel="noopener noreferrer" className="hx-primary">
                  Visit Live Site <span aria-hidden="true"><ExternalLink size={15} /></span>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="cs-ghost">
                  View Source <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
              {!liveLink && !project.githubUrl && (
                <Link href="/contact" className="hx-primary">Ask about this project <span aria-hidden="true"><ArrowRight size={15} /></span></Link>
              )}
            </div>

            <dl className="cs-facts">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <dt><Icon size={15} aria-hidden="true" /> {label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="cs-wrap">
            <figure className="cs-frame">
              <div className="cs-bar" aria-hidden="true"><i /><i /><i /><span>{title}</span></div>
              <div className="cs-shot">
                <SafeShot src={heroImage} alt={`${title} interface`} title={title} sizes="(max-width: 1280px) 100vw, 1200px" priority />
              </div>
            </figure>
          </div>
        </header>

        {overview.length > 0 && (
          <section className="cs-section cs-wrap cs-split cs-reveal" aria-labelledby="cs-story">
            <div>
              <p className="tag">Overview</p>
              <h2 id="cs-story">The <span>Story.</span></h2>
            </div>
            <div className="cs-prose">
              {overview.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          </section>
        )}

        {features.length > 0 && (
          <section className="cs-section cs-wrap cs-reveal" aria-labelledby="cs-features">
            <div className="cs-head">
              <p className="tag">What it does</p>
              <h2 id="cs-features">Built Around <span>the Details.</span></h2>
            </div>
            <ol className="cs-features">
              {features.map((feature, index) => {
                const { title: name, text } = splitFeature(feature, index);
                return (
                  <li key={index}>
                    <span className="cs-num">{String(index + 1).padStart(2, '0')}</span>
                    <h3>{name}</h3>
                    <p>{text}</p>
                  </li>
                );
              })}
            </ol>
          </section>
        )}

        {challenges.length > 0 && (
          <section className="cs-section cs-wrap cs-reveal" aria-labelledby="cs-engineering">
            <div className="cs-head">
              <p className="tag">Engineering</p>
              <h2 id="cs-engineering">Problems, <span>Solved.</span></h2>
            </div>
            <ol className="cs-problems">
              {challenges.map((challenge, index) => (
                <li key={index}>
                  <div className="cs-problem">
                    <p className="cs-label">Challenge {String(index + 1).padStart(2, '0')}</p>
                    <p>{challenge}</p>
                  </div>
                  <span className="cs-link" aria-hidden="true"><ArrowRight size={18} /></span>
                  <div className={`cs-solution ${solutions[index] ? '' : 'is-empty'}`}>
                    <p className="cs-label">{solutions[index] ? <><Check size={14} aria-hidden="true" /> Approach</> : 'Approach'}</p>
                    <p>{solutions[index] ?? 'Handled as part of the build.'}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {tech.length > 0 && (
          <section className="cs-section cs-wrap cs-split cs-reveal" aria-labelledby="cs-toolkit">
            <div>
              <p className="tag">Toolkit</p>
              <h2 id="cs-toolkit">Made With <span>the Right Tools.</span></h2>
            </div>
            <ul className="cs-tools">
              {tech.map((item) => {
                const icon = toolIcon(item);
                return (
                  <li key={item}>
                    {icon && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={icon.color} aria-hidden="true"><path d={icon.path} /></svg>
                    )}
                    {item}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {resultText && (
          <section className="cs-section cs-wrap cs-reveal" aria-labelledby="cs-outcome">
            <div className="cs-outcome">
              <p className="tag">Outcome</p>
              <h2 id="cs-outcome">Results <span>That Matter.</span></h2>
              <p className="cs-result">{resultText}</p>
            </div>
          </section>
        )}

        {extraShots.length > 0 && (
          <section className="cs-section cs-wrap cs-reveal" aria-labelledby="cs-gallery">
            <div className="cs-head">
              <p className="tag">In the product</p>
              <h2 id="cs-gallery">A Closer <span>Look.</span></h2>
            </div>
            <div className="cs-gallery">
              {extraShots.map((image, index) => (
                <figure key={image} className="cs-frame cs-frame-sm">
                  <div className="cs-bar" aria-hidden="true"><i /><i /><i /><span>{title} · screen {index + 2}</span></div>
                  <div className="cs-shot">
                    <SafeShot src={image} alt={`${title} screen ${index + 2}`} title={title} sizes="(max-width: 900px) 100vw, 600px" />
                  </div>
                </figure>
              ))}
            </div>
          </section>
        )}

        {(adjacent.previous || adjacent.next) && (
          <nav className="cs-section cs-wrap cs-pager" aria-label="More projects">
            {adjacent.previous ? (
              <Link href={`/projects/${projectSlug(adjacent.previous)}`} className="cs-page">
                <small><ArrowLeft size={14} aria-hidden="true" /> Previous project</small>
                <strong>{adjacent.previous.title || adjacent.previous.projectTitle}</strong>
              </Link>
            ) : <span />}
            {adjacent.next && (
              <Link href={`/projects/${projectSlug(adjacent.next)}`} className="cs-page is-next">
                <small>Next project <ArrowRight size={14} aria-hidden="true" /></small>
                <strong>{adjacent.next.title || adjacent.next.projectTitle}</strong>
              </Link>
            )}
          </nav>
        )}
      </article>
    </EmberShell>
  );
}
