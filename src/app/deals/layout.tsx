import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exclusive Deals | Pack Street Boys",
  description:
    "Limited-time wholesale deals on premium exotics. Verified vendor — shop exclusive drops before they sell out.",
  robots: { index: false, follow: false },
};

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
