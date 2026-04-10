"use client";

import { SearchIcon } from "@/components/icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <SearchIcon
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-ash"
      />
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate bg-charcoal py-2.5 pl-10 pr-4 text-sm text-pearl placeholder:text-ash transition-colors focus:border-gold/50 focus:outline-none sm:w-64"
      />
    </div>
  );
}
