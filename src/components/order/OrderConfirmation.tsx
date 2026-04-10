"use client";

import { motion } from "framer-motion";
import { useOrder } from "@/context/OrderContext";
import { CheckIcon } from "@/components/icons";
import { formatCurrency } from "@/lib/utils";

export function OrderConfirmation() {
  const { state, dispatch, totalItems, totalCost } = useOrder();

  return (
    <div className="flex flex-col items-center text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-gold/10"
      >
        <CheckIcon size={36} className="text-gold" />
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
            <span className="text-sm font-semibold text-gold">
              {formatCurrency(totalCost)}
            </span>
          </div>
        </div>

        <p className="mt-4 text-[10px] text-ash">
          Final pricing and availability will be confirmed by our team. No
          payment has been processed.
        </p>

        <button
          onClick={() => dispatch({ type: "RESET_ORDER" })}
          className="mt-6 rounded-lg border border-slate bg-transparent px-6 py-2.5 text-sm font-medium text-silver transition-colors hover:border-gold hover:text-ivory"
        >
          Start New Order
        </button>
      </motion.div>
    </div>
  );
}
