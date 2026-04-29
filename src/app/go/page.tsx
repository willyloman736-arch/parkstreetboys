"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { SocialLinks } from "@/components/shared/SocialLinks";

const TELEGRAM_LINK = "https://t.me/+dWnRfVfuuqllNGRk";
const POTATO_LINK = "https://tutuduanyu.org/parkstreetboyswholesale";
const META_PIXEL_ID = ""; // ← paste your Meta Pixel ID here

// Pick 8 products with real images for the preview grid
const featured = products
  .filter((p) => p.imageUrl && !p.imageUrl.includes("prod-"))
  .slice(0, 8);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

function VerifiedBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 1l2.39 2.42L17.5 3l.42 3.12L21 8.5l-1.42 2.89L21 14.28l-3.08 2.38L17.5 19.78l-3.11.42L12 22.62l-2.39-2.42L6.5 19.78l-.42-3.12L3 14.28l1.42-2.89L3 8.5l3.08-2.38L6.5 3l3.11-.42L12 1z"
          fill="#1D9BF0"
          stroke="#1D9BF0"
          strokeWidth="0.5"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-sm font-semibold text-white">Verified Vendor</span>
    </motion.div>
  );
}

function FloatingOrb({
  size,
  color,
  x,
  y,
  delay,
}: {
  size: number;
  color: string;
  x: string;
  y: string;
  delay: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${size * 0.3}px)`,
      }}
      animate={{
        y: [0, -40, 20, -30, 0],
        x: [0, 20, -15, 25, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration: 12 + delay * 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function trackEvent(eventName: string) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName);
  }
}

export default function LandingPage() {
  useEffect(() => {
    // Meta Pixel base code
    if (!META_PIXEL_ID) return;

    const script = document.createElement("script");
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${META_PIXEL_ID}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // noscript fallback
    const noscript = document.createElement("noscript");
    const img = document.createElement("img");
    img.height = 1;
    img.width = 1;
    img.style.display = "none";
    img.src = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`;
    noscript.appendChild(img);
    document.head.appendChild(noscript);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(noscript);
    };
  }, []);

  const handleCTAClick = () => {
    trackEvent("Lead");
    window.open(TELEGRAM_LINK, "_blank");
  };

  return (
    <div className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-[#060d08] px-4 py-12 sm:py-16">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(45,106,79,0.15),transparent)]" />

      {/* Floating orbs */}
      <FloatingOrb size={180} color="rgba(45,106,79,0.35)" x="10%" y="15%" delay={0} />
      <FloatingOrb size={120} color="rgba(64,145,108,0.25)" x="75%" y="10%" delay={1.5} />
      <FloatingOrb size={90} color="rgba(45,106,79,0.3)" x="5%" y="70%" delay={3} />
      <FloatingOrb size={150} color="rgba(64,145,108,0.2)" x="80%" y="65%" delay={2} />
      <FloatingOrb size={60} color="rgba(27,67,50,0.4)" x="50%" y="85%" delay={4} />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/logo.webp"
            alt="Park Street Boys"
            width={72}
            height={72}
            className="h-18 w-18 rounded-full object-contain shadow-lg shadow-forest/20"
            priority
          />
        </motion.div>

        {/* Verified badge */}
        <VerifiedBadge />

        {/* --- Main Glass Card --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-8"
          style={{
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Headline */}
          <h1 className="text-center font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
            View Our Official
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 bg-clip-text text-transparent">
              Wholesale Menu
            </span>
          </h1>

          <p className="mt-3 text-center text-sm leading-relaxed text-white/60">
            Premium curated exotics &amp; top-shelf selections.
            <br className="hidden sm:inline" /> Delivered nationwide — tap below to browse.
          </p>

          {/* CTA Buttons — side by side, highlighted */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {/* Telegram — Telegram blue gradient */}
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCTAClick}
              className="relative flex items-center justify-center gap-2 overflow-hidden rounded-xl py-3.5 text-xs font-bold text-white shadow-lg shadow-[#229ED9]/40 transition-all hover:shadow-xl hover:shadow-[#229ED9]/60 sm:rounded-2xl sm:text-sm"
              style={{
                background:
                  "linear-gradient(135deg, #2AABEE 0%, #229ED9 50%, #0088cc 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-transparent"
              />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="relative z-10">
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.22l-1.97 9.28c-.15.68-.54.85-1.09.53l-3.01-2.22-1.45 1.4c-.16.16-.3.3-.61.3l.22-3.05 5.56-5.02c.24-.22-.05-.33-.38-.13L8.69 13.5l-2.93-.91c-.64-.2-.65-.64.13-.95l11.45-4.41c.53-.19 1 .13.83.95l-.23.04z" />
              </svg>
              <span className="relative z-10">Telegram</span>
            </motion.button>

            {/* Potato — forest green gradient */}
            <motion.a
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              href={POTATO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("Lead")}
              className="relative flex items-center justify-center gap-2 overflow-hidden rounded-xl py-3.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/50 sm:rounded-2xl sm:text-sm"
              style={{
                background:
                  "linear-gradient(135deg, #40916c 0%, #2d6a4f 50%, #1b4332 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent"
              />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span className="relative z-10">Potato</span>
            </motion.a>
          </div>

          {/* Product preview grid */}
          <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3">
            {featured.map((product, i) => (
              <motion.div
                key={product.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="group relative aspect-square overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03]"
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 25vw, 120px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-1 left-1.5 right-1 text-[8px] font-medium leading-tight text-white/80 line-clamp-1 sm:text-[9px]">
                  {product.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { value: "120+", label: "Products" },
              { value: "8", label: "Categories" },
              { value: "50", label: "States" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] py-2.5 text-center backdrop-blur-sm"
              >
                <p className="text-base font-bold text-white sm:text-lg">
                  {stat.value}
                </p>
                <p className="text-[10px] text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-center text-[10px] text-white/30">
            Tap a button above to open our official menu
          </p>
        </motion.div>

        {/* --- Trust Signals Glass Card --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-6"
          style={{
            boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12l2 2 4-4" />
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
                  </svg>
                ),
                title: "Verified",
                sub: "Trusted vendor",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1" y="3" width="15" height="13" rx="2" />
                    <path d="M16 8h4l3 3v5h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                ),
                title: "Nationwide",
                sub: "Fast delivery",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: "Secure",
                sub: "Discreet shipping",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-1.5 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-forest">
                  {item.icon}
                </div>
                <p className="text-xs font-semibold text-white">{item.title}</p>
                <p className="text-[10px] text-white/40">{item.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Socials footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
            Our Official Channels
          </p>
          <SocialLinks iconSize="sm" className="justify-center" />
          <p className="mt-2 text-center text-[10px] text-white/20">
            &copy; {new Date().getFullYear()} Park Street Boys Wholesale
          </p>
        </motion.div>
      </div>
    </div>
  );
}
