import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { EmberShell } from '@/components/home/EmberShell';
import { ContactForm } from '@/components/home/ContactForm';
import { FaqList } from '@/components/home/FaqList';
import { SOCIALS, SocialIcon } from '@/components/home/socials';
import { SITE_CONFIG } from '@/lib/constants';
import '@/components/home/contact.css';

export const metadata: Metadata = {
  title: 'Contact & Hire Me — Start Your Project',
  description:
    'Get in touch with Mahmudul Hasan (MK) for full-stack engineering, DevOps & CI/CD pipelines, Docker containerization, AWS cloud infrastructure, or API architecture.',
  keywords: [
    'Contact Mahmudul Hasan',
    'Hire Full Stack DevOps Engineer',
    'DevOps CI/CD Consultant',
    'Docker AWS Deployment Engineer',
    'Software Project Inquiry',
    'Chattogram Bangladesh Developer',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact & Hire Mahmudul Hasan — Full Stack DevOps Engineer',
    description: 'Have a production app or cloud infrastructure to build? Get in touch today for consulting or development inquiries.',
    url: '/contact',
    type: 'website',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Contact Mahmudul Hasan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact & Hire Mahmudul Hasan — Full Stack DevOps Engineer',
    description: 'Have a production app or cloud infrastructure to build? Get in touch today for consulting or development inquiries.',
    images: ['/images/og-image.png'],
  },
};

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Mahmudul Hasan',
    url: 'https://mkmahmud.dev/contact',
    mainEntity: {
      '@type': 'Person',
      name: 'Mahmudul Hasan',
      email: SITE_CONFIG.email,
      jobTitle: 'Full Stack DevOps Engineer',
      url: 'https://mkmahmud.dev',
      address: { '@type': 'PostalAddress', addressLocality: 'Chattogram', addressCountry: 'BD' },
    },
  };

  return (
    <EmberShell cta={false}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="ct" aria-labelledby="ct-title">
        <span className="ct-glow" aria-hidden="true" />
        <header className="ct-head">
          <p className="tag">Contact</p>
          <h1 id="ct-title">Let&apos;s Talk About Your <span>Next Project.</span></h1>
          <p>Share a few details and I&apos;ll get back to you by email. Every message is saved and read.</p>
        </header>

        <div className="ct-grid">
          <div className="ct-panel">
            <ContactForm />
          </div>

          <aside className="ct-side" aria-label="Other ways to reach me">
            <ul className="ct-info">
              <li>
                <span className="ct-ico"><Mail size={18} aria-hidden="true" /></span>
                <div><small>Email</small><a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a></div>
              </li>
              {SITE_CONFIG.phone && (
                <li>
                  <span className="ct-ico"><Phone size={18} aria-hidden="true" /></span>
                  <div><small>Phone</small><a href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, '')}`}>{SITE_CONFIG.phone}</a></div>
                </li>
              )}
              <li>
                <span className="ct-ico"><MapPin size={18} aria-hidden="true" /></span>
                <div><small>Location</small><span>{SITE_CONFIG.location}</span></div>
              </li>
              <li>
                <span className="ct-ico"><Clock size={18} aria-hidden="true" /></span>
                <div><small>Working hours (UTC+6)</small><span>Mon – Fri · 10:00 – 20:00<br />Sat – Sun · 11:00 – 18:00</span></div>
              </li>
            </ul>
            <div className="ct-socials">
              <small>Elsewhere</small>
              <div>
                {SOCIALS.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <SocialIcon path={social.path} />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="fq" aria-labelledby="fq-title">
        <div className="fq-head">
          <p className="tag">FAQ</p>
          <h2 id="fq-title">Good <span>Questions.</span></h2>
        </div>
        <FaqList />
      </section>
    </EmberShell>
  );
}
