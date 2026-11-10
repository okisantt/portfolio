import type { Metadata } from "next";
import NumberedPage from "@/components/page/NumberedPage";
import { TECNOLOGIA } from "@/lib/content";

export const metadata: Metadata = {
  title: TECNOLOGIA.title,
  description: TECNOLOGIA.description,
  alternates: { canonical: TECNOLOGIA.href },
};

export default function ExperienciaTecnologiaPage() {
  return <NumberedPage page={TECNOLOGIA} />;
}
