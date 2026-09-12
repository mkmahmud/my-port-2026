import type { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'About Me — Full Stack DevOps Engineer',
  description:
    'Learn more about Mahmudul Hasan (MK) — Full Stack DevOps Engineer based in Dhaka, Bangladesh. Technical background, skill competencies, and engineering journey.',
  keywords: [
    'About Mahmudul Hasan',
    'Full Stack DevOps Engineer Background',
    'Next.js Developer Bangladesh',
    'Docker AWS Engineer',
    'FastAPI PostgreSQL',
    'Technical Skills',
    'Software Experience',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Mahmudul Hasan — Full Stack DevOps Engineer',
    description:
      'Passionate about creating resilient digital systems, high-throughput APIs, and automated CI/CD cloud infrastructure.',
    url: '/about',
    type: 'profile',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'About Mahmudul Hasan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Mahmudul Hasan — Full Stack DevOps Engineer',
    description:
      'Passionate about creating resilient digital systems, high-throughput APIs, and automated CI/CD cloud infrastructure.',
    images: ['/images/og-image.png'],
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Mahmudul Hasan',
      alternateName: 'MK',
      jobTitle: 'Full Stack Developer & AI Engineer',
      description:
        'Full Stack Developer & AI Engineer based in Dhaka, Bangladesh. Specializing in Next.js, React, Node.js, Python, and AI/ML integrations.',
      url: 'https://mkmahmud.dev',
      sameAs: [
        'https://github.com/mkmahmud',
        'https://linkedin.com/in/mkmahmud',
      ],
      knowsAbout: [
        'React',
        'Next.js',
        'TypeScript',
        'Node.js',
        'Python',
        'FastAPI',
        'LangChain',
        'Docker',
        'PostgreSQL',
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
        <About />
        <Skills />
        <Experience />
      </main>
      <Footer />
    </>
  );
}
