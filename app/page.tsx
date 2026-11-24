import { Manrope, Poppins } from "next/font/google";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeNav } from "@/components/home/HomeNav";
import {
  AboutStack,
  ClosingCta,
  HomeFooter,
  Insights,
  ProcessSteps,
  QuoteBand,
  RecentWork,
} from "@/components/home/HomeSections";
import { TechMarquee } from "@/components/home/TechMarquee";
import { WhatIDo } from "@/components/home/WhatIDo";
import "@/components/home/home.css";
import "@/components/home/hero.css";
import "@/components/home/whatido.css";
import "@/components/home/techmarquee.css";

const manrope = Manrope({
  variable: "--font-ember",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function Home() {
  return (
    <div className={`ember ${manrope.variable} ${poppins.variable}`}>
      <HomeNav />
      <main>
        <HomeHero />
        <TechMarquee />
        <WhatIDo />
        <RecentWork />
        <AboutStack />
        <ProcessSteps />
        <QuoteBand />
        <Insights />
        <ClosingCta />
      </main>
      <HomeFooter />
    </div>
  );
}
