import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import ClosingBand from "@/components/page/ClosingBand";
import NumberedSections from "@/components/page/NumberedSections";
import PageHead from "@/components/page/PageHead";
import ProjectCover from "@/components/projects/ProjectCover";
import TransitionLink from "@/components/transition/TransitionLink";
import { getProject, nextProject, PROJECTS } from "@/lib/projects";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projetos/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const next = nextProject(project.slug);

  return (
    <main id="conteudo" className="np">
      <div className="np-frame">
        <TransitionLink href="/projetos" word="Projetos" className="pd-back rise">
          <span aria-hidden="true">←</span> Todos os projetos
        </TransitionLink>

        <PageHead eyebrow={`${project.category} · ${project.status}`} title={project.name} intro={project.summary}>
          <ul className="pd-stack" aria-label="Tecnologias">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {project.links.length > 0 && (
            <div className="pd-links">
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </PageHead>

        <div className="pd-cover rise" style={{ "--d": "0.5s" } as React.CSSProperties}>
          <ProjectCover project={project} sizes="(max-width: 1100px) 92vw, 68rem" priority />
        </div>

        <NumberedSections sections={project.sections} />

        {project.gallery && (
          <section className="pd-gallery" aria-label={`Telas do projeto ${project.name}`}>
            {project.gallery.map((shot, index) => (
              <figure key={shot.src}>
                <div>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 767px) 92vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption>
                  {String(index + 1).padStart(2, "0")} — {shot.label}
                </figcaption>
              </figure>
            ))}
          </section>
        )}
      </div>

      <ClosingBand
        statement="Quer conversar sobre este projeto?"
        next={{
          href: `/projetos/${next.slug}`,
          label: next.name,
          word: next.name,
          prefix: "Próximo projeto",
        }}
      />
    </main>
  );
}
