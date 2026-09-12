import type { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { Blogs } from '@/components/sections/Blogs';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Latest Blogs & Technical Insights',
  description:
    'Read in-depth technical blogs, UI/UX breakdowns, web development architectures, and software engineering insights by Mahmudul Hasan.',
  keywords: [
    'Web Development Blog',
    'UI UX Design Articles',
    'Full Stack Tutorials',
    'Next.js Best Practices',
    'Modern Web Engineering',
    'Mahmudul Hasan Blog',
  ],
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    title: 'Latest Blogs & Technical Insights — Mahmudul Hasan',
    description:
      'In-depth technical blogs, UI/UX design breakdowns, and modern web application development guides.',
    url: '/blogs',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mahmudul Hasan Blogs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Latest Blogs & Technical Insights — Mahmudul Hasan',
    description:
      'In-depth technical blogs, UI/UX design breakdowns, and modern web application development guides.',
    images: ['/images/og-image.png'],
  },
};

export default function BlogsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Technical Blogs & Insights by Mahmudul Hasan',
    description:
      'Articles covering UI/UX design patterns, scalable web apps, and modern frontend/backend techniques.',
    url: 'https://mkmahmud.dev/blogs',
    author: {
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
        <Blogs />
      </main>
      <Footer />
    </>
  );
}
