"use client";

import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/types";

interface CategoryFilterProps {
  active: ProductCategory | "all";
  onChange: (category: ProductCategory | "all") => void;
}

const filterOptions: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "All Products" },
  { id: "lows", label: "Lows" },
  { id: "zaa", label: "Zaa" },
  { id: "indoors", label: "Indoors" },
  { id: "exotics-indoors", label: "Exotics Indoors" },
  { id: "snow-cap", label: "Snow Cap" },
  { id: "moon-rocks", label: "Moon Rocks" },
  { id: "shrooms", label: "Shrooms" },
  { id: "wax", label: "Wax" },
];

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex shrink-0 gap-1.5">
      {filterOptions.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={cn(
            "shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium tracking-wide transition-all duration-300 whitespace-nowrap",
            active === opt.id
              ? "bg-gold text-ivory"
              : "border border-slate bg-transparent text-silver hover:border-gold/40 hover:text-ivory"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
