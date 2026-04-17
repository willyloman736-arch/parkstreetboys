"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerChild } from "@/lib/animations";
import { Badge } from "@/components/shared/Badge";
import { QuantitySelector } from "@/components/shared/QuantitySelector";
import { Tilt3D } from "@/components/shared/Tilt3D";
import { useOrder } from "@/context/OrderContext";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const categoryIcons: Record<string, string> = {
  lows: "🌿",
  zaa: "⚡",
  indoors: "🏠",
  "exotics-indoors": "💎",
  "snow-cap": "❄️",
  "moon-rocks": "🌙",
  shrooms: "🍄",
  wax: "🔥",
};

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { addToOrder, removeFromOrder, updateQuantity, isInOrder, getItemQuantity } =
    useOrder();
  const isTouch = useIsTouchDevice();
  const inOrder = isInOrder(product.id);
  const qty = getItemQuantity(product.id);
  const [showVideo, setShowVideo] = useState(false);
  const [showSecondImg, setShowSecondImg] = useState(false);
  const [imgError, setImgError] = useState(false);
  const hasRealImage = product.imageUrl && !product.imageUrl.includes("prod-");
  // Hover-driven media previews only make sense with a fine pointer. On touch
  // devices the user should tap to open the modal, not try to hover.
  const hasVideo = !!product.videoUrl && !isTouch;
  const hasSecondImage = !!product.imageUrl2 && !isTouch;

  return (
    <motion.div variants={staggerChild}>
    <Tilt3D
      intensity={isTouch ? 0 : 8}
      scale={isTouch ? 1 : 1.02}
      onClick={onClick}
      className="relative group flex flex-col overflow-hidden rounded-xl border border-graphite glass-dark backdrop-blur-xl transition-colors hover:border-forest/20 cursor-pointer h-full"
    >
      {/* Media area */}
      <div
        className="relative aspect-[4/3] overflow-hidden bg-graphite"
        onMouseEnter={() => {
          if (isTouch) return;
          if (hasVideo) setShowVideo(true);
          else if (hasSecondImage) setShowSecondImg(true);
        }}
        onMouseLeave={() => { setShowVideo(false); setShowSecondImg(false); }}
      >
        {/* Product image or placeholder */}
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
          <div className="flex h-full flex-col items-center justify-center gap-1 text-slate">
            <span className="text-2xl opacity-40">
              {categoryIcons[product.category] || "📦"}
            </span>
            <span className="text-[10px] uppercase tracking-widest">
              {product.brand}
            </span>
          </div>
        )}

        {/* Second image on hover (if no video) */}
        {hasSecondImage && showSecondImg && !hasVideo && (
          <Image
            src={product.imageUrl2!}
            alt={`${product.name} - angle 2`}
            fill
            className="absolute inset-0 object-cover transition-opacity duration-300 z-[1]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}

        {/* Video overlay on hover */}
        {hasVideo && showVideo && (
          <video
            src={product.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5 z-10">
          <Badge variant="forest" className="text-[10px]">
            {product.subcategory}
          </Badge>
          {product.smellRating && (
            <Badge variant="outline" className="text-[10px]">
              {product.smellRating}/10
            </Badge>
          )}
        </div>

        {/* Video indicator */}
        {hasVideo && !showVideo && (
          <div className="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-midnight/60 backdrop-blur-sm z-10">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
              <polygon points="2,0 10,5 2,10" />
            </svg>
          </div>
        )}

        {/* Multi-image indicator */}
        {hasSecondImage && !hasVideo && (
          <div className="absolute top-2.5 right-2.5 flex h-6 items-center gap-1 rounded-full bg-midnight/60 px-2 backdrop-blur-sm z-10">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-[9px] text-white font-medium">2</span>
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-midnight/70 z-10">
            <span className="rounded-full bg-graphite px-3 py-1 text-xs font-medium text-silver">
              Out of Stock
            </span>
          </div>
        )}

        {/* Hover overlay */}
        {product.inStock && !showVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-midnight/0 transition-colors group-hover:bg-midnight/40 z-10">
            <span className="scale-90 rounded-lg bg-forest px-4 py-2 text-xs font-semibold text-ivory opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
              {inOrder ? "In Your Order" : "Quick Add"}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-medium uppercase tracking-widest text-ash">
          {product.brand} · {product.origin}
        </p>
        <h3 className="mt-1 font-display text-sm font-semibold text-ivory line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-silver line-clamp-2">
          {product.description}
        </p>
        <p className="mt-1 text-[10px] text-ash">
          {product.volume}
          {product.caseSize > 1 ? ` · Case of ${product.caseSize}` : ""}
        </p>

        {/* Price + Action */}
        <div className="mt-auto pt-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-forest">
              {formatCurrency(product.unitPrice)}
            </span>
            <span className="text-[10px] text-ash">per unit</span>
          </div>

          {product.inStock && (
            <div className="mt-2.5" onClick={(e) => e.stopPropagation()}>
              {inOrder ? (
                <div className="flex items-center justify-between gap-2">
                  <QuantitySelector
                    value={qty}
                    onChange={(val) => updateQuantity(product.id, val)}
                    min={0}
                  />
                  <button
                    onClick={() => removeFromOrder(product.id)}
                    className="text-xs text-ash hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToOrder(product)}
                  className="w-full rounded-lg border border-slate bg-transparent py-2 text-xs font-medium text-silver transition-all hover:border-forest hover:bg-forest hover:text-ivory"
                >
                  Add to Order
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Tilt3D>
    </motion.div>
  );
}
