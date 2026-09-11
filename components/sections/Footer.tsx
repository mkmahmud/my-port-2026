'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ArrowUp, Mail, Heart } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/Icons';
import { SITE_CONFIG } from '@/lib/constants';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FBF8F2] pt-16 pb-12 border-t border-[#EBE3D5]">
      <Container>
        {/* Big Banner CTA Strip */}
        <div className="bg-[#181512] text-white rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden border border-[#362F27] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#F6991A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#F6991A] font-bold block mb-2">
              Ready to ship your product?
            </span>
            <h3 className="text-2xl sm:text-4xl font-heading font-extrabold text-white">
              Let&apos;s Connect There & Build Something Great.
            </h3>
          </div>

          <Button variant="primary" size="lg" href="#contact" withArrow className="flex-shrink-0">
            Get In Touch
          </Button>
        </div>

        {/* Footer Navigation & Social Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#EBE3D5]">
          {/* Logo with Dark Background Badge */}
          <a href="#hero" className="flex items-center gap-2.5 text-[#181512] font-bold text-xl group">
            <div className="w-10 h-10 rounded-xl bg-[#181512] border border-[#362F27] group-hover:border-[#F6991A] flex items-center justify-center p-1.5 shadow-md transition-all duration-200 group-hover:shadow-[0_0_12px_rgba(246,153,26,0.2)]">
              <Image
                src="/logo.png"
                alt="Mahmudul Hasan Logo"
                width={36}
                height={23}
                className="w-auto h-5.5 object-contain"
              />
            </div>
            <span className="font-heading tracking-wide">
              Mahmudul<span className="text-[#F6991A]">.</span>
            </span>
          </a>

          {/* Nav Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-[#7A746B]">
            <a href="#services" className="hover:text-[#181512] transition-colors">Services</a>
            <a href="#about" className="hover:text-[#181512] transition-colors">About</a>
            <a href="#skills" className="hover:text-[#181512] transition-colors">Skills</a>
            <a href="#projects" className="hover:text-[#181512] transition-colors">Portfolio</a>
            <a href="#experience" className="hover:text-[#181512] transition-colors">Experience</a>
            <a href="#faq" className="hover:text-[#181512] transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-[#181512] transition-colors">Contact</a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white border border-[#EBE3D5] text-[#181512] flex items-center justify-center hover:bg-[#F6991A] hover:border-[#F6991A] transition-all shadow-sm"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white border border-[#EBE3D5] text-[#181512] flex items-center justify-center hover:bg-[#F6991A] hover:border-[#F6991A] transition-all shadow-sm"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="w-10 h-10 rounded-full bg-white border border-[#EBE3D5] text-[#181512] flex items-center justify-center hover:bg-[#F6991A] hover:border-[#F6991A] transition-all shadow-sm"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Bottom copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#7A746B]">
          <div>
            © {new Date().getFullYear()} Mahmudul Hasan. Designed & Built with Next.js, React & Tailwind.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#181512] font-semibold transition-colors focus:outline-none"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-full bg-white border border-[#EBE3D5] flex items-center justify-center text-[#181512]">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </Container>
    </footer>
  );
}
