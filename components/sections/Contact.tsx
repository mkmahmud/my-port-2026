'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/Icons';
import { SITE_CONFIG } from '@/lib/constants';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#FBF8F2] relative border-t border-[#EBE3D5]">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EDE2] border border-[#EBE3D5] text-[#181512] text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F6991A]" />
              Start a Conversation
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#181512] tracking-tight">
              Let&apos;s Build Your <span className="text-[#F6991A]">Next Project</span>
            </h2>
          </div>
          <p className="text-base text-[#7A746B] max-w-md leading-relaxed">
            Have an MVP in mind, need full-stack engineering support, or looking to integrate AI into your products? Let&apos;s discuss.
          </p>
        </div>

        {/* Dual Layout: Form (Left) & Dark Contact Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#EBE3D5] shadow-sm">
            <h3 className="text-2xl font-heading font-bold text-[#181512] mb-2">
              Send a Direct Message
            </h3>
            <p className="text-sm text-[#7A746B] mb-8">
              Fill in your details below and I will respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-heading font-bold text-[#181512] uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FBF8F2] border border-[#EBE3D5] text-[#181512] text-sm focus:outline-none focus:border-[#F6991A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold text-[#181512] uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FBF8F2] border border-[#EBE3D5] text-[#181512] text-sm focus:outline-none focus:border-[#F6991A] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-[#181512] uppercase tracking-wider mb-2">
                  Project Details
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your project, timeline, and goals..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FBF8F2] border border-[#EBE3D5] text-[#181512] text-sm focus:outline-none focus:border-[#F6991A] transition-colors resize-none"
                />
              </div>

              {status === 'success' && (
                <div className="p-4 rounded-2xl bg-green-50 text-green-800 border border-green-200 text-sm flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-600" />
                  <span>Thank you! Your message has been sent successfully. I will get back to you shortly.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-2xl bg-red-50 text-red-800 border border-red-200 text-sm">
                  Failed to send message. Please reach out directly at {SITE_CONFIG.email}.
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                withArrow
                disabled={status === 'submitting'}
                className="w-full sm:w-auto"
              >
                {status === 'submitting' ? 'Sending Message...' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* Right Dark Info Card */}
          <div className="lg:col-span-5 bg-[#181512] text-white rounded-3xl p-8 sm:p-10 border border-[#362F27] shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#F6991A]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241F1A] border border-[#362F27] text-[#F6991A] text-xs font-mono mb-8">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Available for New Contracts
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-6">
                Let&apos;s discuss your vision directly.
              </h3>

              <div className="space-y-6 mb-10">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#241F1A] border border-[#362F27] hover:border-[#F6991A]/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F6991A] text-[#181512] flex items-center justify-center font-bold flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-[#F5EFEB]/60 font-mono">EMAIL DIRECTLY</div>
                    <div className="text-sm font-heading font-bold text-white group-hover:text-[#F6991A] transition-colors">
                      {SITE_CONFIG.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#241F1A] border border-[#362F27]">
                  <div className="w-10 h-10 rounded-xl bg-[#2E2822] text-[#F6991A] flex items-center justify-center font-bold flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-[#F5EFEB]/60 font-mono">LOCATION</div>
                    <div className="text-sm font-heading font-bold text-white">
                      Dhaka, Bangladesh (UTC+6)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#241F1A] border border-[#362F27]">
                  <div className="w-10 h-10 rounded-xl bg-[#2E2822] text-[#F6991A] flex items-center justify-center font-bold flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-[#F5EFEB]/60 font-mono">RESPONSE TIME</div>
                    <div className="text-sm font-heading font-bold text-white">
                      Within 24 Hours
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons Strip */}
            <div className="pt-6 border-t border-[#362F27] flex items-center justify-between">
              <span className="text-xs font-mono text-[#F5EFEB]/60">Follow my work:</span>
              <div className="flex items-center gap-3">
                <a
                  href={SITE_CONFIG.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#241F1A] border border-[#362F27] text-white flex items-center justify-center hover:bg-[#F6991A] hover:text-[#181512] transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github size={16} />
                </a>
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#241F1A] border border-[#362F27] text-white flex items-center justify-center hover:bg-[#F6991A] hover:text-[#181512] transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
