import type { Metadata } from 'next';
import { EmberShell } from '@/components/home/EmberShell';
import { PricingPlans } from '@/components/home/PricingPlans';
import { FaqSection } from '@/components/home/FaqSection';
import { PageHero } from '@/components/home/PageHero';
import '@/components/home/pages.css';

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
      <EmberShell>
        <PageHero crumb="Pricing" tag="Pricing" title={<>Ways to <span>Work Together.</span></>} sub="Hourly help, a dedicated monthly engineer, or a quote for a fixed project." />
        <PricingPlans />
        <FaqSection />
      </EmberShell>
    </>
  );
}
