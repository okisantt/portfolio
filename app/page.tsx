import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import Projects from "@/components/sections/Projects";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Divider from "@/components/ui/Divider";
import DesktopSplit from "@/components/layout/DesktopSplit";

function Feed() {
  return (
    <>
      <About />
      <Divider />
      <Skills />
      <Divider />
      <Timeline />
      <Divider />
      <Contact />
      <Divider />
      <Projects />
    </>
  );
}

export default function HomePage() {
  return (
    <main>
      {/*
        IMPORTANTE:
        - O Feed só é renderizado UMA vez para evitar IDs duplicados (#sobre/#experiencia/#projetos/#certificacoes)
          que quebram o scroll por âncora no desktop.
        - O Hero mobile continua exatamente como antes (md:hidden).
      */}
      <DesktopSplit>
        <div className="md:hidden">
          <Hero />
          <Divider />
        </div>

        <div className="pt-0 md:pt-48 md:-ml-8 lg:-ml-6">
          <Feed />
        </div>
      </DesktopSplit>
    </main>
  );
}
