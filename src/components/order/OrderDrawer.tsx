"use client";

import { motion, AnimatePresence } from "framer-motion";
import { slideInRight, fadeIn } from "@/lib/animations";
import { useOrder } from "@/context/OrderContext";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import { OrderItemRow } from "./OrderItemRow";
import { OrderForm } from "./OrderForm";
import { PaymentSelect } from "./PaymentSelect";
import { OrderConfirmation } from "./OrderConfirmation";
import { XIcon } from "@/components/icons";
import { formatCurrency } from "@/lib/utils";

export function OrderDrawer() {
  const {
    state,
    totalItems,
    totalCost,
    closeDrawer,
    updateQuantity,
    removeFromOrder,
    dispatch,
  } = useOrder();

  useBodyScrollLock(state.isDrawerOpen);

  const getTitle = () => {
    if (state.isSubmitted) return "Confirmation";
    if (state.isPaymentStep) return "Payment";
    if (state.isFormStep) return "Order Details";
    return "Your Order";
  };

  return (
    <AnimatePresence>
      {state.isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeDrawer}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-md flex-col border-l border-forest/10 glass-dark shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-graphite px-5 py-4">
              <h2 className="font-display text-lg font-semibold text-ivory">
                {getTitle()}
              </h2>
              <button
                onClick={closeDrawer}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-silver hover:bg-graphite hover:text-ivory transition-colors"
                aria-label="Close"
              >
                <XIcon size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {state.isSubmitted ? (
                <OrderConfirmation />
              ) : state.isPaymentStep ? (
                <PaymentSelect />
              ) : state.isFormStep ? (
                <OrderForm />
              ) : (
                <>
                  {state.items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <span className="mb-3 text-4xl opacity-40">🛒</span>
                      <h3 className="font-display text-lg font-semibold text-ivory">
                        No Items Yet
                      </h3>
                      <p className="mt-2 text-sm text-silver">
                        Browse our catalog and add products to your order.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {state.items.map((item) => (
                        <OrderItemRow
                          key={item.product.id}
                          item={item}
                          onUpdateQuantity={(qty) =>
                            updateQuantity(item.product.id, qty)
                          }
                          onRemove={() => removeFromOrder(item.product.id)}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer (only in item review step with items) */}
            {!state.isSubmitted &&
              !state.isFormStep &&
              !state.isPaymentStep &&
              state.items.length > 0 && (
                <div className="border-t border-graphite p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-silver">
                      {totalItems} {totalItems === 1 ? "item" : "items"}
                    </span>
                    <span className="text-lg font-semibold text-forest">
                      {formatCurrency(totalCost)}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      dispatch({ type: "SET_FORM_STEP", isFormStep: true })
                    }
                    className="w-full rounded-lg bg-forest py-3.5 text-sm font-semibold text-ivory transition-colors hover:bg-emerald"
                  >
                    Continue to Details
                  </button>
                </div>
              )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
