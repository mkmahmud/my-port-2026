import type { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { Experience } from '@/components/sections/Experience';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Work Experience & Career Journey — Mahmudul Hasan',
  description:
    'Career timeline, software engineering roles, and achievements of Mahmudul Hasan at Codexmine, LeoPhoenix, and academic institutes.',
  keywords: [
    'Mahmudul Hasan Experience',
    'Full Stack Engineer Career',
    'Software Engineering Roles',
    'Codexmine',
    'LeoPhoenix',
  ],
  alternates: {
    canonical: '/experience',
  },
  openGraph: {
    title: 'Work Experience & Career Journey — Mahmudul Hasan',
    description:
      'Career timeline and software engineering achievements of Mahmudul Hasan.',
    url: '/experience',
    type: 'website',
  },
};

export default function ExperiencePage() {
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden pt-12 sm:pt-16">
        <Experience />
      </main>
      <Footer />
    </>
  );
}
