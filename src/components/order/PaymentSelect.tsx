"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOrder } from "@/context/OrderContext";
import { formatCurrency } from "@/lib/utils";
import { ChevronLeftIcon } from "@/components/icons";

type PaymentMethod = "apple-pay" | "cashapp" | "zelle" | "chime" | "crypto";

const paymentMethods: {
  id: PaymentMethod;
  name: string;
  icon: string;
  description: string;
}[] = [
  {
    id: "apple-pay",
    name: "Apple Pay",
    icon: "",
    description: "Pay with Apple Pay",
  },
  {
    id: "cashapp",
    name: "CashApp",
    icon: "$",
    description: "Pay via CashApp",
  },
  {
    id: "zelle",
    name: "Zelle",
    icon: "Z",
    description: "Pay via Zelle transfer",
  },
  {
    id: "chime",
    name: "Chime",
    icon: "C",
    description: "Pay via Chime",
  },
  {
    id: "crypto",
    name: "Bitcoin",
    icon: "₿",
    description: "Pay with BTC — 5% discount",
  },
];

const TELEGRAM_HANDLE = "parkstreetboys";

export function PaymentSelect() {
  const { state, totalItems, totalCost, dispatch } = useOrder();
  const [selected, setSelected] = useState<PaymentMethod | null>(null);

  const isCrypto = selected === "crypto";
  const discount = isCrypto ? totalCost * 0.05 : 0;
  const finalTotal = totalCost - discount;

  const selectedMethod = paymentMethods.find((m) => m.id === selected);

  const buildTelegramMessage = () => {
    const lines: string[] = [];
    lines.push("--- PARK STREET BOYS ORDER ---");
    lines.push("");

    // Contact info
    if (state.customerInfo) {
      lines.push("CONTACT:");
      lines.push(`Name: ${state.customerInfo.contactName}`);
      if (state.customerInfo.businessName)
        lines.push(`Business: ${state.customerInfo.businessName}`);
      lines.push(`Email: ${state.customerInfo.email}`);
      lines.push(`Phone: ${state.customerInfo.phone}`);
      lines.push("");
      lines.push("SHIPPING:");
      lines.push(`${state.customerInfo.street}`);
      lines.push(
        `${state.customerInfo.city}, ${state.customerInfo.state} ${state.customerInfo.zip}`
      );
      if (state.customerInfo.notes)
        lines.push(`Notes: ${state.customerInfo.notes}`);
      lines.push("");
    }

    // Order items
    lines.push("ORDER ITEMS:");
    state.items.forEach((item) => {
      lines.push(
        `- ${item.product.name} x${item.quantity} — ${formatCurrency(item.product.unitPrice * item.quantity)}`
      );
    });
    lines.push("");

    // Totals
    lines.push(`Subtotal: ${formatCurrency(totalCost)}`);
    if (isCrypto) {
      lines.push(`BTC Discount (5%): -${formatCurrency(discount)}`);
    }
    lines.push(`TOTAL: ${formatCurrency(finalTotal)}`);
    lines.push("");

    // Payment
    lines.push(
      `Payment Method: ${selectedMethod?.name}${isCrypto ? " (5% discount applied)" : ""}`
    );
    lines.push("");
    lines.push("Please confirm this order. Thank you!");

    return encodeURIComponent(lines.join("\n"));
  };

  const handleSubmit = () => {
    if (!selected) return;
    const message = buildTelegramMessage();
    const telegramUrl = `https://t.me/${TELEGRAM_HANDLE}?text=${message}`;
    dispatch({ type: "SUBMIT_ORDER" });
    window.open(telegramUrl, "_blank");
  };

  return (
    <div className="flex flex-col h-full">
      <button
        onClick={() => dispatch({ type: "SET_FORM_STEP", isFormStep: true })}
        className="mb-4 flex items-center gap-1 text-xs text-silver hover:text-ivory transition-colors"
      >
        <ChevronLeftIcon size={14} /> Back to Details
      </button>

      <h3 className="mb-1 font-display text-lg font-semibold text-ivory">
        Choose Payment
      </h3>
      <p className="mb-5 text-xs text-silver">
        Select your preferred payment method to complete the order.
      </p>

      {/* Payment options */}
      <div className="flex-1 space-y-2.5 overflow-y-auto">
        {paymentMethods.map((method) => (
          <motion.button
            key={method.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(method.id)}
            className={cn(
              "w-full flex items-center gap-3.5 rounded-xl border p-4 text-left transition-all",
              selected === method.id
                ? "border-gold bg-gold/10"
                : "border-graphite bg-midnight/50 hover:border-slate"
            )}
          >
            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-lg font-bold",
                selected === method.id
                  ? "bg-gold/20 text-gold"
                  : "bg-graphite text-silver"
              )}
            >
              {method.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-ivory">{method.name}</p>
              <p className="text-[11px] text-ash">{method.description}</p>
            </div>
            {method.id === "crypto" && (
              <span className="shrink-0 rounded-full bg-gold/15 px-2.5 py-1 text-[10px] font-semibold text-gold">
                5% OFF
              </span>
            )}
            <div
              className={cn(
                "h-4 w-4 shrink-0 rounded-full border-2 transition-colors",
                selected === method.id
                  ? "border-gold bg-gold"
                  : "border-slate"
              )}
            />
          </motion.button>
        ))}
      </div>

      {/* Total + submit */}
      <div className="mt-4 border-t border-graphite pt-4">
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="text-silver">Subtotal</span>
          <span className="text-ivory">{formatCurrency(totalCost)}</span>
        </div>
        {isCrypto && (
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-gold">BTC Discount (5%)</span>
            <span className="text-gold">-{formatCurrency(discount)}</span>
          </div>
        )}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-ivory">Total</span>
          <span className="text-xl font-bold text-gold">
            {formatCurrency(finalTotal)}
          </span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selected}
          className={cn(
            "w-full rounded-lg py-3.5 text-sm font-semibold transition-all flex items-center justify-center gap-2",
            selected
              ? "bg-gold text-ivory hover:bg-champagne"
              : "bg-graphite text-ash cursor-not-allowed"
          )}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.22l-1.97 9.28c-.15.68-.54.85-1.09.53l-3.01-2.22-1.45 1.4c-.16.16-.3.3-.61.3l.22-3.05 5.56-5.02c.24-.22-.05-.33-.38-.13L8.69 13.5l-2.93-.91c-.64-.2-.65-.64.13-.95l11.45-4.41c.53-.19 1 .13.83.95l-.23.04z" />
          </svg>
          Complete Order via Telegram
        </button>

        <p className="mt-3 text-center text-[10px] text-ash">
          You&apos;ll be redirected to Telegram to confirm your order with @{TELEGRAM_HANDLE}
        </p>
      </div>
    </div>
  );
}
