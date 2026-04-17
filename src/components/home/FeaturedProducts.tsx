"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerChild, staggerContainer } from "@/lib/animations";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { useOrder } from "@/context/OrderContext";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { CheckIcon } from "@/components/icons";

const featured = products.filter((p) => p.featured).slice(0, 8);

const categoryIcons: Record<string, string> = {
  lows: "🌿", zaa: "⚡", indoors: "🏠", "exotics-indoors": "💎",
  "snow-cap": "❄️", "moon-rocks": "🌙", shrooms: "🍄", wax: "🔥",
};

function FeaturedCard({ product }: { product: (typeof featured)[0] }) {
  const { addToOrder, isInOrder } = useOrder();
  const inOrder = isInOrder(product.id);
  const [imgError, setImgError] = useState(false);
  const hasRealImage = product.imageUrl && !product.imageUrl.includes("prod-");

  return (
    <motion.div
      variants={staggerChild}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group overflow-hidden rounded-xl border border-graphite glass-dark backdrop-blur-xl transition-colors hover:border-forest/20"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
        {hasRealImage && !imgError ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate">
            <span className="text-2xl opacity-40">
              {categoryIcons[product.category] || "📦"}
            </span>
          </div>
        )}
        <Badge variant="forest" className="absolute top-3 left-3 z-10">
          {product.category}
        </Badge>
      </div>

      <div className="p-4">
        <p className="text-[10px] font-medium uppercase tracking-widest text-ash">
          {product.brand}
        </p>
        <h3 className="mt-1 font-display text-base font-semibold text-ivory line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-0.5 text-xs text-silver">
          {product.volume}
          {product.caseSize > 1 ? ` · Case of ${product.caseSize}` : ""}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-semibold text-forest">
            {formatCurrency(product.unitPrice)}
          </span>
          <button
            onClick={() => addToOrder(product)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              inOrder
                ? "bg-forest/15 text-forest"
                : "bg-graphite text-silver hover:bg-forest hover:text-ivory"
            }`}
          >
            {inOrder ? (
              <span className="flex items-center gap-1">
                <CheckIcon size={12} /> Added
              </span>
            ) : (
              "Add to Order"
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedProducts() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          label="Featured"
          title="Premium Selections"
          subtitle="Handpicked products from our curated wholesale catalog"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featured.map((product) => (
            <FeaturedCard key={product.id} product={product} />
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Button href="/#catalog" variant="outline">
            View Full Catalog
          </Button>
        </div>
      </Container>
    </section>
  );
}
