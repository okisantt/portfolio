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
      {/* Mobile/Small screens: fluxo tradicional (preservado) */}
      <div className="md:hidden">
        <Hero />
        <Divider />
        <Feed />
      </div>

      {/* Desktop: coluna fixa à esquerda + feed à direita com scroll da página */}
      <DesktopSplit>
        <div className="pt-48 md:-ml-8 lg:-ml-6">
          <Feed />
        </div>
      </DesktopSplit>
    </main>
  );
}
