'use client'

import { GraduationCap, Award } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { EDUCATION } from '@/lib/constants'

export function Education() {
  return (
    <section id="education" className="py-24">
      <Container>
        <div className="mb-12">
          <SectionLabel number="05" label="Education" />
        </div>
        
        <div className="grid gap-6">
          {EDUCATION.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-surface border border-border rounded-lg p-6 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-accent/10 p-3 rounded-lg text-accent">
                    <GraduationCap size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-heading text-text">{item.institution}</h3>
                  <p className="text-sm text-text-muted mt-1">{item.degree} {item.field && `• ${item.field}`}</p>
                  <p className="font-mono text-xs text-accent-muted mt-2">{item.startDate} - {item.endDate}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
          
          <ScrollReveal delay={EDUCATION.length * 0.1}>
            <div className="bg-surface/50 border border-border rounded-lg p-6 flex gap-4 opacity-70">
              <div className="flex-shrink-0">
                <div className="bg-elevated p-3 rounded-lg text-text-muted">
                  <Award size={24} />
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-text-muted italic">Certifications coming soon</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
