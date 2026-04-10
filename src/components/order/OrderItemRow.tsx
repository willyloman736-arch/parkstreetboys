"use client";

import { QuantitySelector } from "@/components/shared/QuantitySelector";
import { TrashIcon } from "@/components/icons";
import { formatCurrency } from "@/lib/utils";
import type { OrderItem } from "@/types";

interface OrderItemRowProps {
  item: OrderItem;
  onUpdateQuantity: (qty: number) => void;
  onRemove: () => void;
}

export function OrderItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: OrderItemRowProps) {
  return (
    <div className="flex gap-3 rounded-lg border border-graphite bg-midnight/50 p-3">
      {/* Image placeholder */}
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-graphite text-xs text-ash">
        {item.product.category === "lows"
          ? "🌿"
          : item.product.category === "zaa"
          ? "⚡"
          : item.product.category === "indoors"
          ? "🏠"
          : item.product.category === "exotics-indoors"
          ? "💎"
          : item.product.category === "snow-cap"
          ? "❄️"
          : item.product.category === "moon-rocks"
          ? "🌙"
          : item.product.category === "shrooms"
          ? "🍄"
          : "🔥"}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-medium text-ivory truncate">
              {item.product.name}
            </p>
            <p className="text-[10px] text-ash">
              {item.product.volume} · {formatCurrency(item.product.unitPrice)}/unit
            </p>
          </div>
          <button
            onClick={onRemove}
            className="shrink-0 p-1 text-ash hover:text-red-400 transition-colors"
            aria-label="Remove item"
          >
            <TrashIcon size={14} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <QuantitySelector
            value={item.quantity}
            onChange={onUpdateQuantity}
            min={1}
          />
          <span className="text-sm font-semibold text-gold">
            {formatCurrency(item.product.unitPrice * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
