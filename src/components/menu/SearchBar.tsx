"use client";

import { useRef } from "react";
import { SearchIcon, XIcon } from "@/components/icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasValue = value.length > 0;

  const handleClear = () => {
    onChange("");
    // Return focus so the user can keep typing
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <SearchIcon
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ash"
      />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg glass-input py-2.5 pl-10 pr-9 text-sm text-pearl placeholder:text-ash transition-colors focus:border-forest/50 focus:outline-none sm:w-64"
      />
      {hasValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-ash transition-colors hover:bg-graphite hover:text-ivory focus:bg-graphite focus:text-ivory focus:outline-none"
        >
          <XIcon size={14} />
        </button>
      )}
    </div>
  );
}
