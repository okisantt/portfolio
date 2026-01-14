"use client";

import Container from "@/components/ui/Container";
import FeaturedProject from "./FeaturedProject";
import EpiSentinelShots from "@/components/sections/EpiSentinelShots";

export default function Projects() {
  return (
    <section
      id="projetos"
      className="py-section-y pb-24 md:pb-32 scroll-mt-20 md:mt-[18vh]"
    >
      <Container>
        <FeaturedProject />
        <EpiSentinelShots />
      </Container>
    </section>
  );
}
