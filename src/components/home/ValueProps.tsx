"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { staggerChild, staggerContainer, fadeInUp } from "@/lib/animations";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Tilt3D } from "@/components/shared/Tilt3D";
import { CheckIcon } from "@/components/icons";
import { TELEGRAM_URL, telegramUrlWithText } from "@/data/site-config";

const services = [
  {
    icon: "🚚",
    title: "Transportation Service",
    features: [
      "Professional and discreet delivery",
      "Real-time tracking available",
      "Secure and reliable service",
    ],
  },
  {
    icon: "📦",
    title: "Bread Routing",
    features: [
      "Efficient bulk order management",
      "Optimized delivery routes",
      "Priority handling for large orders",
    ],
  },
];

export function ValueProps() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hey! I'd like to subscribe for updates.\n\nName: ${formData.name}\nPhone: ${formData.phone || "N/A"}\nEmail: ${formData.email}`;
    window.open(telegramUrlWithText(msg), "_blank");
    setFormData({ name: "", phone: "", email: "" });
  };

  return (
    <>
      {/* Services Section */}
      <section className="py-24 lg:py-32">
        <Container>
          <SectionHeading
            label="What We Offer"
            title="Our Services"
            subtitle="Premium delivery solutions for every need"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-2"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={staggerChild}>
                <Tilt3D intensity={6} scale={1.01} className="rounded-2xl h-full">
                  <div className="h-full rounded-2xl border border-graphite glass-dark backdrop-blur-xl p-8">
                    {/* Header */}
                    <div className="mb-6 flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-forest/20 bg-forest/10 text-2xl">
                        {service.icon}
                      </div>
                      <h3 className="font-display text-xl font-bold text-ivory">
                        {service.title}
                      </h3>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-forest/30 text-forest">
                            <CheckIcon size={12} />
                          </div>
                          <span className="text-sm text-silver">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Tilt3D>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Whales / Big Players Banner */}
      <section className="border-y border-forest/10 bg-gradient-to-r from-forest/5 via-forest/10 to-forest/5">
        <Container className="py-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center justify-between gap-6 md:flex-row"
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-ivory">
                For Whales/BIG Players 🐋
              </h3>
              <p className="mt-1 text-sm text-silver">
                Special rates and dedicated support for high-volume orders
              </p>
            </div>

            <div className="flex gap-3">
              <a
                href="https://signal.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-graphite bg-charcoal/80 px-6 py-3 text-sm font-medium text-ivory transition-all hover:border-forest/30 hover:bg-charcoal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-forest">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                Signal
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-graphite bg-charcoal/80 px-6 py-3 text-sm font-medium text-ivory transition-all hover:border-forest/30 hover:bg-charcoal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-forest">
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.22l-1.97 9.28c-.15.68-.54.85-1.09.53l-3.01-2.22-1.45 1.4c-.16.16-.3.3-.61.3l.22-3.05 5.56-5.02c.24-.22-.05-.33-.38-.13L8.69 13.5l-2.93-.91c-.64-.2-.65-.64.13-.95l11.45-4.41c.53-.19 1 .13.83.95l-.23.04z" />
                </svg>
                Telegram
              </a>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Stay Connected / Newsletter */}
      <section className="py-16">
        <Container>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-forest/20 bg-forest/10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-forest">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-ivory">
                  Stay Connected
                </h3>
                <p className="text-xs text-silver">
                  Subscribe for exclusive deals and special offers
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto"
            >
              <div className="relative">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute left-3 top-1/2 -translate-y-1/2 text-ash">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full rounded-lg border border-slate bg-charcoal py-3 pl-10 pr-4 text-sm text-pearl placeholder:text-ash focus:border-forest/50 focus:outline-none sm:w-44"
                />
              </div>
              <div className="relative">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute left-3 top-1/2 -translate-y-1/2 text-ash">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-lg border border-slate bg-charcoal py-3 pl-10 pr-4 text-sm text-pearl placeholder:text-ash focus:border-forest/50 focus:outline-none sm:w-52"
                />
              </div>
              <div className="relative">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute left-3 top-1/2 -translate-y-1/2 text-ash">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full rounded-lg border border-slate bg-charcoal py-3 pl-10 pr-4 text-sm text-pearl placeholder:text-ash focus:border-forest/50 focus:outline-none sm:w-52"
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-forest px-6 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-emerald"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
