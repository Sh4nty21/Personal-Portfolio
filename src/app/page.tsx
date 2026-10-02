import { About } from "@/components/home/about";
import { Certifications } from "@/components/home/certifications";
import { Contact } from "@/components/home/contact";
import { Experience } from "@/components/home/experience";
import { Hero } from "@/components/home/hero";
import { Highlights } from "@/components/home/highlights";
import { Projects } from "@/components/home/projects";
import { Skills } from "@/components/home/skills";
import { PageTransition } from "@/components/motion/page-transition";

/** Home page. */
export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <Highlights />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Certifications />
      <Contact />
    </PageTransition>
  );
}
