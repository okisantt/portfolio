import SectionHeading from "@/components/ui/SectionHeading";
import { SKILL_GROUPS } from "@/lib/data";

export default function Skills() {
  return (
    <section id="habilidades" className="py-section-y">
      <SectionHeading
        number="02"
        title="Habilidades"
        description="Uma base multidisciplinar para construir, integrar e manter soluções úteis."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {SKILL_GROUPS.map((group) => (
          <article key={group.title} className="surface rounded-2xl p-5 sm:p-6">
            <h3 className="text-base font-semibold tracking-tight text-text">{group.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{group.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[11px] text-text/75"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
