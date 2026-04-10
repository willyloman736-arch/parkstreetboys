"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TELEGRAM_HANDLE = "parkstreetboys";

export function TelegramChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-72 rounded-xl border border-graphite bg-charcoal shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gold/10 border-b border-graphite px-4 py-3">
              <p className="text-sm font-semibold text-ivory">Live Chat</p>
              <p className="text-[11px] text-silver">
                Chat with us on Telegram
              </p>
            </div>

            {/* Body */}
            <div className="p-4">
              <div className="mb-3 rounded-lg bg-midnight/50 p-3">
                <p className="text-xs text-silver">
                  Hey! Need help with your order or have questions about our
                  products? We&apos;re here to help.
                </p>
                <p className="mt-1 text-[10px] text-ash">
                  Typically replies within minutes
                </p>
              </div>

              <a
                href={`https://t.me/${TELEGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-2.5 text-sm font-semibold text-ivory transition-colors hover:bg-champagne"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.22l-1.97 9.28c-.15.68-.54.85-1.09.53l-3.01-2.22-1.45 1.4c-.16.16-.3.3-.61.3l.22-3.05 5.56-5.02c.24-.22-.05-.33-.38-.13L8.69 13.5l-2.93-.91c-.64-.2-.65-.64.13-.95l11.45-4.41c.53-.19 1 .13.83.95l-.23.04z" />
                </svg>
                Open Telegram Chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-lg shadow-gold/20 text-ivory transition-colors hover:bg-champagne"
        aria-label="Live chat"
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.22l-1.97 9.28c-.15.68-.54.85-1.09.53l-3.01-2.22-1.45 1.4c-.16.16-.3.3-.61.3l.22-3.05 5.56-5.02c.24-.22-.05-.33-.38-.13L8.69 13.5l-2.93-.91c-.64-.2-.65-.64.13-.95l11.45-4.41c.53-.19 1 .13.83.95l-.23.04z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
