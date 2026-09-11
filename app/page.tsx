import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { WhyChooseMe } from "@/components/sections/WhyChooseMe";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden">
        {/* 1. Hero Section (Cream) with Profile Portrait */}
        <Hero />

        {/* 1.5. Infinite Marquee Ticker: Full Stack, DevOps, CI/CD */}
        <TechMarquee />

        {/* 2. Services: "What I Bring To The Table" (Cream) */}
        <Services />

        {/* 3. About Me: "Who is Mahmudul Hasan?" (Espresso Dark) */}
        <About />

        {/* 4. Skills: "Exploring the Tools Behind My Work" (Cream) */}
        <Skills />

        {/* 5. Selected Portfolio / Works (Espresso Dark) */}
        <Projects />

        {/* 6. Experience & Education: Journey (Cream) */}
        <Experience />

        {/* 7. Why Choose Me (Espresso Dark) */}
        <WhyChooseMe />

        {/* 8. The Clear Development Process (Cream) */}
        <Process />

        {/* 9. Pricing & Engagement Models (Espresso Dark) */}
        <Pricing />

        {/* 10. Testimonials & Client Reviews (Cream) */}
        <Testimonials />

        {/* 11. Contact Form & Direct Connection (Cream) */}
        <Contact />

        {/* 12. Frequently Asked Questions (Espresso Dark) */}
        <FAQ />
      </main>
      
      {/* 13. Footer (Cream) with CTA Banner */}
      <Footer />
    </>
  );
}
