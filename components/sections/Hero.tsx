"use client";

import Container from "@/components/ui/Container";
import FadeIn from "@/components/motion/FadeIn";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="topo"
      className="pt-24 pb-20 md:pt-28 md:pb-0 min-h-[calc(100vh-3.5rem)] md:min-h-0 flex items-center md:items-start"
    >
      <Container>
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: -32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <FadeIn>
            <p className="text-sm md:text-xs font-mono text-accent mb-1">
              Hi, my name is
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-0.5">
              <h1 className="text-[2.5rem] md:text-[2.9rem] font-semibold leading-tight tracking-tightish text-balance">
                Isaac Santt.
              </h1>
              <p className="text-lg md:text-[1.6rem] font-medium text-text/75">
                I build things for the web.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div className="mt-8 space-y-3 text-[0.95rem] md:text-sm text-muted leading-relaxed">
              <p className="text-[0.8rem] tracking-[0.35em] text-muted/70">
                PERFIL
              </p>
              <p>
                Estudante de Engenharia de Software com foco em back-end.
                Atuando em banco de dados, deploy, correção de bugs e automação
                de sistemas.
              </p>
            </div>
          </FadeIn>
        </motion.div>
      </Container>
    </section>
  );
}
