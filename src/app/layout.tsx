import type { Metadata } from "next";
import { playfair, inter } from "@/lib/fonts";
import { OrderProvider } from "@/context/OrderContext";
import { AppShell } from "@/components/layout/AppShell";
import { GlassTracker } from "@/components/shared/GlassTracker";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://parkstreetboyswholesale.com"),
  title: {
    default: "Park Street Boys Wholesale | Premium Spirits & Beverage Distribution",
    template: "%s | Park Street Boys Wholesale",
  },
  description:
    "Premium wholesale distribution. Competitive pricing, fast delivery, and a curated catalog of top-shelf products.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Park Street Boys Wholesale",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <OrderProvider>
          <GlassTracker />
          <AppShell>{children}</AppShell>
        </OrderProvider>
      </body>
    </html>
  );
}
