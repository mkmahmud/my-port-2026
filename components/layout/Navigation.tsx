'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Moon, ArrowRight, Mail } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Page-wise navigation items for desktop pill navbar
  const desktopNavItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'About Me', href: '/about' },
    { label: 'Testimonials', href: '/testimonials' },
  ];

  // Page-wise comprehensive navigation items for mobile drawer
  const mobileNavItems = [
    { label: 'Home', href: '/', number: '01' },
    { label: 'Services', href: '/services', number: '02' },
    { label: 'Projects', href: '/projects', number: '03' },
    { label: 'Process', href: '/process', number: '04' },
    { label: 'Pricing', href: '/pricing', number: '05' },
    { label: 'Latest Blogs', href: '/blogs', number: '06' },
    { label: 'About Me', href: '/about', number: '07' },
    { label: 'Testimonials', href: '/testimonials', number: '08' },
    { label: 'FAQs', href: '/faq', number: '09' },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* FIXED FLOATING NAVBAR */}
      <header className="fixed top-3.5 sm:top-5 md:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-3 md:gap-10 px-3.5 sm:px-5 md:px-7 py-2 sm:py-2.5 rounded-full transition-all duration-300 w-full max-w-5xl ${
            scrolled
              ? 'bg-[#181512]/95 backdrop-blur-md shadow-2xl border border-[#362F27]'
              : 'bg-[#181512] shadow-xl border border-[#362F27]'
          }`}
        >
          {/* Logo with Brand Container */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 text-white font-bold tracking-tight text-lg pl-0.5 group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl bg-[#241F1A] border border-[#F6991A]/30 group-hover:border-[#F6991A] flex items-center justify-center p-1.5 shadow-md transition-all duration-200 group-hover:shadow-[0_0_12px_rgba(246,153,26,0.25)] shrink-0">
              <Image
                src="/logo.png"
                alt="Mahmudul Hasan Logo"
                width={36}
                height={23}
                className="w-auto h-4 sm:h-5 object-contain"
                priority
              />
            </div>
            <span className="font-heading tracking-tight text-base sm:text-lg text-white font-bold">
              Mahmudul<span className="text-[#F6991A]">.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {desktopNavItems.map((item) => {
              const isActive = isLinkActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-[#F6991A] font-semibold'
                      : 'text-[#F5EFEB]/80 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme / Decorative Moon Icon Button */}
            <button
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#362F27] flex items-center justify-center text-[#F5EFEB]/80 hover:text-white hover:border-[#F6991A]/50 transition-colors focus:outline-none"
              aria-label="Theme indicator"
            >
              <Moon size={15} />
            </button>

            {/* "Let's Talk" Capsule CTA (Visible on tablet & desktop) */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full bg-white text-[#181512] text-xs sm:text-sm font-heading font-extrabold hover:bg-[#F6991A] hover:text-[#181512] transition-colors shadow-sm"
            >
              Let&apos;s Talk
            </Link>

            {/* Mobile Hamburger Button with tactile feedback */}
            <button
              className="md:hidden w-9 h-9 rounded-full bg-[#241F1A] border border-[#3A3228] text-white flex items-center justify-center hover:border-[#F6991A] hover:text-[#F6991A] transition-all focus:outline-none active:scale-95 shadow-sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE FULL-SCREEN / SLIDE DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-black/85 backdrop-blur-md transition-opacity duration-300 flex flex-col justify-between overflow-y-auto animate-in fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Main Drawer Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full min-h-screen bg-[#181512] border-b border-[#362F27] text-white flex flex-col justify-between p-5 sm:p-6 animate-in slide-in-from-top-6 duration-300"
          >
            {/* Top Bar inside Drawer */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#2A231C]">
                {/* Brand */}
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#241F1A] border border-[#F6991A]/30 flex items-center justify-center p-1.5 shadow-md">
                    <Image
                      src="/logo.png"
                      alt="Mahmudul Hasan Logo"
                      width={36}
                      height={23}
                      className="w-auto h-5 object-contain"
                    />
                  </div>
                  <span className="font-heading tracking-tight text-lg text-white font-bold">
                    Mahmudul<span className="text-[#F6991A]">.</span>
                  </span>
                </Link>

                {/* Close Button */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#241F1A] border border-[#3A3228] text-white hover:bg-[#F6991A] hover:text-[#181512] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

            {/* Navigation Header Tag */}
            <div className="flex items-center gap-2 mt-6 mb-3 select-none">
              <div className="relative flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F6991A] -ml-1" />
              </div>
              <span className="text-xs font-mono text-[#F6991A] uppercase tracking-widest font-semibold">
                Navigation Menu
              </span>
            </div>

            {/* Links List */}
            <div className="flex flex-col gap-1.5 pt-1">
              {mobileNavItems.map((item) => {
                const isActive = isLinkActive(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group flex items-center justify-between py-3 px-3.5 rounded-2xl transition-all duration-200 ${
                      isActive
                        ? 'bg-[#251F19] text-[#F6991A] border border-[#F6991A]/30 shadow-sm'
                        : 'text-white/90 hover:bg-[#201A14] hover:text-[#F6991A]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="font-mono text-xs text-[#F6991A]/70 font-bold">
                        {item.number}.
                      </span>
                      <span className="font-heading font-extrabold text-[15px] sm:text-base tracking-tight">
                        {item.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F6991A] animate-pulse" />
                      )}
                      <ArrowRight
                        size={15}
                        className={`transition-transform duration-200 group-hover:translate-x-1 ${
                          isActive
                            ? 'text-[#F6991A]'
                            : 'text-stone-600 group-hover:text-[#F6991A]'
                        }`}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Card & Contact Footer */}
          <div className="pt-6 mt-4 border-t border-[#2A231C] space-y-4">
            {/* Signature Tech Card */}
            <div
              className="relative p-5 bg-[#201A14] border border-[#3A3026] rounded-2xl shadow-xl"
              style={{
                clipPath:
                  'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] font-mono text-green-400 uppercase tracking-wider font-semibold">
                  Available for new projects
                </span>
              </div>
              <p className="text-white text-sm font-heading font-bold mb-3 leading-snug">
                Have an MVP or intelligent system to build?
              </p>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-between px-5 py-3 rounded-full bg-[#F6991A] text-[#181512] font-heading font-extrabold text-xs sm:text-sm tracking-tight hover:bg-[#E0850B] transition-colors shadow-md"
              >
                <span>Let&apos;s Build Together</span>
                <span className="w-6 h-6 rounded-full bg-[#181512] text-white flex items-center justify-center text-xs font-bold">
                  ➔
                </span>
              </Link>
              </div>

              {/* Quick Contact & Socials */}
              <div className="flex items-center justify-between pt-2 text-xs text-[#9E978E]">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-[#F6991A] transition-colors flex items-center gap-1.5 font-medium"
                >
                  <Mail size={13} className="text-[#F6991A]" />
                  {SITE_CONFIG.email}
                </a>
                <span>Dhaka (UTC+6)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
