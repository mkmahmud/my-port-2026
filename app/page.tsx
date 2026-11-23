import { Manrope } from "next/font/google";
import { HomeNav } from "@/components/home/HomeNav";
import {
  AboutStack,
  ClosingCta,
  HomeFooter,
  HomeHero,
  Insights,
  ProcessSteps,
  QuoteBand,
  RecentWork,
  TechStrip,
  WhatIDo,
} from "@/components/home/HomeSections";
import "@/components/home/home.css";

const manrope = Manrope({
  variable: "--font-ember",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div className={`ember ${manrope.variable}`}>
      <HomeNav />
      <main>
        <HomeHero />
        <TechStrip />
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
