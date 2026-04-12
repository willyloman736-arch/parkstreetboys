"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOrder } from "@/context/OrderContext";
import { CheckIcon } from "@/components/icons";
import { formatCurrency } from "@/lib/utils";

export function OrderConfirmation() {
  const { state, dispatch, totalItems, totalCost } = useOrder();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmReset = () => {
    dispatch({ type: "RESET_ORDER" });
    setShowConfirm(false);
  };

  return (
    <div className="relative flex flex-col items-center text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-forest/30 bg-forest/10"
      >
        <CheckIcon size={36} className="text-forest" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h3 className="font-display text-2xl font-semibold text-ivory">
          Order Request Submitted
        </h3>
        <p className="mt-3 text-sm text-silver">
          Thank you for your inquiry. Our team will review your order and
          contact you within 24 hours.
        </p>

        {state.customerInfo && (
          <div className="mt-6 rounded-lg border border-graphite bg-midnight/50 p-4 text-left">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-ash">
              Contact Details
            </p>
            <p className="text-sm text-ivory">{state.customerInfo.contactName}</p>
            {state.customerInfo.businessName && (
              <p className="text-xs text-silver">{state.customerInfo.businessName}</p>
            )}
            <p className="text-xs text-silver">{state.customerInfo.email}</p>
            <p className="text-xs text-silver">{state.customerInfo.phone}</p>
          </div>
        )}

        <div className="mt-4 rounded-lg border border-graphite bg-midnight/50 p-4 text-left">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-ash">
            Order Summary
          </p>
          <div className="space-y-1.5">
            {state.items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-xs">
                <span className="text-silver">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="text-ivory">
                  {formatCurrency(item.product.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 border-t border-graphite pt-2 flex justify-between">
            <span className="text-xs font-medium text-silver">
              {totalItems} items
            </span>
            <span className="text-sm font-semibold text-forest">
              {formatCurrency(totalCost)}
            </span>
          </div>
        </div>

        <p className="mt-4 text-[10px] text-ash">
          Final pricing and availability will be confirmed by our team. No
          payment has been processed.
        </p>

        <button
          onClick={() => setShowConfirm(true)}
          className="mt-6 rounded-lg border border-slate bg-transparent px-6 py-2.5 text-sm font-medium text-silver transition-colors hover:border-forest hover:text-ivory"
        >
          Start New Order
        </button>
      </motion.div>

      {/* Confirmation dialog */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setShowConfirm(false)}
            className="absolute inset-0 z-10 flex items-center justify-center bg-midnight/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="reset-order-title"
              className="mx-4 max-w-sm rounded-xl border border-graphite bg-charcoal p-6 text-center shadow-2xl"
            >
              <h4
                id="reset-order-title"
                className="font-display text-lg font-semibold text-ivory"
              >
                Start a new order?
              </h4>
              <p className="mt-2 text-xs text-silver">
                This will clear your current order details and all items from
                your cart. This cannot be undone.
              </p>
              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 rounded-lg border border-slate bg-transparent px-4 py-2.5 text-xs font-medium text-silver transition-colors hover:border-forest/40 hover:text-ivory"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReset}
                  className="flex-1 rounded-lg bg-forest px-4 py-2.5 text-xs font-semibold text-ivory transition-colors hover:bg-emerald"
                >
                  Start New Order
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
