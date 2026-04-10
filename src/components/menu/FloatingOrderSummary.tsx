"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useOrder } from "@/context/OrderContext";
import { formatCurrency } from "@/lib/utils";
import { ShoppingBagIcon } from "@/components/icons";

export function FloatingOrderSummary() {
  const { totalItems, totalCost, openDrawer } = useOrder();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-gold/20 bg-charcoal/95 backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBagIcon size={20} className="text-gold" />
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-ivory">
                  {totalItems}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-ivory">
                  {totalItems} {totalItems === 1 ? "item" : "items"} selected
                </p>
                <p className="text-xs text-silver">
                  Estimated total: {formatCurrency(totalCost)}
                </p>
              </div>
            </div>

            <button
              onClick={openDrawer}
              className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-ivory transition-colors hover:bg-champagne"
            >
              Review Order
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
