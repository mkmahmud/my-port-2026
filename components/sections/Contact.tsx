'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { SITE_CONFIG } from '@/lib/constants';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    country: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    setStatusMessage('');

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      if (serviceId && templateId && publicKey) {
        // Send email through EmailJS
        await emailjs.send(
          serviceId,
          templateId,
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || 'N/A',
            service: formData.service || 'Not specified',
            budget: formData.budget || 'Not specified',
            country: formData.country || 'Not specified',
            message: formData.message,
          },
          publicKey
        );
      } else {
        // Fallback simulation when env vars are not added yet
        console.warn(
          'EmailJS environment variables (NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) are not configured yet. Form submission simulated successfully.'
        );
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      // Optional backend recording fallback
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch(() => {
        // Silently catch if local DB is offline
      });

      setStatus('success');
      setStatusMessage(
        'Thank you! Your message has been sent successfully. I will get back to you shortly.'
      );
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        country: '',
        message: '',
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setStatusMessage('Failed to send message. Please try again or reach out directly.');
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 md:py-28 bg-[#FAF6EE] relative overflow-hidden">
      <Container>
        {/* HEADER AREA */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          {/* Double Circle Icon + Contact Me Label */}
          <div className="flex items-center justify-center gap-2 mb-3 select-none">
            <div className="relative flex items-center">
              <span className="w-3.5 h-3.5 rounded-full bg-[#181512]" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#F6991A] -ml-1.5" />
            </div>
            <span className="text-[#181512] font-semibold text-sm tracking-tight">
              Contact Me
            </span>
          </div>

          {/* Heading with 3-leaf sparkle decoration */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-heading font-extrabold tracking-tight leading-[1.14]">
            <span className="relative inline-block text-[#F6991A] mr-1.5">
              Let&apos;s Talk for Your
              {/* 3 black botanical leaf petals at top right */}
              <svg
                className="absolute -top-2.5 -right-5 sm:-top-3 sm:-right-6 w-5 h-5 sm:w-6 sm:h-6 text-[#181512] pointer-events-none"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                {/* Top leaf */}
                <path d="M12 11C13 6 16.5 2.5 21 2C20.5 6.5 17 10 12 11Z" />
                {/* Middle right leaf */}
                <path d="M13 12C17 11 21.5 12 24 15.5C21.5 18 17 17.5 13 14C12.5 13.5 12.5 12.5 13 12Z" />
                {/* Bottom leaf */}
                <path d="M12 13C13 17 15 20.5 17.5 23.5C14.5 23 11.5 20.5 10.5 16.5C10.5 14 11.5 13 12 13Z" />
              </svg>
            </span>
            <br />
            <span className="text-[#181512]">Next Projects</span>
          </h2>
        </div>

        {/* TWO-COLUMN GRID: FORM (LEFT) & DETAIL CARDS (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT FORM COLUMN (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Top 6 Inputs Grid (2 columns on tablet/desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 sm:gap-y-5">
                {/* 1. Your Name */}
                <div>
                  <label className="block text-sm font-bold text-[#181512] mb-2 font-heading">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Ex. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white border border-[#E7DFD4] rounded-xl sm:rounded-2xl px-4 py-3.5 text-sm text-[#181512] placeholder:text-[#9E978E] focus:outline-none focus:border-[#F6991A] focus:ring-1 focus:ring-[#F6991A] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                  />
                </div>

                {/* 2. Email */}
                <div>
                  <label className="block text-sm font-bold text-[#181512] mb-2 font-heading">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-[#E7DFD4] rounded-xl sm:rounded-2xl px-4 py-3.5 text-sm text-[#181512] placeholder:text-[#9E978E] focus:outline-none focus:border-[#F6991A] focus:ring-1 focus:ring-[#F6991A] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                  />
                </div>

                {/* 3. Phone */}
                <div>
                  <label className="block text-sm font-bold text-[#181512] mb-2 font-heading">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Enter Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-[#E7DFD4] rounded-xl sm:rounded-2xl px-4 py-3.5 text-sm text-[#181512] placeholder:text-[#9E978E] focus:outline-none focus:border-[#F6991A] focus:ring-1 focus:ring-[#F6991A] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                  />
                </div>

                {/* 4. I'm Interested in */}
                <div className="relative">
                  <label className="block text-sm font-bold text-[#181512] mb-2 font-heading">
                    I&apos;m Interested in *
                  </label>
                  <div className="relative">
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full appearance-none bg-white border border-[#E7DFD4] rounded-xl sm:rounded-2xl px-4 py-3.5 pr-10 text-sm focus:outline-none focus:border-[#F6991A] focus:ring-1 focus:ring-[#F6991A] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)] cursor-pointer ${
                        !formData.service ? 'text-[#9E978E]' : 'text-[#181512]'
                      }`}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="Full Stack Web Application">Full Stack Web Application</option>
                      <option value="AI / LLM Integration & Agents">AI / LLM Integration & Agents</option>
                      <option value="Frontend & UI/UX Design">Frontend & UI/UX Design</option>
                      <option value="Backend & API Architecture">Backend & API Architecture</option>
                      <option value="DevOps & Cloud Infrastructure">DevOps & Cloud Infrastructure</option>
                      <option value="Other Project Inquiry">Other Project Inquiry</option>
                    </select>
                    <ChevronDown
                      className="w-4 h-4 text-[#181512] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]"
                    />
                  </div>
                </div>

                {/* 5. Budget Range (USD) */}
                <div className="relative">
                  <label className="block text-sm font-bold text-[#181512] mb-2 font-heading">
                    Budget Range (USD) *
                  </label>
                  <div className="relative">
                    <select
                      name="budget"
                      required
                      value={formData.budget}
                      onChange={handleChange}
                      className={`w-full appearance-none bg-white border border-[#E7DFD4] rounded-xl sm:rounded-2xl px-4 py-3.5 pr-10 text-sm focus:outline-none focus:border-[#F6991A] focus:ring-1 focus:ring-[#F6991A] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)] cursor-pointer ${
                        !formData.budget ? 'text-[#9E978E]' : 'text-[#181512]'
                      }`}
                    >
                      <option value="" disabled>
                        Select Range
                      </option>
                      <option value="Under $1,000">&lt; $1,000</option>
                      <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                      <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000+">$10,000+</option>
                    </select>
                    <ChevronDown
                      className="w-4 h-4 text-[#181512] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]"
                    />
                  </div>
                </div>

                {/* 6. Country */}
                <div className="relative">
                  <label className="block text-sm font-bold text-[#181512] mb-2 font-heading">
                    Country *
                  </label>
                  <div className="relative">
                    <select
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full appearance-none bg-white border border-[#E7DFD4] rounded-xl sm:rounded-2xl px-4 py-3.5 pr-10 text-sm focus:outline-none focus:border-[#F6991A] focus:ring-1 focus:ring-[#F6991A] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)] cursor-pointer ${
                        !formData.country ? 'text-[#9E978E]' : 'text-[#181512]'
                      }`}
                    >
                      <option value="" disabled>
                        Select Country
                      </option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="India">India</option>
                      <option value="Other">Other Country</option>
                    </select>
                    <ChevronDown
                      className="w-4 h-4 text-[#181512] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]"
                    />
                  </div>
                </div>
              </div>

              {/* 7. Your Message (Full Width) */}
              <div>
                <label className="block text-sm font-bold text-[#181512] mb-2 font-heading">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Enter here.."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#E7DFD4] rounded-2xl p-4 text-sm text-[#181512] placeholder:text-[#9E978E] focus:outline-none focus:border-[#F6991A] focus:ring-1 focus:ring-[#F6991A] transition-all resize-none shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                />
              </div>

              {/* Status Notifications */}
              {status === 'success' && (
                <div className="p-4 rounded-2xl bg-amber-50 text-[#181512] border border-[#F6991A]/30 text-sm flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#F6991A] shrink-0" />
                  <div>
                    <span className="font-semibold block">Message Sent Successfully!</span>
                    <span className="text-xs text-[#7A746B]">{statusMessage}</span>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-2xl bg-red-50 text-red-800 border border-red-200 text-sm flex items-center gap-2">
                  <AlertCircle size={18} className="text-red-600 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center rounded-full bg-[#181512] hover:bg-black text-white px-8 py-3.5 text-sm font-semibold tracking-wide shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === 'submitting' ? 'Sending Message...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: TWO CARDS (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* 1. TOP DARK CARD (Address, Contact, Time) */}
            <div
              className="relative bg-[#191410] text-white p-8 sm:p-9 md:p-10 shadow-xl"
              style={{
                clipPath:
                  'polygon(32px 0%, calc(100% - 32px) 0%, 100% 32px, 100% 48%, calc(100% - 12px) 50%, calc(100% - 12px) 100%, 0% 100%, 0% 32px)',
              }}
            >
              {/* Address Section */}
              <div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#F6991A] tracking-tight mb-2">
                  Address
                </h3>
                <p className="text-[#C4BCB3] text-sm sm:text-[15px] leading-relaxed">
                  {SITE_CONFIG.location}<br />
                  Dhaka, Bangladesh
                </p>
              </div>

              {/* Contact Section */}
              <div className="mt-8 sm:mt-9">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#F6991A] tracking-tight mb-2">
                  Contact
                </h3>
                <div className="text-[#C4BCB3] text-sm sm:text-[15px] leading-relaxed space-y-1">
                  <p>
                    Phone :{' '}
                    <a
                      href={`tel:${SITE_CONFIG.phone || '+8801741503127'}`}
                      className="hover:text-[#F6991A] transition-colors"
                    >
                      {SITE_CONFIG.phone || '+880 17415-03127'}
                    </a>
                  </p>
                  <p>
                    Email :{' '}
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="hover:text-[#F6991A] transition-colors"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </p>
                </div>
              </div>

              {/* Time Section */}
              <div className="mt-8 sm:mt-9">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#F6991A] tracking-tight mb-2">
                  Time
                </h3>
                <div className="text-[#C4BCB3] text-sm sm:text-[15px] leading-relaxed space-y-1">
                  <p>Monday - Friday : 10:00 - 20:00</p>
                  <p>Saturday - Sunday : 11:00 - 18:00</p>
                </div>
              </div>
            </div>

            {/* 2. BOTTOM ORANGE CARD (Stay Connected) */}
            <div
              className="relative bg-[#F6991A] text-[#181512] p-7 sm:p-8 rounded-2xl shadow-lg"
              style={{
                clipPath:
                  'polygon(0 0, 100% 0, 100% 100%, 28px 100%, 0 calc(100% - 28px))',
              }}
            >
              <h3 className="text-xl sm:text-[22px] font-heading font-extrabold text-[#181512] tracking-tight mb-5">
                Stay Connected
              </h3>

              <div className="flex items-center gap-3 sm:gap-3.5 flex-wrap">
                {/* 1. Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-11 h-11 sm:w-11.5 sm:h-11.5 rounded-full bg-[#181512] text-[#F6991A] hover:bg-black hover:text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>

                {/* 2. X (Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-11 h-11 sm:w-11.5 sm:h-11.5 rounded-full bg-[#181512] text-[#F6991A] hover:bg-black hover:text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* 3. Pinterest */}
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  className="w-11 h-11 sm:w-11.5 sm:h-11.5 rounded-full bg-[#181512] text-[#F6991A] hover:bg-black hover:text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                </a>

                {/* 4. Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 sm:w-11.5 sm:h-11.5 rounded-full bg-[#181512] text-[#F6991A] hover:bg-black hover:text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                {/* 5. YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-11 h-11 sm:w-11.5 sm:h-11.5 rounded-full bg-[#181512] text-[#F6991A] hover:bg-black hover:text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
