import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "forest" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        variant === "default" && "bg-graphite text-silver",
        variant === "forest" && "bg-forest/15 text-forest",
        variant === "outline" && "border border-slate text-silver",
        className
      )}
    >
      {children}
    </span>
  );
}
