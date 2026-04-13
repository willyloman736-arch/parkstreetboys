"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { staggerChild, staggerContainer } from "@/lib/animations";
import { Container } from "@/components/shared/Container";

const stats = [
  { value: 100, suffix: "+", label: "Products" },
  { value: 8, suffix: "", label: "Categories" },
  { value: 10, suffix: "K+", label: "Orders Fulfilled" },
  { value: 48, suffix: "hr", label: "Average Delivery" },
];

function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.max(1, Math.floor(value / 60));
    const interval = duration / (value / step);

    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function TrustSection() {
  return (
    <section className="border-y border-graphite glass-dark py-20 lg:py-24">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerChild}
              className="group text-center"
            >
              <motion.div
                whileHover={{
                  rotateY: 10,
                  rotateX: -5,
                  scale: 1.05,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ perspective: 600, transformStyle: "preserve-3d" }}
                className="inline-block"
              >
                <span className="block font-display text-3xl font-bold text-forest sm:text-4xl lg:text-5xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                </span>
              </motion.div>
              <span className="mt-2 block text-xs font-medium uppercase tracking-[0.15em] text-silver">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
