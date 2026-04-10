"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerChild, staggerContainer } from "@/lib/animations";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Tilt3D } from "@/components/shared/Tilt3D";
import { categories } from "@/data/categories";
import { ArrowRightIcon } from "@/components/icons";

const categoryIcons: Record<string, string> = {
  lows: "🌿",
  zaa: "⚡",
  indoors: "🏠",
  "exotics-indoors": "💎",
  "snow-cap": "❄️",
  "moon-rocks": "🌙",
  shrooms: "🍄",
  wax: "🔥",
};

export function CategoryShowcase() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          label="Collections"
          title="Our Catalog"
          subtitle="Explore our curated selection of premium beverages across five distinct categories"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={staggerChild}>
            <Tilt3D intensity={12} scale={1.03} className="rounded-xl">
              <Link
                href={`/#catalog`}
                className="group relative block overflow-hidden rounded-xl border border-graphite bg-charcoal p-6 transition-all duration-500 hover:border-gold/30 hover:bg-graphite/50"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />

                <div className="relative">
                  <span className="mb-3 block text-3xl">
                    {categoryIcons[cat.id]}
                  </span>
                  <h3 className="mb-1 font-display text-lg font-semibold text-ivory">
                    {cat.name}
                  </h3>
                  <p className="mb-4 text-xs text-silver line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gold">
                      {cat.productCount} Products
                    </span>
                    <ArrowRightIcon
                      size={16}
                      className="text-slate transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold"
                    />
                  </div>
                </div>
              </Link>
            </Tilt3D>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
