import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

const PLANS = [
  {
    name: 'Hourly',
    price: '$30',
    unit: '/ hour',
    blurb: 'Flexible help for features, fixes, and pipeline work. Pay only for the hours used.',
    features: ['Flexible hourly contract', 'Full-stack bug fixing & features', 'Pay as you go', 'CI/CD pipeline updates', 'Docker containerization support', 'Transparent hourly logs'],
    cta: 'Hire hourly',
    featured: false,
  },
  {
    name: 'Monthly',
    price: '$4,800',
    unit: '/ month',
    blurb: 'A dedicated full stack and DevOps engineer working inside your team every sprint.',
    features: ['Dedicated full stack & DevOps engineer', 'Priority system & cloud support', 'Fast feature turnaround', 'Next.js, FastAPI & NestJS engineering', 'Database & query optimization', 'Automated CI/CD & AWS orchestration', 'Smooth GitHub sprint collaboration', 'Production-grade reliability & tests'],
    cta: 'Start monthly',
    featured: true,
  },
  {
    name: 'Custom',
    price: 'Quote',
    unit: 'per project',
    blurb: 'A personalised full-stack and DevOps quote tailored to your goals, architecture, and timeline.',
    features: [] as string[],
    cta: 'Get a quote',
    featured: false,
  },
];

export function PricingPlans() {
  return (
    <section className="pr" aria-labelledby="pr-title">
      <div className="pr-head">
        <p className="tag">Pricing</p>
        <h2 id="pr-title">Simple, Honest <span>Pricing.</span></h2>
        <p>Pick the way of working that fits. Every plan includes clean code, tests, and a proper deploy.</p>
      </div>
      <ul className="pr-grid">
        {PLANS.map((plan) => (
          <li key={plan.name} className={`pr-card ${plan.featured ? 'is-featured' : ''}`}>
            {plan.featured && <span className="pr-flag"><Sparkles size={14} aria-hidden="true" /> Dedicated engineer</span>}
            <h3>{plan.name}</h3>
            <p className="pr-price"><b>{plan.price}</b> <span>{plan.unit}</span></p>
            <p className="pr-blurb">{plan.blurb}</p>
            <ul className="pr-list">
              {plan.features.map((feature) => (
                <li key={feature}><span aria-hidden="true"><Check size={13} strokeWidth={3} /></span>{feature}</li>
              ))}
            </ul>
            <Link href="/contact" className={plan.featured ? 'hx-primary pr-cta' : 'pr-cta pr-ghost'}>
              {plan.cta} <span aria-hidden="true"><ArrowRight size={15} /></span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
