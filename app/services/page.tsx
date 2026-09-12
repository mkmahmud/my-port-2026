import type { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Pricing } from '@/components/sections/Pricing';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Services & Engineering Solutions',
  description:
    'Comprehensive Full-Stack Web Development, DevOps & CI/CD Pipelines, Docker Containerization, API Architecture, and AI Engineering by Mahmudul Hasan (MK).',
  keywords: [
    'Full Stack Development Services',
    'DevOps CI/CD Services',
    'Docker Containerization',
    'AWS Cloud Solutions',
    'Next.js Development',
    'FastAPI Backend Architecture',
    'Mahmudul Hasan Services',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services & Engineering Solutions — Mahmudul Hasan',
    description:
      'Full-Stack Development, Docker & CI/CD Pipelines, Backend Architecture, and Cloud Solutions tailored for startups and businesses.',
    url: '/services',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mahmudul Hasan Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services & Engineering Solutions — Mahmudul Hasan',
    description:
      'Full-Stack Development, Docker & CI/CD Pipelines, Backend Architecture, and Cloud Solutions tailored for startups and businesses.',
    images: ['/images/og-image.png'],
  },
};

export default function ServicesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Full Stack Software Development & AI Engineering',
    provider: {
      '@type': 'Person',
      name: 'Mahmudul Hasan',
      url: 'https://mkmahmud.dev',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Development & Engineering Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'UI/UX Design',
            description:
              'User research, design systems, wireframing, and interactive prototyping.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Design & Development',
            description:
              'Modern, high-performance web applications built with Next.js, React, and Tailwind CSS.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Application Design & Architecture',
            description:
              'Full-stack cloud applications, scalable microservices, and database engineering.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Dashboard Design & Analytics',
            description:
              'Real-time metrics, admin portals, and data visualization platforms.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Wireframing & Prototyping',
            description:
              'Concept validation, clickable mockups, and rapid user flow architecture.',
          },
        },
      ],
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
        <Services />
        <Process />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
