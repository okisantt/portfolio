import type { Metadata } from "next";
import ClosingBand from "@/components/page/ClosingBand";
import PageHead from "@/components/page/PageHead";
import ProjectDeck from "@/components/projects/ProjectDeck";
import { nextAfter } from "@/lib/content";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos de Isaac Santana Muniz: portfólio, EPI Sentinel, Painel Hacking e Bloco de Afazeres.",
  alternates: { canonical: "/projetos" },
};

export default function ProjectsPage() {
  return (
    <main id="conteudo" className="np">
      <div className="np-frame">
        <PageHead
          eyebrow="O que venho construindo"
          title="Projetos"
          intro="Projetos em que organização, clareza e confiabilidade importam tanto quanto a tecnologia. Escolha um para ler a história completa."
        />
        <ProjectDeck projects={PROJECTS} />
      </div>
      <ClosingBand
        statement="Cada projeto começa por entender o problema."
        next={nextAfter("/projetos")}
      />
    </main>
  );
}
