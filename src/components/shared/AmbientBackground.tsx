"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const orbs = [
  { size: 600, opacity: 0.15, x: "-10%", y: "0%", delay: 0 },
  { size: 500, opacity: 0.10, x: "65%", y: "5%", delay: 2 },
  { size: 550, opacity: 0.12, x: "-15%", y: "45%", delay: 1 },
  { size: 450, opacity: 0.10, x: "70%", y: "50%", delay: 3 },
  { size: 400, opacity: 0.08, x: "35%", y: "75%", delay: 2.5 },
];

export function AmbientBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="orb-green"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, rgba(45,106,79,${orb.opacity}) 0%, transparent 70%)`,
            filter: `blur(${orb.size * 0.3}px)`,
          }}
          animate={{
            y: [0, -20, 10, -15, 0],
            x: [0, 10, -8, 12, 0],
          }}
          transition={{
            duration: 25 + orb.delay * 3,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
