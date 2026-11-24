import type { Metadata } from 'next';
import { EmberShell } from '@/components/home/EmberShell';
import { ProcessPipeline } from '@/components/home/ProcessPipeline';
import { PageHero } from '@/components/home/PageHero';
import '@/components/home/process.css';
import '@/components/home/pages.css';

export const metadata: Metadata = {
  title: 'Development Process & Methodology — Mahmudul Hasan',
  description:
    'A clear 4-step software development process: Discovery & Architecture, UI/UX Prototyping, Full-Stack Development, and Testing & Deployment.',
  keywords: [
    'Development Process',
    'Software Engineering Workflow',
    'Agile Methodology',
    'Discovery and Architecture',
    'Mahmudul Hasan Process',
  ],
  alternates: {
    canonical: '/process',
  },
  openGraph: {
    title: 'Development Process & Methodology — Mahmudul Hasan',
    description:
      'Clear, predictable 4-step engineering process for reliable digital product delivery.',
    url: '/process',
    type: 'website',
  },
};

export default function ProcessPage() {
  return (
    <>
      <EmberShell>
        <PageHero crumb="Process" tag="How I work" title={<>From Idea <span>to Production.</span></>} sub="Every project runs like a CI/CD pipeline: planned, built, tested, and shipped in clear stages." />
        <ProcessPipeline />
      </EmberShell>
    </>
  );
}
