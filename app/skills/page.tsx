import type { Metadata } from 'next';
import { EmberShell } from '@/components/home/EmberShell';
import { TechMarquee } from '@/components/home/TechMarquee';
import { SkillsGrid } from '@/components/home/SkillsGrid';
import { PageHero } from '@/components/home/PageHero';
import '@/components/home/techmarquee.css';
import '@/components/home/pages.css';

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
      <EmberShell>
        <PageHero crumb="Skills" tag="Skills" title={<>The Tools <span>I Ship With.</span></>} sub="Languages, frameworks, databases, cloud, and AI tooling I use in production." />
        <TechMarquee />
        <SkillsGrid />
      </EmberShell>
    </>
  );
}
