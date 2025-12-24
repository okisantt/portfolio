"use client";

import FeaturedProject from "./FeaturedProject";

export default function Projects() {
  return (
    <section
      id="projetos"
      className="
        scroll-mt-20
        min-h-[calc(100svh-56px)]
        flex items-center justify-center
      "
    >
      <FeaturedProject />
    </section>
  );
}
