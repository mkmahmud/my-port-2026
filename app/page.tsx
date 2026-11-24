import { EmberShell } from "@/components/home/EmberShell";
import { HomeHero } from "@/components/home/HomeHero";
import { AboutMe } from "@/components/home/AboutMe";
import { BlogList } from "@/components/home/BlogList";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ProcessPipeline } from "@/components/home/ProcessPipeline";
import { TestimonialDeck } from "@/components/home/Testimonials";
import { TechMarquee } from "@/components/home/TechMarquee";
import { WhatIDo } from "@/components/home/WhatIDo";
import "@/components/home/hero.css";
import "@/components/home/whatido.css";
import "@/components/home/techmarquee.css";
import "@/components/home/featured.css";
import "@/components/home/about.css";
import "@/components/home/process.css";
import "@/components/home/testimonials.css";
import "@/components/home/blog.css";

export default function Home() {
  return (
    <EmberShell>
      <HomeHero />
      <TechMarquee />
      <WhatIDo />
      <FeaturedProjects />
      <AboutMe />
      <ProcessPipeline />
      <TestimonialDeck />
      <BlogList />
    </EmberShell>
  );
}
