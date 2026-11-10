import SectionHeading from "@/components/ui/SectionHeading";
import EpiSentinelShots from "./EpiSentinelShots";
import FeaturedProject from "./FeaturedProject";

export default function Projects() {
  return (
    <section id="projetos" className="py-section-y">
      <SectionHeading
        number="04"
        title="Projetos"
        description="Projetos em que organização, clareza e confiabilidade importam tanto quanto a tecnologia."
      />
      <div className="space-y-6 sm:space-y-8">
        <FeaturedProject />
        <EpiSentinelShots />
      </div>
    </section>
  );
}
