import type { Metadata } from 'next';
import { EmberShell } from '@/components/home/EmberShell';
import { BlogList } from '@/components/home/BlogList';
import { PageHero } from '@/components/home/PageHero';
import '@/components/home/blog.css';
import '@/components/home/pages.css';

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
      <EmberShell>
        <PageHero crumb="Blog" tag="From my blog" title={<>Insights <span>&amp; Articles.</span></>} sub="Notes on DevOps, backend architecture, and shipping AI features to production. Pick an article to read it here." />
        <div className="pg-band"><BlogList reader bare /></div>
      </EmberShell>
    </>
  );
}
