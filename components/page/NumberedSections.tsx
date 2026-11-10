import TransitionLink from "@/components/transition/TransitionLink";
import type { Section } from "@/lib/content";

/**
 * Numbered reading layout: a large number that stays pinned while its section
 * scrolls past, a ruled title beside it and the text in its own column.
 */
export default function NumberedSections({ sections }: { sections: readonly Section[] }) {
  return (
    <ol className="np-list">
      {sections.map((section, index) => (
        <li key={section.title} className="np-item">
          <p className="np-num" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div className="np-main">
            <div className="np-title">
              <h2>{section.title}</h2>
              <p>{section.kicker}</p>
            </div>
            <div className="np-text">
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.list && (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.link && (
                <TransitionLink href={section.link.href} word={section.link.word} className="np-link">
                  {section.link.label}
                  <span aria-hidden="true">→</span>
                </TransitionLink>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
