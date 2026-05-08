"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { SocialLinks } from "@/components/shared/SocialLinks";

const TELEGRAM_LINK = "https://t.me/+dWnRfVfuuqllNGRk";
const POTATO_LINK = "https://tutuduanyu.org/parkstreetboyswholesale";
const META_PIXEL_ID = ""; // ← paste your Meta Pixel ID here

// Top-tier products to feature as "deals"
const dealProducts = products
  .filter((p) => p.imageUrl && !p.imageUrl.includes("prod-") && p.featured)
  .slice(0, 6);

/* ---------- Starfield canvas ---------- */
function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;

    interface Star {
      x: number;
      y: number;
      r: number;
      baseAlpha: number;
      alpha: number;
      speed: number;
      phase: number;
    }

    let stars: Star[] = [];

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * 2 * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "200vh";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    };

    const initStars = () => {
      const count = Math.floor((window.innerWidth * window.innerHeight * 2) / 2500);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 2,
        r: Math.random() * 1.4 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.2,
        alpha: 0,
        speed: Math.random() * 0.8 + 0.3,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    let t = 0;
    const draw = () => {
      t += 0.01;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight * 2);

      for (const s of stars) {
        s.alpha = s.baseAlpha * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}

/* ---------- Helpers ---------- */
function trackEvent(eventName: string) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName);
  }
}

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n);
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/* ---------- Page ---------- */
export default function DealsPage() {
  useEffect(() => {
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
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleCTAClick = () => {
    trackEvent("Lead");
    window.open(TELEGRAM_LINK, "_blank");
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#020205]">
      {/* Starfield */}
      <Starfield />

      {/* Subtle top glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 z-[1] h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(ellipse,rgba(45,106,79,0.08),transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center px-4 py-12 sm:py-16">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/logo.webp"
            alt="Pack Street Boys"
            width={72}
            height={72}
            className="h-18 w-18 rounded-full object-contain"
            priority
          />
        </motion.div>

        {/* Verified badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
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

        {/* --- Main Glass Card --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-8"
          style={{
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Headline */}
          <h1 className="text-center font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
            Exclusive Drops
            <br />
            <span className="bg-gradient-to-r from-white/90 via-white/60 to-white/90 bg-clip-text text-transparent">
              Premium Wholesale Deals
            </span>
          </h1>

          <p className="mt-3 text-center text-sm leading-relaxed text-white/60">
            Hand-picked selections at wholesale prices.
            <br className="hidden sm:inline" /> Limited stock — tap below to browse.
          </p>

          {/* CTA Buttons — side by side */}
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
              {/* Glossy shimmer highlight */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-transparent"
              />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="relative z-10">
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.22l-1.97 9.28c-.15.68-.54.85-1.09.53l-3.01-2.22-1.45 1.4c-.16.16-.3.3-.61.3l.22-3.05 5.56-5.02c.24-.22-.05-.33-.38-.13L8.69 13.5l-2.93-.91c-.64-.2-.65-.64.13-.95l11.45-4.41c.53-.19 1 .13.83.95l-.23.04z" />
              </svg>
              <span className="relative z-10">Telegram</span>
            </motion.button>

            {/* Potato — brand green gradient */}
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
              {/* Glossy shimmer highlight */}
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

            {/* Website — premium ivory button (full width) */}
            <motion.a
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              href="https://parkstreetboyswholesale.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("Lead")}
              className="relative col-span-2 flex items-center justify-center gap-2 overflow-hidden rounded-xl py-3.5 text-xs font-bold text-[#0a0a0a] shadow-lg shadow-white/10 transition-all hover:shadow-xl hover:shadow-white/20 sm:rounded-2xl sm:text-sm"
              style={{
                background:
                  "linear-gradient(135deg, #f5f5f0 0%, #e8e8e0 50%, #f5f5f0 100%)",
              }}
            >
              {/* Glossy shimmer highlight */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent"
              />
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative z-10"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="relative z-10">Order on Website</span>
            </motion.a>
          </div>

          {/* Deal cards — 2-column grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mt-6 grid grid-cols-2 gap-2 sm:gap-3"
          >
            {dealProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                className="group relative aspect-square overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03]"
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-1.5 left-2 right-2">
                  <span className="text-[9px] font-medium leading-tight text-white/80 line-clamp-1 sm:text-[10px]">
                    {product.name}
                  </span>
                  <span className="text-[8px] font-bold text-white/50">
                    {formatPrice(product.unitPrice)}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

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

          <p className="mt-3 text-center text-[10px] text-white/30">
            Tap a button above to browse our full menu
          </p>
        </motion.div>

        {/* --- Trust Signals Glass Card --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 w-full rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-6"
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
                title: "Discreet",
                sub: "Secure shipping",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-1.5 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/60">
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
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
            Our Official Channels
          </p>
          <SocialLinks iconSize="sm" className="justify-center" />
          <p className="mt-2 text-center text-[10px] text-white/20">
            &copy; {new Date().getFullYear()} Pack Street Boys Wholesale
          </p>
        </motion.div>
      </div>
    </div>
  );
}
