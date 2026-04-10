"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerChild } from "@/lib/animations";
import { Container } from "@/components/shared/Container";
import { VerifiedBadgeIcon } from "@/components/icons";

export default function VerifiedPage() {
  return (
    <main className="min-h-screen pt-28 pb-20">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-12 text-center">
            <div className="mb-6 inline-flex items-center justify-center gap-3">
              <VerifiedBadgeIcon size={48} />
            </div>
            <h1 className="font-display text-4xl font-bold text-ivory sm:text-5xl lg:text-6xl">
              Verified
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-silver">
              Authenticity you can trust. Every product, every order — verified.
            </p>
          </motion.div>

          {/* Content placeholder — user will provide content */}
          <motion.div
            variants={staggerChild}
            className="rounded-2xl border border-graphite bg-charcoal/60 p-10 text-center backdrop-blur-sm"
          >
            <VerifiedBadgeIcon size={64} className="mx-auto mb-6" />
            <h2 className="font-display text-2xl font-bold text-ivory">
              Park Street Boys Wholesale
            </h2>
            <div className="mx-auto mt-2 flex items-center justify-center gap-2">
              <span className="text-lg text-silver">Verified Seller</span>
              <VerifiedBadgeIcon size={20} />
            </div>
            <p className="mx-auto mt-6 max-w-md text-silver">
              Content coming soon. This page will showcase our verification credentials and trusted seller status.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </main>
  );
}
