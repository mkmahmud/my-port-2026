import type { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { Skills } from '@/components/sections/Skills';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Skills & Technical Stack — Tools Behind My Work',
  description:
    'Explore the technical skill set of Mahmudul Hasan: Next.js, React, Node.js, Python, TypeScript, Docker, PostgreSQL, LangChain, and modern cloud DevOps.',
  keywords: [
    'Mahmudul Hasan Skills',
    'Frontend Tech Stack',
    'Backend Technologies',
    'AI ML Engineering Tools',
    'Cloud and DevOps',
  ],
  alternates: {
    canonical: '/skills',
  },
  openGraph: {
    title: 'Skills & Technical Stack — Mahmudul Hasan',
    description:
      'Explore the technical skill set of Mahmudul Hasan across frontend, backend, AI/ML, and cloud infrastructure.',
    url: '/skills',
    type: 'website',
  },
};

export default function SkillsPage() {
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden pt-12 sm:pt-16">
        <Skills />
      </main>
      <Footer />
    </>
  );
}
