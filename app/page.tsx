import { Kaushan_Script, Poppins } from "next/font/google";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeNav } from "@/components/home/HomeNav";
import {
  AboutStack,
  ClosingCta,
  HomeFooter,
  Insights,
  ProcessSteps,
  QuoteBand,
} from "@/components/home/HomeSections";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TechMarquee } from "@/components/home/TechMarquee";
import { WhatIDo } from "@/components/home/WhatIDo";
import "@/components/home/home.css";
import "@/components/home/hero.css";
import "@/components/home/whatido.css";
import "@/components/home/techmarquee.css";
import "@/components/home/featured.css";

// Poppins sets all running text; Kaushan Script sets section titles.
const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const kaushan = Kaushan_Script({
  variable: "--font-title",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function Home() {
  return (
    <div className={`ember ${poppins.variable} ${kaushan.variable}`}>
      <HomeNav />
      <main>
        <HomeHero />
        <TechMarquee />
        <WhatIDo />
        <FeaturedProjects />
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
