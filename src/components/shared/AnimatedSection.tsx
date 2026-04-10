"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  stagger = false,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.section
      variants={stagger ? staggerContainer : fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={delay ? { delay } : undefined}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
}
