"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function FadeIn({
  children,
  delay = 0,
  mode = "inView",
}: {
  children: React.ReactNode;
  delay?: number;
  mode?: "inView" | "mount";
}) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : { opacity: 0, y: 10 };
  const visible = { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={initial}
      {...(mode === "mount"
        ? { animate: visible }
        : { whileInView: visible, viewport: { once: true, margin: "-56px" } })}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1],
        delay: reduceMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
