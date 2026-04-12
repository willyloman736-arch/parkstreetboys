"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOrder } from "@/context/OrderContext";
import { formatCurrency } from "@/lib/utils";
import { ChevronLeftIcon } from "@/components/icons";
import { TELEGRAM_HANDLE } from "@/data/site-config";

type PaymentMethod = "apple-pay" | "cashapp" | "zelle" | "chime" | "crypto";

function ApplePayLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M7.08 4.65c-.56.65-1.44 1.16-2.32 1.09-.11-.88.32-1.82.82-2.4.56-.65 1.54-1.13 2.34-1.16.09.91-.27 1.82-.84 2.47zm.83 1.24c-1.28-.08-2.38.73-2.99.73-.62 0-1.56-.69-2.58-.67-1.33.02-2.55.77-3.24 1.96-1.38 2.4-.35 5.95.99 7.9.66.96 1.44 2.02 2.48 1.98 1-.04 1.37-.64 2.58-.64 1.2 0 1.54.64 2.58.62 1.07-.02 1.74-.96 2.4-1.92.75-1.1 1.06-2.16 1.08-2.22-.02-.01-2.07-.8-2.09-3.16-.02-1.97 1.61-2.92 1.68-2.96-.92-1.36-2.35-1.51-2.86-1.55l-.03.01z" />
      <path d="M17.15 2.29c.07 0 2.1.01 3.25 1.6-.08.06-1.94 1.13-1.92 3.37.02 2.68 2.35 3.57 2.37 3.58-.02.05-.37 1.27-1.22 2.5-.73 1.07-1.49 2.13-2.69 2.15-1.17.02-1.55-.7-2.89-.7-1.34 0-1.76.68-2.87.72-1.16.04-2.04-1.15-2.78-2.21-1.51-2.18-2.66-6.16-1.11-8.85.77-1.33 2.14-2.18 3.63-2.2 1.13-.02 2.2.76 2.89.76.69 0 1.98-.94 3.34-.8v.08z" />
    </svg>
  );
}

function CashAppLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.59 3.47A5.1 5.1 0 0020.55.42C19.54.15 18.33 0 16.84 0H7.15C5.66 0 4.45.15 3.44.42A5.1 5.1 0 00.42 3.44C.15 4.45 0 5.66 0 7.15v9.69c0 1.49.15 2.7.42 3.71a5.1 5.1 0 003.02 3.02c1.01.27 2.22.42 3.71.42h9.69c1.49 0 2.7-.15 3.71-.42a5.1 5.1 0 003.02-3.02c.27-1.01.42-2.22.42-3.71V7.16c0-1.49-.13-2.7-.4-3.7zm-6.07 4.33l-.72.72a.48.48 0 01-.6.06 5.28 5.28 0 00-2.73-.78c-1.04 0-1.96.25-1.96 1.21 0 .78.65 1.13 1.95 1.56l.71.22c2.02.64 3.34 1.54 3.34 3.55 0 2.25-1.72 3.78-4.39 4.07l.29.73a.48.48 0 01-.45.64h-1.47a.48.48 0 01-.46-.35l-.34-.97c-1.17-.12-2.34-.5-3.21-1.13a.48.48 0 01-.06-.71l.78-.78a.48.48 0 01.63-.06 5.48 5.48 0 003.07 1c1.23 0 2.19-.42 2.19-1.42 0-.77-.58-1.2-2.01-1.67l-.72-.24c-1.84-.59-3.24-1.45-3.24-3.44 0-2.06 1.58-3.63 4.04-3.91l-.26-.66a.48.48 0 01.44-.64h1.47c.21 0 .4.14.46.35l.32.91c1 .13 1.87.44 2.6.91a.48.48 0 01.07.68z" />
    </svg>
  );
}

function ZelleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.559 24h-2.841a.483.483 0 01-.483-.483v-6.765H4.487a.483.483 0 01-.369-.793L14.09.376A.483.483 0 0114.46.138h2.841a.483.483 0 01.483.483v6.765h5.749a.483.483 0 01.369.793L13.928 23.762a.483.483 0 01-.369.238zM6.35 15.269h5.404a.483.483 0 01.483.483v5.283L17.93 8.869h-5.404a.483.483 0 01-.483-.483V3.103L6.35 15.27z" />
    </svg>
  );
}

function ChimeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-1.478 1.265-3.385 1.94-5.523 1.94-2.006 0-3.766-.6-5.092-1.737a.4.4 0 01-.054-.555l.936-1.18a.4.4 0 01.575-.066c.974.84 2.27 1.303 3.648 1.303 1.498 0 2.786-.462 3.735-1.274.956-.82 1.48-1.94 1.48-3.165 0-1.224-.524-2.344-1.48-3.164-.949-.812-2.237-1.274-3.735-1.274-1.379 0-2.674.463-3.648 1.303a.4.4 0 01-.575-.066l-.936-1.18a.4.4 0 01.054-.555c1.326-1.136 3.086-1.737 5.092-1.737 2.138 0 4.045.675 5.523 1.94 1.503 1.287 2.329 3.046 2.329 4.953 0 1.908-.826 3.667-2.329 4.954z" />
    </svg>
  );
}

function BitcoinLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.638 14.904c-1.602 6.425-8.113 10.34-14.542 8.735C2.67 22.034-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.546zm-6.35-1.15c.24-1.59-.974-2.45-2.63-3.02l.538-2.157-1.313-.328-.524 2.1a53.26 53.26 0 00-1.05-.248l.528-2.114-1.312-.328-.537 2.155c-.285-.065-.565-.13-.837-.197l.001-.007-1.812-.452-.35 1.403s.974.224.954.237c.532.133.628.486.612.766l-.613 2.46c.037.01.084.023.137.045l-.14-.035-.86 3.447c-.065.161-.23.404-.602.312.013.02-.955-.238-.955-.238l-.652 1.502 1.71.427c.318.08.63.163.937.242l-.542 2.18 1.312.327.537-2.157c.356.097.702.186 1.04.27l-.535 2.143 1.313.328.542-2.175c2.236.423 3.917.253 4.625-1.77.57-1.63-.028-2.57-1.206-3.18.858-.198 1.504-.762 1.676-1.928zm-3 4.22c-.404 1.628-3.14.748-4.028.527l.72-2.883c.887.222 3.728.66 3.308 2.356zm.406-4.246c-.37 1.48-2.646.728-3.385.544l.652-2.613c.74.185 3.117.53 2.733 2.07z" />
    </svg>
  );
}

interface PaymentMethodConfig {
  id: PaymentMethod;
  name: string;
  logo: React.FC<{ className?: string }>;
  color: string;
  description: string;
}

const paymentMethods: PaymentMethodConfig[] = [
  {
    id: "apple-pay",
    name: "Apple Pay",
    logo: ApplePayLogo,
    color: "#fff",
    description: "Pay with Apple Pay",
  },
  {
    id: "cashapp",
    name: "CashApp",
    logo: CashAppLogo,
    color: "#00D632",
    description: "Pay via CashApp",
  },
  {
    id: "zelle",
    name: "Zelle",
    logo: ZelleLogo,
    color: "#6C1CD3",
    description: "Pay via Zelle transfer",
  },
  {
    id: "chime",
    name: "Chime",
    logo: ChimeLogo,
    color: "#00D54B",
    description: "Pay via Chime",
  },
  {
    id: "crypto",
    name: "Bitcoin",
    logo: BitcoinLogo,
    color: "#F7931A",
    description: "Pay with BTC — 5% discount",
  },
];

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
    // buildTelegramMessage returns an already-encoded string
    const telegramUrl = `https://t.me/${TELEGRAM_HANDLE}?text=${buildTelegramMessage()}`;
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
                ? "border-forest bg-forest/10"
                : "border-graphite bg-midnight/50 hover:border-slate"
            )}
          >
            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg",
                selected === method.id
                  ? "bg-forest/20"
                  : "bg-graphite"
              )}
              style={{ color: selected === method.id ? method.color : "#9ca3af" }}
            >
              <method.logo className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-ivory">{method.name}</p>
              <p className="text-[11px] text-ash">{method.description}</p>
            </div>
            {method.id === "crypto" && (
              <span className="shrink-0 rounded-full bg-forest/15 px-2.5 py-1 text-[10px] font-semibold text-forest">
                5% OFF
              </span>
            )}
            <div
              className={cn(
                "h-4 w-4 shrink-0 rounded-full border-2 transition-colors",
                selected === method.id
                  ? "border-forest bg-forest"
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
            <span className="text-forest">BTC Discount (5%)</span>
            <span className="text-forest">-{formatCurrency(discount)}</span>
          </div>
        )}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-ivory">Total</span>
          <span className="text-xl font-bold text-forest">
            {formatCurrency(finalTotal)}
          </span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selected}
          className={cn(
            "w-full rounded-lg py-3.5 text-sm font-semibold transition-all flex items-center justify-center gap-2",
            selected
              ? "bg-forest text-ivory hover:bg-emerald"
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
