"use client";

import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-slate bg-charcoal",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="flex h-8 w-8 items-center justify-center text-silver transition-colors hover:text-ivory disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg width="12" height="2" viewBox="0 0 12 2" fill="none">
          <path d="M0 1h12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <span className="flex h-8 min-w-[2rem] items-center justify-center border-x border-slate text-sm font-medium text-ivory">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-8 w-8 items-center justify-center text-silver transition-colors hover:text-ivory disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}
