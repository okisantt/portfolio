import { Github, Linkedin } from "lucide-react";
import { SITE } from "@/lib/data";

const links = [
  { href: SITE.github, label: "GitHub", Icon: Github },
  { href: SITE.linkedin, label: "LinkedIn", Icon: Linkedin },
] as const;

export default function SocialLinks({
  compact = false,
  onPaper = false,
}: {
  compact?: boolean;
  /** Use on the wine paper, where the accent colour would disappear. */
  onPaper?: boolean;
}) {
  const tone = onPaper
    ? "border-white/25 text-text/85 hover:border-white/60 hover:text-text"
    : "border-white/10 text-muted hover:border-accent/35 hover:text-text";

  return (
    <ul className="flex flex-wrap gap-3">
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center rounded-full border transition-colors ${tone} ${
              compact ? "h-11 w-11" : "min-h-11 gap-3 px-4 text-xs"
            }`}
            aria-label={`${label} de Isaac (abre em nova aba)`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {!compact && <span>{label}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
