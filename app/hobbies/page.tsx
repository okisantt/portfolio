import type { Metadata } from "next";
import HobbyStage from "@/components/hobbies/HobbyStage";

export const metadata: Metadata = {
  title: "Hobbies",
  description: "O que Isaac Santana Muniz faz fora do trabalho e dos estudos.",
  alternates: { canonical: "/hobbies" },
};

export default function HobbiesPage() {
  return (
    <main id="conteudo" className="hob">
      <h1 className="sr-only">Hobbies</h1>
      <HobbyStage />
    </main>
  );
}
