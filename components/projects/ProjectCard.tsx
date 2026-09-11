'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Github } from '@/components/ui/Icons'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { type Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isCaseStudy = project.projectType === 'case-study';
  const displayTitle = project.title || project.projectTitle || 'Untitled Project';
  const displayThumb = project.thumbnailUrl || project.gellaryImages?.[0] || project.images?.[0];
  const stack = project.techStack || project.Technologies || [];
  const visibleTech = stack.slice(0, 4);
  const extraTechCount = Math.max(0, stack.length - 4);

  return (
    <Card className="group relative flex flex-col h-full" interactive>
      <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {displayTitle}</span>
      </Link>

      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg -mx-6 -mt-6 mb-4">
        {displayThumb ? (
          <Image
            src={displayThumb}
            alt={displayTitle}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 bg-surface/50 flex items-center justify-center">
            <span className="text-2xl font-mono text-text-muted opacity-50">
              {displayTitle.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base/90 via-base/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Type Badge on Top-Right */}
        <div className="absolute top-3 right-3 z-20">
          {isCaseStudy ? (
            <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-secondary/20 border border-secondary/40 text-secondary rounded-full backdrop-blur-md">
              Case Study
            </span>
          ) : (
            <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-base/80 border border-border text-text-muted rounded-full backdrop-blur-md">
              Project
            </span>
          )}
        </div>

        {/* Keyword pill on Bottom-Left */}
        {project.projectKeyWord && (
          <div className="absolute bottom-3 left-3 z-20">
            <span className="text-xs font-mono text-accent-muted bg-base/90 px-2 py-0.5 rounded border border-border/60">
              {project.projectKeyWord}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow mt-2">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-h4 font-heading text-text group-hover:text-accent transition-colors">
            {displayTitle}
          </h3>
        </div>
        <p className="text-sm text-text-muted mt-2 line-clamp-2 leading-relaxed">
          {project.description || (Array.isArray(project.overview) ? project.overview[0] : project.overview)}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {visibleTech.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {extraTechCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              +{extraTechCount} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-border relative z-20">
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm text-accent font-mono hover:underline inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
          >
            {isCaseStudy ? 'Read Case Study →' : 'View Project →'}
          </Link>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent transition-colors"
                aria-label="GitHub Repository"
              >
                <Github size={18} />
              </a>
            )}
            {(project.liveUrl || project.liveSite) && (
              <a
                href={project.liveUrl || project.liveSite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent transition-colors"
                aria-label="Live Site"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
