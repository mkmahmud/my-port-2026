import type { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ)',
  description:
    'Find answers to common questions about full stack web development, CI/CD automation, Docker, AWS infrastructure, and collaboration with Mahmudul Hasan.',
  keywords: [
    'Mahmudul Hasan FAQ',
    'Full Stack DevOps Engineer FAQ',
    'CI/CD Pipeline Questions',
    'Docker AWS Deployment',
    'Next.js FastAPI PostgreSQL',
  ],
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions (FAQ) — Mahmudul Hasan',
    description:
      'Everything you need to know about working with Mahmudul Hasan: DevOps pipelines, cloud infrastructure, full-stack architecture, and tech stacks.',
    url: '/faq',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FAQ with Mahmudul Hasan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions (FAQ) — Mahmudul Hasan',
    description:
      'Everything you need to know about working with Mahmudul Hasan: DevOps pipelines, cloud infrastructure, full-stack architecture, and tech stacks.',
    images: ['/images/og-image.png'],
  },
};

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What technologies and infrastructure do you specialize in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I specialize in Next.js, TypeScript, React, Python, FastAPI, NestJS, PostgreSQL, Redis, Docker, and AWS cloud infrastructure with automated GitHub Actions CI/CD.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you manage both frontend and backend development?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, as a Full Stack DevOps Engineer, I engineer high-performance frontend interfaces with Tailwind and Shadcn, robust REST/GraphQL APIs, database architectures, and cloud deployments.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you set up automated CI/CD pipelines and Docker containers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. I containerize applications using multi-stage Docker builds and configure GitHub Actions pipelines for automated testing, linting, security scans, and zero-downtime deployment to AWS or Vercel.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you work with startups, remote teams, and enterprises?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. I have extensive experience collaborating with US remote engineering teams and local tech companies, delivering MVPs, enterprise ERP systems, and microservices.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you integrate AI models and LangChain agents into web apps?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, I build custom AI features including LangChain/LangGraph autonomous agents, vector embeddings with PostgreSQL pgvector (RAG), and streaming OpenAI integrations.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is your software delivery and deployment process?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A structured 4-phase engineering lifecycle: Discovery & System Architecture, Full-Stack Development, Automated Testing & Containerization, and Continuous Cloud Deployment.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main className="overflow-x-hidden pt-12 sm:pt-16">
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
