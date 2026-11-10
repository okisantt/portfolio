import type { Metadata } from "next";
import NumberedPage from "@/components/page/NumberedPage";
import { BIOGRAFIA } from "@/lib/content";

export const metadata: Metadata = {
  title: BIOGRAFIA.title,
  description: BIOGRAFIA.description,
  alternates: { canonical: BIOGRAFIA.href },
};

export default function BiografiaPage() {
  return <NumberedPage page={BIOGRAFIA} />;
}
