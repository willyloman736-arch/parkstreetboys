"use client";

import { motion } from "framer-motion";
import { staggerChild } from "@/lib/animations";
import { Badge } from "@/components/shared/Badge";
import { ClockIcon } from "@/components/icons";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

const categoryLabels: Record<string, string> = {
  "industry-news": "Industry News",
  "product-spotlight": "Product Spotlight",
  "business-tips": "Business Tips",
  trends: "Trends",
  events: "Events",
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.article
      variants={staggerChild}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-graphite glass-dark backdrop-blur-xl transition-colors hover:border-forest/20"
    >
      {/* Image placeholder */}
      <div className="relative aspect-[16/10] overflow-hidden bg-graphite">
        <div className="flex h-full items-center justify-center">
          <span className="text-[10px] uppercase tracking-widest text-slate">
            Cover Image
          </span>
        </div>
        <Badge variant="forest" className="absolute top-3 left-3 text-[10px]">
          {categoryLabels[post.category] || post.category}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-semibold text-ivory leading-snug line-clamp-2 group-hover:text-forest transition-colors">
          {post.title}
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-silver line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-4 flex items-center gap-3 text-[10px] text-ash">
          <span>{post.author}</span>
          <span className="h-1 w-1 rounded-full bg-slate" />
          <span>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="h-1 w-1 rounded-full bg-slate" />
          <span className="flex items-center gap-1">
            <ClockIcon size={10} /> {post.readTimeMinutes}m
          </span>
        </div>
      </div>
    </motion.article>
  );
}
