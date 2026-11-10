export default function SectionHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-9 sm:mb-12">
      <div className="flex items-center gap-4">
        <span className="text-[11px] font-semibold tracking-[0.3em] text-accent" aria-hidden="true">
          {number}
        </span>
        <h2 className="whitespace-nowrap text-2xl font-light tracking-[0.01em] text-text sm:text-3xl">
          {title}
        </h2>
        <span className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" aria-hidden="true" />
      </div>
      {description && (
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
          {description}
        </p>
      )}
    </header>
  );
}
