import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import TransitionLink from "@/components/transition/TransitionLink";
import { SITE } from "@/lib/data";
import { tornTop } from "@/lib/torn";

const outline = tornTop(73, 4);

/** The band of wine paper that closes each page: one statement, how to get in touch, where to go next. */
export default function ClosingBand({
  statement,
  next,
}: {
  statement: string;
  next: { href: string; label: string; word: string; prefix?: string };
}) {
  return (
    <section className="closing" aria-label="Contato e próxima página">
      <div className="closing-paper" style={{ clipPath: outline }} aria-hidden="true" />
      <div className="closing-inner">
        <p className="closing-statement">{statement}</p>

        <div className="closing-actions">
          <Link href="/curriculo" className="closing-btn closing-btn-solid">
            <FileText aria-hidden="true" />
            Solicitar currículo
          </Link>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="closing-btn closing-btn-ghost"
          >
            Falar no LinkedIn
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <TransitionLink href={next.href} word={next.word} className="closing-next">
          <span>{next.prefix ?? "Próxima página"}</span>
          <strong>
            {next.label} <span aria-hidden="true">→</span>
          </strong>
        </TransitionLink>
      </div>
    </section>
  );
}
