import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Park Street Boys Wholesale",
  tagline: "Premium Wholesale Products",
  description:
    "Premium wholesale distribution. Competitive pricing, fast delivery, and a curated catalog of top-shelf products across 8 categories.",
  contactEmail: "orders@parkstreetboyswholesale.com",
  contactPhone: "(555) 800-7275",
  address: "New York, NY",
  telegramHandle: "parkstreetboysla",
};

// Derived helper — use throughout the app instead of hardcoding the URL
export const TELEGRAM_HANDLE = siteConfig.telegramHandle;
export const TELEGRAM_URL = "https://t.me/+dWnRfVfuuqllNGRk";
export const telegramUrlWithText = (text: string) =>
  `https://t.me/+dWnRfVfuuqllNGRk?text=${encodeURIComponent(text)}`;
