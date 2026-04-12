import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Park Street Boys | Official Menu",
  description:
    "View our official wholesale menu. Premium curated exotics and top-shelf selections delivered nationwide. Verified vendor.",
  robots: { index: false, follow: false },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Bare layout — no Navbar, Footer, AgeModal, OrderDrawer, or TelegramChat.
  // The root layout still provides <html>/<body>, fonts, and globals.css.
  return <>{children}</>;
}
