'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { X, Download, Mail } from 'lucide-react'
import { Github, Linkedin } from '@/components/ui/Icons'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([])
  const firstFocusableRef = useRef<HTMLButtonElement>(null)
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Basic focus management
      setTimeout(() => {
        firstFocusableRef.current?.focus()
      }, 100)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    let ctx = gsap.context(() => {}, containerRef)
    
    if (isOpen && containerRef.current) {
      // First show the container
      gsap.set(containerRef.current, { display: 'flex' })
      
      const tl = gsap.timeline()
      
      tl.to(containerRef.current, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
        .fromTo(linksRef.current, 
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 0.5, stagger: 0.08, ease: 'power3.out' },
          "-=0.1"
        )
    } else if (!isOpen && containerRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(containerRef.current, { display: 'none' })
        }
      })
      
      tl.to(linksRef.current, { clipPath: 'inset(100% 0 0 0)', duration: 0.3, stagger: -0.05, ease: 'power2.in' })
      tl.to(containerRef.current, { autoAlpha: 0, duration: 0.3, ease: 'power2.inOut' }, "-=0.1")
    }
    
    return () => ctx.revert()
  }, [isOpen])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-base/95 backdrop-blur-xl z-50 flex-col hidden opacity-0"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between px-4 md:px-6 h-16 w-full">
        <a href="#" className="flex items-center gap-1 group" onClick={onClose}>
          <span className="font-heading font-bold text-xl text-text">MK</span>
          <span className="bg-accent w-1.5 h-1.5 rounded-full inline-block"></span>
        </a>
        <button 
          ref={firstFocusableRef}
          onClick={onClose}
          className="text-text hover:text-accent transition-colors p-2 -mr-2 focus:outline-none focus:ring-2 focus:ring-accent rounded-md"
          aria-label="Close Menu"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-6 w-full overflow-y-auto">
        <div className="flex flex-col items-center gap-6">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              ref={el => { linksRef.current[i] = el }}
              href={link.href}
              onClick={onClose}
              className="text-h3 font-heading font-medium text-text hover:text-accent transition-colors focus:outline-none focus:text-accent"
              style={{ clipPath: 'inset(100% 0 0 0)' }}
            >
              {link.label}
            </a>
          ))}
        </div>
        
        <div className="mt-4">
          <Button 
            variant="secondary" 
            size="md"
            href="/resume.pdf" 
            external 
            icon={<Download size={16} />}
          >
            Resume
          </Button>
        </div>
      </div>

      <div className="p-6 flex flex-col items-center gap-6 mt-auto w-full border-t border-border/50">
        <StatusBadge text={SITE_CONFIG.availabilityText} />
        
        <div className="flex items-center gap-6">
          <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors p-2" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors p-2" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href={`mailto:${SITE_CONFIG.email}`} className="text-text-muted hover:text-accent transition-colors p-2" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </div>
  )
}
