import { cn } from "@/lib/utils";
import Container from "./Container";

export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-section-y", className)}>
      <Container>
        <div className="mb-10 sm:mb-14">
          {eyebrow && (
            <p className="text-xs tracking-[0.22em] uppercase text-muted">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-medium tracking-tightish text-balance">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}
