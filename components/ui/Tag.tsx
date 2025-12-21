import { cn } from "@/lib/utils";

export default function Tag({
  children,
  subtle,
  className
}: {
  children: React.ReactNode;
  subtle?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10.5px] tracking-wide",
        subtle
          ? "bg-white/5 text-muted"
          : "bg-white/6 text-text border border-white/5",
        className
      )}
    >
      {children}
    </span>
  );
}
