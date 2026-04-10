"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          {label}
        </span>
      )}
      <h2 className="font-display text-3xl font-semibold text-ivory sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base text-silver sm:text-lg mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
