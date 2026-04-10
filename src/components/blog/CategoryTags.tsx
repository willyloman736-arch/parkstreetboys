"use client";

import { cn } from "@/lib/utils";
import type { BlogCategory } from "@/types";

interface CategoryTagsProps {
  active: BlogCategory | "all";
  onChange: (category: BlogCategory | "all") => void;
}

const tags: { id: BlogCategory | "all"; label: string }[] = [
  { id: "all", label: "All Posts" },
  { id: "industry-news", label: "Industry News" },
  { id: "product-spotlight", label: "Product Spotlight" },
  { id: "business-tips", label: "Business Tips" },
  { id: "trends", label: "Trends" },
  { id: "events", label: "Events" },
];

export function CategoryTags({ active, onChange }: CategoryTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onChange(tag.id)}
          className={cn(
            "rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300",
            active === tag.id
              ? "bg-gold text-ivory"
              : "border border-slate bg-transparent text-silver hover:border-gold/40 hover:text-ivory"
          )}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
}
