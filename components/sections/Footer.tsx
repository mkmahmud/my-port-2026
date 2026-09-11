'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Send, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 4000);
  };

  return (
    <footer className="relative bg-[#FAF6EE] text-[#181512] border-t-[3px] border-[#F6991A] overflow-hidden">
      {/* MAIN FOOTER CONTAINER */}
      <div className="pt-14 sm:pt-18 md:pt-20 pb-12 sm:pb-16">
        <Container>
          {/* TOP CTA ROW: "Let's Connect there" + Contact Me Capsule Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-10 sm:pb-14 border-b border-[#E5DFD3]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-heading font-extrabold text-[#181512] tracking-tight leading-tight">
              Let&apos;s <span className="text-[#F6991A]">Connect</span> there
            </h2>

            <div className="shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center bg-[#181512] p-1.5 rounded-full shadow-md hover:scale-[1.03] transition-transform duration-200 group"
              >
                <span className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#F6991A] text-[#181512] font-heading font-extrabold text-sm sm:text-base tracking-tight group-hover:bg-[#E0850B] transition-colors">
                  Contact Me
                </span>
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#181512] flex items-center justify-center font-bold text-sm sm:text-base ml-2.5 shadow-sm group-hover:translate-x-0.5 transition-transform">
                  ➔
                </span>
              </a>
            </div>
          </div>

          {/* 4 COLUMNS GRID ON DESKTOP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pt-12 sm:pt-16">
            {/* COLUMN 1: BRAND, BIO & 5 ORANGE SOCIAL BUTTONS (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                {/* Brand Logo with Dark Badge for White Logo + Orange Accent Ring */}
                <a href="#hero" className="inline-flex items-center gap-2.5 group select-none">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#181512] border border-[#F6991A]/50 group-hover:border-[#F6991A] flex items-center justify-center p-2 shadow-sm transition-all duration-200 group-hover:shadow-[0_0_12px_rgba(246,153,26,0.3)]">
                    <Image
                      src="/logo.png"
                      alt="Mahmudul Hasan Logo"
                      width={32}
                      height={21}
                      className="w-auto h-5 object-contain"
                    />
                  </div>
                  <span className="font-heading font-extrabold text-2xl text-[#181512] tracking-tight">
                    Mahmudul<span className="text-[#F6991A]">.</span>
                  </span>
                </a>

                {/* Bio text */}
                <p className="text-[#7A746B] text-sm sm:text-[15px] leading-relaxed mt-4 sm:mt-5 mb-6 sm:mb-8 max-w-sm font-normal">
                  I’m Mahmudul Hasan — a Full Stack Developer & AI Engineer passionate about creating intuitive digital experiences and scalable systems that blend aesthetics with functionality.
                </p>
              </div>

              {/* 5 Golden-Orange Circular Social Icons */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* 1. Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full bg-[#F6991A] text-[#181512] flex items-center justify-center font-bold shadow-sm hover:bg-[#181512] hover:text-[#F6991A] transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>

                {/* 2. X (Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full bg-[#F6991A] text-[#181512] flex items-center justify-center font-bold shadow-sm hover:bg-[#181512] hover:text-[#F6991A] transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* 3. GitHub */}
                <a
                  href={SITE_CONFIG.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full bg-[#F6991A] text-[#181512] flex items-center justify-center font-bold shadow-sm hover:bg-[#181512] hover:text-[#F6991A] transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>

                {/* 4. Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full bg-[#F6991A] text-[#181512] flex items-center justify-center font-bold shadow-sm hover:bg-[#181512] hover:text-[#F6991A] transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                {/* 5. LinkedIn */}
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full bg-[#F6991A] text-[#181512] flex items-center justify-center font-bold shadow-sm hover:bg-[#181512] hover:text-[#F6991A] transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.27 1.64 1.64 0 0 0 0 3.27m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* COLUMN 2: NAVIGATION (2-3 cols) */}
            <div className="lg:col-span-2 sm:pl-4">
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#F6991A] mb-4 sm:mb-5 tracking-wide select-none">
                Navigation
              </h3>
              <ul className="space-y-2.5 sm:space-y-3">
                {[
                  { label: 'Home', href: '#hero' },
                  { label: 'Services', href: '#services' },
                  { label: 'Projects', href: '#projects' },
                  { label: 'Blogs', href: '#blogs' },
                  { label: 'About Me', href: '#about' },
                  { label: 'FAQs', href: '#faq' },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[#524E48] hover:text-[#181512] hover:translate-x-1 transition-all duration-200 text-sm sm:text-[15px] font-medium block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3: CONTACT INFORMATION (3 cols) */}
            <div className="lg:col-span-3">
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#F6991A] mb-4 sm:mb-5 tracking-wide select-none">
                Contact
              </h3>
              <div className="space-y-2.5 sm:space-y-3 text-sm sm:text-[15px] font-medium text-[#524E48]">
                {/* Phone */}
                <div>
                  <a
                    href="tel:+8801700000000"
                    className="hover:text-[#181512] transition-colors block"
                  >
                    +880 1700-000000
                  </a>
                </div>

                {/* Website */}
                <div>
                  <a
                    href="https://mkmahmud.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#181512] transition-colors block"
                  >
                    mkmahmud.dev
                  </a>
                </div>

                {/* Email */}
                <div>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="hover:text-[#181512] transition-colors block break-all"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>

                {/* Address / Location */}
                <div className="pt-1 text-[#524E48] leading-snug">
                  {SITE_CONFIG.location}
                </div>
              </div>
            </div>

            {/* COLUMN 4: GET LATEST UPDATES & NEWSLETTER (3 cols) */}
            <div className="lg:col-span-3">
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#F6991A] mb-4 sm:mb-5 tracking-wide select-none">
                Get Latest Updates
              </h3>

              <form onSubmit={handleNewsletterSubmit} className="relative">
                {/* Clean White Pill Input Container */}
                <div className="bg-white rounded-full p-1 sm:p-1.5 pl-4 sm:pl-5 border border-[#E5DFD3] shadow-sm flex items-center justify-between focus-within:border-[#F6991A] focus-within:shadow-[0_0_12px_rgba(246,153,26,0.15)] transition-all duration-200">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    className="text-xs sm:text-sm text-[#181512] placeholder:text-[#A8A29E] bg-transparent outline-none flex-1 pr-2 font-normal"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#181512] text-[#F6991A] flex items-center justify-center font-bold shadow-sm hover:bg-[#F6991A] hover:text-[#181512] transition-all duration-200 shrink-0 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5" />
                  </button>
                </div>

                {newsletterSubscribed && (
                  <p className="text-xs text-[#059669] font-medium mt-2 pl-3 animate-in fade-in">
                    ✓ Subscribed! You will receive updates.
                  </p>
                )}
              </form>
            </div>
          </div>
        </Container>
      </div>

      {/* BOTTOM COPYRIGHT & LEGAL BAR (Espresso Dark Background + Top Orange Divider Line) */}
      <div className="bg-[#181512] text-white border-t-[3px] border-[#F6991A] py-5 sm:py-6">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#A8A29E] font-medium text-center sm:text-left">
            {/* Left Copyright */}
            <div>
              Copyright © {new Date().getFullYear()}{' '}
              <span className="text-[#F6991A] font-bold">Mahmudul.</span> All Rights Reserved.
            </div>

            {/* Right Terms & Privacy */}
            <div className="flex items-center gap-3">
              <a href="#hero" className="hover:text-white transition-colors">
                User Terms &amp; Conditions
              </a>
              <span className="text-[#362F27]">|</span>
              <a href="#hero" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
