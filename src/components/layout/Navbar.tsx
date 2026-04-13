"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOrder } from "@/context/OrderContext";
import { ShoppingBagIcon, MenuIcon, XIcon, VerifiedBadgeIcon } from "@/components/icons";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/verified", label: "Verified", hasVerifiedBadge: true },
];

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, openDrawer } = useOrder();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-dark py-2 sm:py-3"
            : "bg-gradient-to-b from-midnight/60 to-transparent backdrop-blur-sm py-2.5 sm:py-5"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo + brand */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.webp"
              alt="Park Street Boys"
              width={40}
              height={40}
              className="h-8 w-8 rounded-full object-contain sm:h-10 sm:w-10"
              priority
            />
            <div className="flex flex-col">
              <span className="font-display text-[13px] font-semibold leading-tight text-ivory sm:text-lg">
                Park Street Boys
              </span>
              <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-forest sm:hidden">
                Wholesale
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-ivory",
                  pathname === link.href ? "text-ivory" : "text-silver"
                )}
              >
                <span className="flex items-center gap-1.5">
                  {link.label}
                  {link.hasVerifiedBadge && <VerifiedBadgeIcon size={16} />}
                </span>
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="mt-1 h-px bg-forest"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              onClick={openDrawer}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-silver transition-colors hover:border-graphite hover:bg-graphite/50 hover:text-ivory sm:h-10 sm:w-10"
              aria-label="Order summary"
            >
              <ShoppingBagIcon size={18} className="sm:hidden" />
              <ShoppingBagIcon size={20} className="hidden sm:block" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-forest text-[9px] font-bold text-ivory sm:h-5 sm:w-5 sm:text-[10px]"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-silver transition-colors hover:border-graphite hover:bg-graphite/50 hover:text-ivory sm:h-10 sm:w-10 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
