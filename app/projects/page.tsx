import type { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { Projects } from '@/components/sections/Projects';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Selected Works & Engineering Portfolio',
  description:
    'Explore featured full-stack applications, EdTech platforms, AI automation systems, and SaaS dashboards crafted by Mahmudul Hasan.',
  keywords: [
    'Portfolio Projects',
    'Full Stack Case Studies',
    'Next.js Web Applications',
    'AI Systems Portfolio',
    'Bakery Shop App',
    'Codex Edumine',
    'Blossom Academy',
    'Mahmudul Hasan Projects',
  ],
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Selected Works & Engineering Portfolio — Mahmudul Hasan',
    description:
      'Explore featured full-stack applications, EdTech platforms, and AI automation systems crafted by Mahmudul Hasan.',
    url: '/projects',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mahmudul Hasan Portfolio Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Selected Works & Engineering Portfolio — Mahmudul Hasan',
    description:
      'Explore featured full-stack applications, EdTech platforms, and AI automation systems crafted by Mahmudul Hasan.',
    images: ['/images/og-image.png'],
  },
};

export default function ProjectsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Selected Works & Portfolio Projects',
    description:
      'Featured web applications, mobile app prototypes, and AI systems built by Mahmudul Hasan.',
    url: 'https://mkmahmud.dev/projects',
    creator: {
      '@type': 'Person',
      name: 'Mahmudul Hasan',
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
        <Projects />
      </main>
      <Footer />
    </>
  );
}
