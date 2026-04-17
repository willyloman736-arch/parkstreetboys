"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { slideInLeft, fadeIn } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { XIcon, VerifiedBadgeIcon } from "@/components/icons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#catalog", label: "Menu" },
  { href: "/blog", label: "Blog" },
  { href: "/verified", label: "Verified", hasVerifiedBadge: true },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />
          <motion.nav
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 bottom-0 z-50 w-72 glass-dark backdrop-blur-xl border-r border-graphite p-6 md:hidden"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-ivory">
                Navigation
              </span>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-silver hover:text-ivory"
                aria-label="Close menu"
              >
                <XIcon size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "flex aspect-square flex-col items-center justify-center rounded-xl border text-sm font-medium transition-all",
                    pathname === link.href
                      ? "border-forest/40 bg-forest/10 text-forest"
                      : "border-graphite bg-black/30 text-silver hover:border-forest/30 hover:bg-forest/5 hover:text-ivory"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.hasVerifiedBadge && <VerifiedBadgeIcon size={16} />}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8 border-t border-graphite pt-6">
              <Link
                href="/#catalog"
                onClick={onClose}
                className="block rounded-lg bg-forest px-4 py-3 text-center text-sm font-semibold text-ivory transition-colors hover:bg-emerald"
              >
                Start Order Request
              </Link>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
