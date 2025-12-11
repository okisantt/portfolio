import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm transition will-change-transform focus-visible:outline-none";
  const styles =
    variant === "primary"
      ? "bg-accent/12 text-text border border-accent/25 hover:bg-accent/18 active:bg-accent/22"
      : "bg-white/0 text-text border border-white/8 hover:bg-white/5 active:bg-white/8";

  return (
    <Link
      href={href}
      className={cn(base, styles, className)}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}
