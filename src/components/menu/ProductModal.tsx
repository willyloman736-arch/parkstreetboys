"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { scaleIn, fadeIn } from "@/lib/animations";
import { Badge } from "@/components/shared/Badge";
import { QuantitySelector } from "@/components/shared/QuantitySelector";
import { useOrder } from "@/context/OrderContext";
import { formatCurrency } from "@/lib/utils";
import { XIcon } from "@/components/icons";
import type { Product } from "@/types";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const categoryLabels: Record<string, string> = {
  lows: "Lows",
  zaa: "Zaa",
  indoors: "Indoors",
  "exotics-indoors": "Exotics Indoors",
  "snow-cap": "Snow Cap",
  "moon-rocks": "Moon Rocks",
  shrooms: "Shrooms",
  wax: "Wax",
};

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToOrder, removeFromOrder, updateQuantity, isInOrder, getItemQuantity } =
    useOrder();
  const [mediaMode, setMediaMode] = useState<"photo1" | "photo2" | "video">("photo1");
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  const inOrder = isInOrder(product.id);
  const qty = getItemQuantity(product.id);
  const hasRealImage = product.imageUrl && !product.imageUrl.includes("prod-");
  const hasVideo = !!product.videoUrl;
  const hasSecondImage = !!product.imageUrl2;

  return (
    <AnimatePresence>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      >
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-graphite bg-charcoal shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-midnight/60 backdrop-blur-sm text-silver hover:text-ivory transition-colors"
            aria-label="Close"
          >
            <XIcon size={18} />
          </button>

          <div className="grid md:grid-cols-2">
            {/* Media side */}
            <div className="relative aspect-square md:aspect-auto md:min-h-[400px] bg-graphite overflow-hidden">
              {/* Toggle buttons */}
              {(hasVideo || hasSecondImage) && (
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <button
                    onClick={() => setMediaMode("photo1")}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all ${
                      mediaMode === "photo1"
                        ? "bg-gold text-ivory"
                        : "bg-midnight/50 text-silver hover:text-ivory"
                    }`}
                  >
                    Photo 1
                  </button>
                  {hasSecondImage && (
                    <button
                      onClick={() => setMediaMode("photo2")}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all ${
                        mediaMode === "photo2"
                          ? "bg-gold text-ivory"
                          : "bg-midnight/50 text-silver hover:text-ivory"
                      }`}
                    >
                      Photo 2
                    </button>
                  )}
                  {hasVideo && (
                    <button
                      onClick={() => setMediaMode("video")}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all ${
                        mediaMode === "video"
                          ? "bg-gold text-ivory"
                          : "bg-midnight/50 text-silver hover:text-ivory"
                      }`}
                    >
                      Video
                    </button>
                  )}
                </div>
              )}

              {mediaMode === "video" && hasVideo ? (
                <video
                  src={product.videoUrl}
                  autoPlay
                  controls
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : mediaMode === "photo2" && hasSecondImage ? (
                <Image
                  src={product.imageUrl2!}
                  alt={`${product.name} - angle 2`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : hasRealImage && !imgError ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={() => setImgError(true)}
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-slate">
                  <span className="text-4xl opacity-40">📦</span>
                </div>
              )}
            </div>

            {/* Info side */}
            <div className="flex flex-col p-6 md:p-8">
              {/* Badges */}
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge variant="gold">
                  {categoryLabels[product.category] || product.category}
                </Badge>
                <Badge variant="outline">{product.subcategory}</Badge>
                {product.smellRating && (
                  <Badge variant="outline">
                    Smell: {product.smellRating}/10
                  </Badge>
                )}
              </div>

              {/* Name & brand */}
              <p className="text-[10px] font-medium uppercase tracking-widest text-ash">
                {product.brand} · {product.origin}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-ivory md:text-3xl">
                {product.name}
              </h2>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-silver">
                {product.description}
              </p>

              {/* Details */}
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-ash">
                <span>Volume: {product.volume}</span>
                {product.caseSize > 1 && (
                  <span>Case: {product.caseSize} units</span>
                )}
                <span>Min. Order: {product.minOrder}</span>
              </div>

              {/* Price */}
              <div className="mt-6 rounded-lg border border-graphite bg-midnight/50 p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-gold">
                    {formatCurrency(product.unitPrice)}
                  </span>
                  <span className="text-xs text-ash">per unit</span>
                </div>
              </div>

              {/* Actions */}
              {product.inStock ? (
                <div className="mt-6">
                  {inOrder ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-silver">Quantity:</span>
                        <QuantitySelector
                          value={qty}
                          onChange={(val) => updateQuantity(product.id, val)}
                          min={0}
                        />
                      </div>
                      <div className="flex gap-3">
                        <span className="flex-1 rounded-lg bg-gold/15 py-3 text-center text-sm font-medium text-gold">
                          In Your Order — {formatCurrency(product.unitPrice * qty)}
                        </span>
                        <button
                          onClick={() => removeFromOrder(product.id)}
                          className="rounded-lg border border-slate px-4 py-3 text-xs text-ash hover:border-red-500/50 hover:text-red-400 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToOrder(product)}
                      className="w-full rounded-lg bg-gold py-3.5 text-sm font-semibold text-ivory transition-colors hover:bg-champagne"
                    >
                      Add to Order
                    </button>
                  )}
                </div>
              ) : (
                <div className="mt-6 rounded-lg border border-slate bg-midnight/50 py-3 text-center text-sm text-silver">
                  Currently Out of Stock
                </div>
              )}

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-midnight px-2.5 py-1 text-[10px] text-ash"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
