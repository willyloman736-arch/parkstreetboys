"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/shared/Button";
import { TELEGRAM_URL } from "@/data/site-config";

export function FinalCTA() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative overflow-hidden rounded-2xl border border-forest/20 glass-dark p-10 text-center sm:p-16 lg:p-20"
        >
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--color-forest)_0%,_transparent_70%)]" style={{ opacity: 0.05 }} />

          <div className="relative">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-forest">
              Nationwide Delivery
            </span>
            <h2 className="font-display text-3xl font-bold text-ivory sm:text-4xl lg:text-5xl">
              Ready to Place
              <br />
              <span className="text-gradient-forest">Your Order?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-silver sm:text-lg">
              Hit us up on Telegram to get started. Fast replies, discreet
              shipping, and the best wholesale prices guaranteed.
            </p>
            <div className="mt-8">
              <Button href={TELEGRAM_URL} size="lg">
                Message Us on Telegram
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
