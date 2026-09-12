import type { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { Contact } from '@/components/sections/Contact';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/sections/Footer';

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
    'Dhaka Bangladesh Developer',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact & Hire Mahmudul Hasan — Full Stack DevOps Engineer',
    description:
      'Have a production app or cloud infrastructure to build? Get in touch today for consulting or development inquiries.',
    url: '/contact',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact Mahmudul Hasan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact & Hire Mahmudul Hasan — Full Stack DevOps Engineer',
    description:
      'Have a production app or cloud infrastructure to build? Get in touch today for consulting or development inquiries.',
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
      email: 'mkmahmud.dev@gmail.com',
      jobTitle: 'Full Stack Developer & AI Engineer',
      url: 'https://mkmahmud.dev',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dhaka',
        addressCountry: 'BD',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main className="overflow-x-hidden pt-12 sm:pt-16">
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
