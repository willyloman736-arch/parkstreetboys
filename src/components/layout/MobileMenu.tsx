"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { slideInLeft, fadeIn } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { XIcon, VerifiedBadgeIcon } from "@/components/icons";

const navLinks = [
  { href: "/", label: "Home" },
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
            className="fixed top-0 left-0 bottom-0 z-50 w-72 glass-dark border-r border-graphite p-6 md:hidden"
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

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                    pathname === link.href
                      ? "bg-forest/10 text-forest"
                      : "text-silver hover:bg-graphite hover:text-ivory"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.hasVerifiedBadge && <VerifiedBadgeIcon size={18} />}
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
