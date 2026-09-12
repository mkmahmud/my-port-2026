import type { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { Process } from '@/components/sections/Process';
import { Footer } from '@/components/sections/Footer';

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
      <Navigation />
      <main className="overflow-x-hidden pt-12 sm:pt-16">
        <Process />
      </main>
      <Footer />
    </>
  );
}
