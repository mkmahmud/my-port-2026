'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X, Moon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useScrollSpy } from '@/hooks/useScrollSpy'

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const sectionIds = ['services', 'projects', 'blogs', 'about', 'testimonials']
  const activeSection = useScrollSpy(sectionIds)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Blogs', href: '#skills', id: 'skills' },
    { label: 'About Me', href: '#about', id: 'about' },
    { label: 'Testimonials', href: '#testimonials', id: 'testimonials' },
  ]

  return (
    <>
      <header className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav 
          className={`pointer-events-auto flex items-center justify-between gap-4 md:gap-10 px-4 md:px-7 py-2.5 rounded-full transition-all duration-300 w-full max-w-5xl ${
            scrolled 
              ? 'bg-[#181512]/95 backdrop-blur-md shadow-2xl border border-[#362F27]' 
              : 'bg-[#181512] shadow-xl border border-[#362F27]'
          }`}
        >
          {/* Logo with Orange Circle + lightning/geometric slash */}
          <a href="#hero" className="flex items-center gap-2 text-white font-bold tracking-tight text-lg pl-1 group">
            <div className="w-9 h-9 rounded-full bg-[#F6991A] flex items-center justify-center text-[#181512] shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h8l-1 8 11-13h-8l1-7z" />
              </svg>
            </div>
            <span className="font-heading tracking-tight text-lg text-white font-bold">
              Mahmudul<span className="text-[#F6991A]">.</span>
            </span>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const isActive = (item.id === 'hero' && (!activeSection || activeSection === 'hero')) || activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-[#F6991A] font-semibold' 
                      : 'text-[#F5EFEB]/80 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
          </div>

          {/* Right Actions: Moon Theme Icon & Let's Talk Pill */}
          <div className="flex items-center gap-3">
            <button 
              className="w-9 h-9 rounded-full border border-[#362F27] flex items-center justify-center text-[#F5EFEB]/80 hover:text-white hover:border-[#F6991A]/50 transition-colors focus:outline-none"
              aria-label="Theme toggle"
            >
              <Moon size={16} />
            </button>

            <a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full bg-white text-[#181512] text-xs md:text-sm font-heading font-bold hover:bg-[#F2EDE2] transition-colors shadow-sm"
            >
              Let&apos;s Talk
            </a>

            <button 
              className="md:hidden text-white/90 hover:text-[#F6991A] p-1.5 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center px-6">
          <div className="bg-[#181512] border border-[#362F27] rounded-3xl p-8 w-full max-w-sm flex flex-col items-center gap-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="text-xs font-mono text-[#F6991A] uppercase tracking-widest mb-1">Navigation</div>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-white hover:text-[#F6991A] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="w-full pt-4 border-t border-[#362F27] flex flex-col gap-3">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-[#F6991A] text-[#181512] font-bold text-center text-sm shadow-md"
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
