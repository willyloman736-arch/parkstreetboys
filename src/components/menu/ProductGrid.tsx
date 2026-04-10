"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="mb-3 text-4xl">🔍</span>
        <h3 className="font-display text-xl font-semibold text-ivory">
          No Products Found
        </h3>
        <p className="mt-2 text-sm text-silver">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </motion.div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
