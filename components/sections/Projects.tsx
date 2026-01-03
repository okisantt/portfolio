"use client";

import Container from "@/components/ui/Container";
import FeaturedProject from "./FeaturedProject";

export default function Projects() {
  return (
    <section id="projetos" className="py-section-y scroll-mt-20 md:mt-[18vh]">
      <Container>
        <FeaturedProject />
      </Container>
    </section>
  );
}
