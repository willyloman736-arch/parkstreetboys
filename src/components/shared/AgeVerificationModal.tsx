"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { scaleIn, fadeIn } from "@/lib/animations";

const STORAGE_KEY = "psb_age_verified";

export function AgeVerificationModal() {
  const [show, setShow] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem(STORAGE_KEY);
    if (verified !== "true") {
      setShow(true);
      document.documentElement.style.overflow = "hidden";
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setShow(false);
    document.documentElement.style.overflow = "";
  };

  const handleDeny = () => {
    setDenied(true);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight/95 backdrop-blur-xl"
        >
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mx-4 w-full max-w-md rounded-2xl border border-graphite bg-charcoal p-8 text-center shadow-2xl sm:p-10"
          >
            {/* Logo / Brand */}
            <div className="mb-6">
              <Image
                src="/images/logo.webp"
                alt="Park Street Boys"
                width={72}
                height={72}
                className="mx-auto mb-4 h-[72px] w-[72px] rounded-full object-contain"
                priority
              />
              <h2 className="font-display text-2xl font-semibold text-ivory sm:text-3xl">
                Age Verification
              </h2>
              <div className="mx-auto mt-3 h-px w-16 bg-gold/40" />
            </div>

            {!denied ? (
              <>
                <p className="mb-8 text-silver">
                  You must be 21 years of age or older to access this site.
                  Please confirm your age to continue.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <button
                    onClick={handleConfirm}
                    className="flex-1 rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold text-ivory transition-colors hover:bg-champagne"
                  >
                    Yes, I Am 21+
                  </button>
                  <button
                    onClick={handleDeny}
                    className="flex-1 rounded-lg border border-slate bg-transparent px-6 py-3.5 text-sm font-medium text-silver transition-colors hover:border-pearl hover:text-ivory"
                  >
                    No, I Am Not
                  </button>
                </div>

                <p className="mt-6 text-xs text-ash">
                  By entering this site, you agree to our Terms of Service and
                  acknowledge our Privacy Policy.
                </p>
              </>
            ) : (
              <div>
                <p className="mb-6 text-silver">
                  We&apos;re sorry, but you must be 21 years of age or older to
                  access this website.
                </p>
                <p className="text-sm text-ash">
                  If you believe this is an error, please contact us at{" "}
                  <span className="text-gold">
                    orders@parkstreetboyswholesale.com
                  </span>
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
