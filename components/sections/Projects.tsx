"use client";

import Container from "@/components/ui/Container";
import FeaturedProject from "./FeaturedProject";
import EpiSentinelShots from "@/components/sections/EpiSentinelShots";

export default function Projects() {
  return (
    <section id="projetos" className="py-section-y scroll-mt-20 md:mt-[18vh]">
      <Container>
        <FeaturedProject />
        <EpiSentinelShots />
      </Container>
    </section>
  );
}
