"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerChild } from "@/lib/animations";
import { Container } from "@/components/shared/Container";
import { SocialLinks } from "@/components/shared/SocialLinks";
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

          {/* Profile card */}
          <motion.div
            variants={staggerChild}
            className="rounded-2xl border border-graphite bg-charcoal/60 p-10 text-center backdrop-blur-sm"
          >
            <VerifiedBadgeIcon size={64} className="mx-auto mb-6" />
            <h2 className="font-display text-2xl font-bold text-ivory">
              Pack Street Boys Wholesale
            </h2>
            <div className="mx-auto mt-2 flex items-center justify-center gap-2">
              <span className="text-lg text-silver">Verified Seller</span>
              <VerifiedBadgeIcon size={20} />
            </div>
            <p className="mx-auto mt-6 max-w-md text-silver">
              Connect with us on our official, verified channels below. These
              are the only accounts we operate — anything else is not us.
            </p>
          </motion.div>

          {/* Socials card */}
          <motion.div
            variants={staggerChild}
            className="mt-6 rounded-2xl border border-graphite bg-charcoal/60 p-8 backdrop-blur-sm"
          >
            <h3 className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-forest">
              Official Channels
            </h3>
            <p className="mx-auto mb-6 max-w-md text-center text-sm text-silver">
              Tap any icon to open our verified account on that platform.
            </p>
            <SocialLinks className="justify-center" showLabels />
          </motion.div>
        </motion.div>
      </Container>
    </main>
  );
}
