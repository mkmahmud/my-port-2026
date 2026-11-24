import type { Metadata } from 'next';
import { EmberShell } from '@/components/home/EmberShell';
import { ExperienceTimeline } from '@/components/home/ExperienceTimeline';
import { PageHero } from '@/components/home/PageHero';
import '@/components/home/pages.css';

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
      <EmberShell>
        <PageHero crumb="Experience" tag="Career" title={<>My Engineering <span>Journey.</span></>} sub="The teams I have shipped with, what I built there, and how I keep learning." />
        <ExperienceTimeline />
      </EmberShell>
    </>
  );
}
