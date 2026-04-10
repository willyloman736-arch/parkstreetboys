import type { Variants } from "framer-motion";

const luxuryEase = [0.22, 1, 0.36, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: luxuryEase },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: luxuryEase },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: luxuryEase },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: luxuryEase },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: luxuryEase },
  },
};

export const slideInRight: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.5, ease: luxuryEase },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.4, ease: luxuryEase },
  },
};

export const slideInLeft: Variants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: { duration: 0.5, ease: luxuryEase },
  },
  exit: {
    x: "-100%",
    transition: { duration: 0.4, ease: luxuryEase },
  },
};

export const heroText: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: luxuryEase },
  },
};
