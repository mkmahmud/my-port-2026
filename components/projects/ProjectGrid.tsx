'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { gsap } from 'gsap'
import { ProjectCard } from './ProjectCard'
import { ProjectFilter, WorkTypeFilter } from './ProjectFilter'
import { ProjectSkeleton } from './ProjectSkeleton'
import { useProjects } from '@/hooks/useProjects'
import { Button } from '@/components/ui/Button'
import { type Project } from '@/lib/types'

export function ProjectGrid() {
  const { projects, isLoading, error, refetch } = useProjects()
  const [activeType, setActiveType] = useState<WorkTypeFilter>('all')
  const [activeCategory, setActiveCategory] = useState('')
  const gridRef = useRef<HTMLDivElement>(null)

  const caseStudiesCount = useMemo(() => {
    return (projects || []).filter(p => p.projectType === 'case-study').length
  }, [projects])

  const projectsCount = useMemo(() => {
    return (projects || []).filter(p => p.projectType !== 'case-study').length
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (!projects) return []
    return projects.filter(p => {
      // Filter by Type
      if (activeType === 'case-study' && p.projectType !== 'case-study') return false
      if (activeType === 'project' && p.projectType === 'case-study') return false

      // Filter by Category
      if (activeCategory) {
        const categories = p.category || p.projectCategory || []
        const hasCategory = categories.some(
          cat => cat.toLowerCase() === activeCategory.toLowerCase()
        )
        if (!hasCategory) return false
      }

      return true
    })
  }, [projects, activeType, activeCategory])

  useEffect(() => {
    if (!gridRef.current || isLoading) return
    
    const cards = gridRef.current.children
    if (cards.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, stagger: 0.04, duration: 0.45, ease: 'power2.out' }
      )
    }, gridRef)

    return () => ctx.revert()
  }, [filteredProjects, isLoading])

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted mb-4">Failed to load projects</p>
        <Button onClick={() => refetch?.()} variant="secondary">Retry</Button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {[...Array(4)].map((_, i) => (
          <ProjectSkeleton key={i} />
        ))}
      </div>
    )
  }

  const allCategories = Array.from(
    new Set(
      (projects || []).flatMap(p => p.category || p.projectCategory || [])
    )
  )

  return (
    <div className="w-full">
      <div className="mb-10">
        <ProjectFilter 
          activeType={activeType}
          onTypeChange={setActiveType}
          categories={allCategories} 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory}
          caseStudiesCount={caseStudiesCount}
          projectsCount={projectsCount}
          totalCount={projects?.length || 0}
        />
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-surface/30 border border-border/50 rounded-xl p-8">
          <p className="text-text-muted mb-4 font-mono text-sm">// No items found matching current filters</p>
          <Button 
            onClick={() => {
              setActiveCategory('')
              setActiveType('all')
            }} 
            variant="secondary"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map(project => (
            <div key={project._id || project.slug}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
