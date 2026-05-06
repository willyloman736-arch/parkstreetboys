"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/shared/Button";
import { heroText, staggerContainer } from "@/lib/animations";

function FloatingParticle({
  delay,
  duration,
  x,
  y,
  size,
  color,
  active,
}: {
  delay: number;
  duration: number;
  x: string;
  y: string;
  size: number;
  color: string;
  active: boolean;
}) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: color,
        filter: `blur(${size * 0.4}px)`,
      }}
      animate={
        active
          ? {
              y: [0, -30, 10, -20, 0],
              x: [0, 15, -10, 20, 0],
              opacity: [0.3, 0.7, 0.4, 0.8, 0.3],
              scale: [1, 1.2, 0.9, 1.15, 1],
            }
          : { y: 0, x: 0, opacity: 0.3, scale: 1 }
      }
      transition={{
        duration,
        delay,
        repeat: active ? Infinity : 0,
        ease: "easeInOut",
      }}
    />
  );
}

const particles = [
  { delay: 0, duration: 12, x: "10%", y: "20%", size: 4, color: "rgba(45,106,79,0.6)" },
  { delay: 2, duration: 15, x: "80%", y: "30%", size: 3, color: "rgba(64,145,108,0.5)" },
  { delay: 1, duration: 10, x: "25%", y: "70%", size: 5, color: "rgba(45,106,79,0.4)" },
  { delay: 3, duration: 14, x: "65%", y: "15%", size: 3, color: "rgba(45,106,79,0.5)" },
  { delay: 4, duration: 11, x: "45%", y: "80%", size: 4, color: "rgba(64,145,108,0.4)" },
  { delay: 1.5, duration: 13, x: "90%", y: "60%", size: 3, color: "rgba(45,106,79,0.3)" },
  { delay: 2.5, duration: 16, x: "15%", y: "45%", size: 6, color: "rgba(45,106,79,0.3)" },
  { delay: 0.5, duration: 12, x: "55%", y: "55%", size: 3, color: "rgba(64,145,108,0.5)" },
];

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const isInView = useInView(ref, { amount: 0.1 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85svh] md:min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Video Background with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        {/* Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster=""
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Cinematic overlay gradients */}
        <div className="absolute inset-0 bg-midnight/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/50 via-transparent to-midnight z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/60 via-transparent to-midnight/60 z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-midnight to-transparent z-10" />

        {/* Vignette */}
        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.6) 100%)",
          }}
        />

        {/* Floating particles over video — pause when hero is scrolled out of view */}
        {mounted &&
          particles.map((p, i) => (
            <div key={i} className="z-30">
              <FloatingParticle {...p} active={isInView} />
            </div>
          ))}
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Decorative line + subtitle */}
          <motion.div
            variants={heroText}
            className="mx-auto mb-8 sm:mb-6 flex items-center justify-center gap-3 sm:gap-4"
          >
            <motion.div
              className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-forest/60"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-forest">
              Delivered Nationwide
            </span>
            <motion.div
              className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-forest/60"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </motion.div>

          <motion.h1
            variants={heroText}
            className="font-display text-[3.5rem] font-bold leading-[0.95] text-ivory sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
            style={{ textShadow: "0 4px 40px rgba(0,0,0,0.6), 0 0 80px rgba(45,106,79,0.15)" }}
          >
            Premium
            <br />
            <span className="text-gradient-forest">Wholesale</span>
          </motion.h1>

          {/* Tagline — visible on mobile for premium feel */}
          <motion.p
            variants={heroText}
            className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-silver/80 sm:mt-4 sm:max-w-md sm:text-base"
          >
            Curated exotics &amp; top-shelf selections — direct to your door.
          </motion.p>

          <motion.div
            variants={heroText}
            className="mt-8 sm:mt-10"
          >
            <Button href="/#catalog" size="lg">
              View Menu
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-ash">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-10 w-6 items-start justify-center rounded-full border border-slate/50 p-1.5"
          >
            <motion.div
              className="h-2 w-1 rounded-full bg-forest"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
