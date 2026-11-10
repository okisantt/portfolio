import HomeMenu from "@/components/home/HomeMenu";
import Intro from "@/components/intro/Intro";
import Hero from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <main id="conteudo">
      <Intro />
      <Hero />
      <HomeMenu />
    </main>
  );
}
