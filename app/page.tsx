import Intro from "@/components/intro/Intro";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import Divider from "@/components/ui/Divider";

export default function HomePage() {
  return (
    <main id="conteudo">
      <Intro />
      <Hero />
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-10">
        <About />
        <Divider seed={11} />
        <Skills />
        <Divider seed={23} />
        <Timeline />
        <Divider seed={37} />
        <Projects />
        <Divider seed={51} />
        <Contact />
      </div>
    </main>
  );
}
