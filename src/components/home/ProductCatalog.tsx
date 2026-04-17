"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CategoryFilter } from "@/components/menu/CategoryFilter";
import { SearchBar } from "@/components/menu/SearchBar";
import { ProductCard } from "@/components/menu/ProductCard";
import { ProductModal } from "@/components/menu/ProductModal";
import { FloatingOrderSummary } from "@/components/menu/FloatingOrderSummary";
import { products } from "@/data/products";
import type { Product, ProductCategory } from "@/types";

type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc";

const PRODUCTS_PER_BATCH = 16;

export function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_BATCH);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_BATCH);
  }, [activeCategory, searchQuery, sortBy]);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.subcategory.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        result = [...result].sort((a, b) => a.unitPrice - b.unitPrice);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.unitPrice - a.unitPrice);
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  // Infinite scroll observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore) {
        setVisibleCount((prev) => prev + PRODUCTS_PER_BATCH);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "400px",
      threshold: 0,
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <section className="py-24 lg:py-32" id="catalog">
      <Container>
        <SectionHeading
          label="Wholesale Catalog"
          title="Our Products"
          subtitle="Browse our complete catalog of premium products. Select items to build your wholesale order."
        />

        {/* Filter Bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="sticky top-[56px] z-30 -mx-4 mb-6 overflow-hidden border-b border-graphite glass-dark backdrop-blur-xl px-4 py-2.5 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          <div className="overflow-x-auto scrollbar-none">
            <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="shrink-0 rounded-lg border border-slate bg-charcoal px-2 py-2 text-[11px] text-silver focus:border-forest/50 focus:outline-none"
            >
              <option value="name-asc">A–Z</option>
              <option value="name-desc">Z–A</option>
              <option value="price-asc">Low–High</option>
              <option value="price-desc">High–Low</option>
            </select>
          </div>
        </motion.div>

        {/* Product Grid */}
        {visibleProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="mb-3 text-4xl">🔍</span>
            <h3 className="font-display text-xl font-semibold text-ivory">
              No Products Found
            </h3>
            <p className="mt-2 text-sm text-silver">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </motion.div>
        )}

        {/* Infinite scroll trigger */}
        {hasMore && (
          <div ref={loaderRef} className="flex justify-center py-12">
            <div className="flex items-center gap-2 text-sm text-ash">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-forest/30 border-t-forest" />
              Loading more products...
            </div>
          </div>
        )}

        {!hasMore && filteredProducts.length > PRODUCTS_PER_BATCH && (
          <p className="mt-8 text-center text-xs text-ash">
            You&apos;ve seen all {filteredProducts.length} products
          </p>
        )}
      </Container>

      <FloatingOrderSummary />

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            key={selectedProduct.id}
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
