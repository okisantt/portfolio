import { ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { EXPERIENCES } from "@/lib/data";

export default function Timeline() {
  return (
    <section id="experiencia" className="py-section-y">
      <SectionHeading
        number="03"
        title="Experiência"
        description="Experiências que fortaleceram disciplina operacional, comunicação e visão de processo."
      />

      <ol className="relative border-l border-white/10 pl-6 sm:pl-8">
        {EXPERIENCES.map((experience) => (
          <li key={`${experience.company}-${experience.period}`} className="relative pb-10 last:pb-0">
            <span
              className="absolute -left-[1.72rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent sm:-left-[2.22rem]"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5">
              <h3 className="text-base font-semibold leading-6 text-text sm:text-lg">
                {experience.role}
                <span className="font-normal text-text/50"> @ </span>
                <a
                  href={experience.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent hover:underline"
                >
                  {experience.company}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </h3>
              <p className="shrink-0 font-mono text-[11px] text-muted">{experience.period}</p>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
              {experience.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
