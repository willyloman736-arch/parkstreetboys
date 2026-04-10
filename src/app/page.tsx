import { HeroSection } from "@/components/home/HeroSection";
import { ProductCatalog } from "@/components/home/ProductCatalog";
import { ValueProps } from "@/components/home/ValueProps";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TrustSection } from "@/components/home/TrustSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductCatalog />
      <ValueProps />
      <ProcessSection />
      <TrustSection />
      <FinalCTA />
    </>
  );
}
