import type { ReactNode } from 'react';
import { Kaushan_Script, Poppins } from 'next/font/google';
import { HomeNav } from './HomeNav';
import { ClosingCta, HomeFooter } from './Closing';
import './home.css';
import './nav.css';
import './closing.css';

// Poppins sets all running text; Kaushan Script sets section titles.
const poppins = Poppins({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const kaushan = Kaushan_Script({
  variable: '--font-title',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

/** The shared frame for every page in the ember design system. */
export function EmberShell({ children, cta = true }: { children: ReactNode; cta?: boolean }) {
  return (
    <div className={`ember ${poppins.variable} ${kaushan.variable}`}>
      <HomeNav />
      <main>
        {children}
        {cta && <ClosingCta />}
      </main>
      <HomeFooter />
    </div>
  );
}
