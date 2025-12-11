"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Pressable({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(className)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.18 }}
    >
      {children}
    </motion.div>
  );
}
