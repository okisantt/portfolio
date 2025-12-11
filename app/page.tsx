import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";
import Divider from "@/components/ui/Divider";
import DesktopSplit from "@/components/layout/DesktopSplit";

function Feed() {
  return (
    <>
      <Projects />
      <Divider />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <Timeline />
      <Divider />
      <Contact />
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
        <div className="pt-8">
          <Feed />
        </div>
      </DesktopSplit>
    </main>
  );
}
