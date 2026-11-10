import Image from "next/image";
import type { Project } from "@/lib/projects";

/**
 * The face of a project card: its screenshot when there is one, otherwise a
 * typographic cover in the site's own paper-and-ink language.
 */
export default function ProjectCover({
  project,
  sizes,
  priority = false,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
}) {
  if (project.cover) {
    return (
      <span className="cover">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </span>
    );
  }

  return (
    <span className="cover cover-type" role="img" aria-label={`Capa do projeto ${project.name}`}>
      <span className="cover-sheet" aria-hidden="true" />
      <span className="cover-meta" aria-hidden="true">
        {project.category}
      </span>
      <span className="cover-name" aria-hidden="true">
        {project.name}
      </span>
      <span className="cover-tags" aria-hidden="true">
        {project.stack.slice(0, 4).join(" · ")}
      </span>
    </span>
  );
}
