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
            ? "bg-midnight/90 backdrop-blur-xl border-b border-graphite/50 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/logo.webp"
              alt="Park Street Boys"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-contain"
              priority
            />
            <span className="hidden font-display text-lg font-semibold text-ivory sm:block">
              Park Street Boys
            </span>
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
                    className="mt-1 h-px bg-gold"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={openDrawer}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-silver transition-colors hover:bg-graphite hover:text-ivory"
              aria-label="Order summary"
            >
              <ShoppingBagIcon size={20} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-ivory"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-silver transition-colors hover:bg-graphite hover:text-ivory md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
