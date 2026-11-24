import type { Metadata } from 'next';
import { EmberShell } from '@/components/home/EmberShell';
import { TestimonialDeck } from '@/components/home/Testimonials';
import { PageHero } from '@/components/home/PageHero';
import '@/components/home/testimonials.css';
import '@/components/home/pages.css';

export const metadata: Metadata = {
  title: 'Client Reviews & Testimonials',
  description:
    'Read client reviews, founder recommendations, and feedback on collaborating with Mahmudul Hasan across web design, SaaS development, and AI engineering.',
  keywords: [
    'Client Reviews',
    'Customer Testimonials',
    'Developer Recommendations',
    'Mahmudul Hasan Reviews',
    'Full Stack Client Feedback',
  ],
  alternates: {
    canonical: '/testimonials',
  },
  openGraph: {
    title: 'Client Reviews & Testimonials — Mahmudul Hasan',
    description:
      'Discover what founders, engineering managers, and product leads say about working with Mahmudul Hasan.',
    url: '/testimonials',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Client Testimonials for Mahmudul Hasan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Reviews & Testimonials — Mahmudul Hasan',
    description:
      'Discover what founders, engineering managers, and product leads say about working with Mahmudul Hasan.',
    images: ['/images/og-image.png'],
  },
};

export default function TestimonialsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Client Reviews & Testimonials',
    description:
      'Client reviews and recommendations for Mahmudul Hasan.',
    url: 'https://mkmahmud.dev/testimonials',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Ava Wilson' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody:
            'Working with Mahmudul completely transformed our product experience. The UI felt modern, user-friendly, and perfectly aligned with our brand vision.',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'David Chen' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody:
            'Mahmudul is an outstanding full-stack engineer. His deep command across Next.js state management and Docker CI/CD enabled us to ship ahead of deadline.',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Sarah Jenkins' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody:
            'The Blossom Academy platform required complex live batching and real-time attendance handling. Mahmudul designed the entire architecture with zero latency.',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Marcus Vance' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody:
            'Building the AI Sales Pilot and our automated computer-vision OMR sheet scanner with Mahmudul was phenomenal.',
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
      <EmberShell>
        <PageHero crumb="Testimonials" tag="Testimonials" title={<>Kind Words From <span>Kind People.</span></>} sub="What founders and teams say after shipping with me." />
        <TestimonialDeck />
      </EmberShell>
    </>
  );
}
