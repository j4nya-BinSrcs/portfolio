import Section from "@/components/section";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Experience from "@/components/experience";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <Hero />
      <Section id="about" title="About">
        <About />
      </Section>
      <Section id="skills" title="Skills">
        <Skills />
      </Section>
      <Section id="projects" title="Selected Projects">
        <Projects />
      </Section>
      <Section id="experience" title="Experience">
        <Experience />
      </Section>
      <Section id="contact" title="Contact">
        <Contact />
      </Section>
    </div>
  );
}
