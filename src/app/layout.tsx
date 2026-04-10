import type { Metadata } from "next";
import { playfair, inter } from "@/lib/fonts";
import { OrderProvider } from "@/context/OrderContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AgeVerificationModal } from "@/components/shared/AgeVerificationModal";
import { OrderDrawer } from "@/components/order/OrderDrawer";
import { TelegramChat } from "@/components/shared/TelegramChat";
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
          <AgeVerificationModal />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <OrderDrawer />
          <TelegramChat />
        </OrderProvider>
      </body>
    </html>
  );
}
