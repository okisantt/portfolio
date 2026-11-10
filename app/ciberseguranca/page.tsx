import type { Metadata } from "next";
import NumberedPage from "@/components/page/NumberedPage";
import { CIBERSEGURANCA } from "@/lib/content";

export const metadata: Metadata = {
  title: CIBERSEGURANCA.title,
  description: CIBERSEGURANCA.description,
  alternates: { canonical: CIBERSEGURANCA.href },
};

export default function CibersegurancaPage() {
  return <NumberedPage page={CIBERSEGURANCA} />;
}
