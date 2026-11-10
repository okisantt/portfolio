import type { Metadata } from "next";
import NumberedPage from "@/components/page/NumberedPage";
import { OPERACIONAL } from "@/lib/content";

export const metadata: Metadata = {
  title: OPERACIONAL.title,
  description: OPERACIONAL.description,
  alternates: { canonical: OPERACIONAL.href },
};

export default function ExperienciaOperacionalPage() {
  return <NumberedPage page={OPERACIONAL} />;
}
