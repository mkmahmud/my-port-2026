import type { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { Pricing } from '@/components/sections/Pricing';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Pricing & Engagement Models — Mahmudul Hasan',
  description:
    'Transparent pricing packages and flexible engagement models for startups and businesses: Basic, Standard, and Enterprise tiers.',
  keywords: [
    'Pricing Plans',
    'Full Stack Development Rates',
    'Engagement Models',
    'Software Project Pricing',
    'Mahmudul Hasan Pricing',
  ],
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Pricing & Engagement Models — Mahmudul Hasan',
    description:
      'Transparent pricing and flexible engagement models for web and AI development projects.',
    url: '/pricing',
    type: 'website',
  },
};

export default function PricingPage() {
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden pt-12 sm:pt-16">
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
