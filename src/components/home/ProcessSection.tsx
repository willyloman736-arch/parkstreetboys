"use client";

import { motion } from "framer-motion";
import { staggerChild, staggerContainer } from "@/lib/animations";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Browse & Select",
    description:
      "Explore our curated catalog of 500+ premium products. Filter by category, brand, or style to find exactly what your business needs.",
  },
  {
    number: "02",
    title: "Submit Order Request",
    description:
      "Add products to your order, specify quantities, and submit your request with your shipping details. No payment required at this stage.",
  },
  {
    number: "03",
    title: "Receive Confirmation",
    description:
      "Our team reviews your request, confirms availability and pricing, and reaches out with next steps within 24 hours.",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 lg:py-32" id="process">
      <Container>
        <SectionHeading
          label="How It Works"
          title="Simple Ordering Process"
          subtitle="Three steps to stock your shelves with premium products"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative grid gap-8 md:grid-cols-3"
        >
          {/* Connecting line (desktop only) */}
          <div className="absolute top-12 left-[16.67%] right-[16.67%] hidden h-px bg-gradient-to-r from-graphite via-forest/30 to-graphite md:block" />

          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={staggerChild}
              className="relative text-center"
            >
              <div className="relative z-10 mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-forest/20 bg-charcoal">
                <span className="font-display text-2xl font-bold text-forest">
                  {step.number}
                </span>
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold text-ivory">
                {step.title}
              </h3>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-silver">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
