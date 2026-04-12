"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AgeVerificationModal } from "@/components/shared/AgeVerificationModal";
import { OrderDrawer } from "@/components/order/OrderDrawer";
import { TelegramChat } from "@/components/shared/TelegramChat";

const BARE_ROUTES = ["/go", "/deals"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBare = BARE_ROUTES.some((r) => pathname.startsWith(r));

  if (isBare) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <AgeVerificationModal />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <OrderDrawer />
      <TelegramChat />
    </>
  );
}
