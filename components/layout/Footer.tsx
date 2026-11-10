import Link from "next/link";
import { SITE } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-4 px-5 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>© 2026 {SITE.name}.</p>
        <div className="flex items-center gap-5">
          <Link className="transition-colors hover:text-text" href="/privacidade">
            Privacidade
          </Link>
          <Link className="transition-colors hover:text-text" href="/admin/solicitacoes">
            Área administrativa
          </Link>
        </div>
      </div>
    </footer>
  );
}
