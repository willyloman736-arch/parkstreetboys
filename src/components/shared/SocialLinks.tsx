"use client";

import { cn } from "@/lib/utils";

export const socialLinks = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@parkstreet_boys",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1Z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/+6RosP2ItBko2ODFh",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.22l-1.97 9.28c-.15.68-.54.85-1.09.53l-3.01-2.22-1.45 1.4c-.16.16-.3.3-.61.3l.22-3.05 5.56-5.02c.24-.22-.05-.33-.38-.13L8.69 13.5l-2.93-.91c-.64-.2-.65-.64.13-.95l11.45-4.41c.53-.19 1 .13.83.95l-.23.04z" />
      </svg>
    ),
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@parkstreetboyss",
    icon: (
      <svg width="18" height="18" viewBox="0 0 192 192" fill="currentColor" aria-hidden="true">
        <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.406 4.892 8.115 5.864 14.063-7.321-1.244-15.24-1.626-23.7-1.14-23.825 1.371-39.138 15.271-38.11 34.585.52 9.796 5.4 18.222 13.738 23.726 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.608 96c.2-24.682 5.628-43.966 16.133-57.32 11.215-14.258 28.465-21.573 51.274-21.742 22.974.169 40.524 7.518 52.17 21.847 5.71 7.027 10.013 15.86 12.861 26.175l16.51-4.403c-3.45-12.697-8.877-23.636-16.256-32.692C147.542 9.927 125.683.165 97.079 0h-.113C68.418.165 46.815 9.964 32.83 29.131 20.39 46.182 13.973 69.876 13.771 96L13.77 96l.001.118.003.067C13.977 122.124 20.39 145.82 32.83 162.87c13.985 19.167 35.587 28.966 64.136 29.13h.112c25.35-.148 43.213-6.768 57.946-21.454 19.293-19.213 18.71-43.272 12.35-58.037-4.56-10.583-13.258-19.18-25.152-24.866-.095-.229-.195-.456-.3-.68zm-42.306 33.526c-10.437.588-21.286-4.097-21.822-14.16-.398-7.466 5.322-15.797 22.459-16.784 1.964-.113 3.889-.168 5.778-.168 6.199 0 12.012.599 17.244 1.744-1.95 24.334-13.412 28.954-23.659 29.368z" />
      </svg>
    ),
  },
  {
    label: "Potato",
    href: "https://tutuduanyu.org/parkstreetboyswholesale",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

function VerifiedTick({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Verified"
      className="shrink-0"
    >
      <path
        d="M12 1l2.39 2.42L17.5 3l.42 3.12L21 8.5l-1.42 2.89L21 14.28l-3.08 2.38L17.5 19.78l-3.11.42L12 22.62l-2.39-2.42L6.5 19.78l-.42-3.12L3 14.28l1.42-2.89L3 8.5l3.08-2.38L6.5 3l3.11-.42L12 1z"
        fill="#1D9BF0"
        stroke="#1D9BF0"
        strokeWidth="0.5"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface SocialLinksProps {
  className?: string;
  iconSize?: "sm" | "md";
  showLabels?: boolean;
}

export function SocialLinks({
  className,
  iconSize = "md",
  showLabels = false,
}: SocialLinksProps) {
  const sizeClass = iconSize === "sm" ? "h-8 w-8" : "h-10 w-10";

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.label} (verified)`}
          className={cn(
            "group flex items-center gap-1.5 transition-all",
            showLabels && "rounded-lg border border-forest/20 bg-black/40 px-3 py-2 text-xs font-medium text-silver hover:border-forest/50 hover:bg-forest/15 hover:text-ivory",
          )}
        >
          <span
            className={cn(
              "flex items-center justify-center rounded-full border text-silver transition-all group-hover:text-ivory",
              showLabels
                ? "border-transparent bg-transparent group-hover:text-ivory"
                : "border-forest/20 bg-black/40 group-hover:border-forest/50 group-hover:bg-forest/15",
              !showLabels && sizeClass,
            )}
          >
            {link.icon}
          </span>
          {showLabels && <span>{link.label}</span>}
          <VerifiedTick size={showLabels ? 14 : 14} />
        </a>
      ))}
    </div>
  );
}
