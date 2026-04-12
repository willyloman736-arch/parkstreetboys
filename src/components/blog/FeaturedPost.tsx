"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { Badge } from "@/components/shared/Badge";
import { ClockIcon } from "@/components/icons";
import type { BlogPost } from "@/types";

interface FeaturedPostProps {
  post: BlogPost;
}

const categoryLabels: Record<string, string> = {
  "industry-news": "Industry News",
  "product-spotlight": "Product Spotlight",
  "business-tips": "Business Tips",
  trends: "Trends",
  events: "Events",
};

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-2xl border border-graphite bg-charcoal"
    >
      <div className="grid gap-0 md:grid-cols-2">
        {/* Image placeholder */}
        <div className="relative aspect-[16/10] overflow-hidden bg-graphite md:aspect-auto md:min-h-[360px]">
          <div className="flex h-full items-center justify-center">
            <span className="text-xs uppercase tracking-widest text-slate">
              Featured Cover Image
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-charcoal/30 md:block hidden" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="mb-4 flex items-center gap-3">
            <Badge variant="forest">Featured</Badge>
            <Badge variant="outline">
              {categoryLabels[post.category] || post.category}
            </Badge>
          </div>

          <h2 className="font-display text-2xl font-semibold text-ivory leading-tight sm:text-3xl">
            {post.title}
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-silver line-clamp-3">
            {post.excerpt}
          </p>

          <div className="mt-6 flex items-center gap-4 text-xs text-ash">
            <span>{post.author}</span>
            <span className="h-1 w-1 rounded-full bg-slate" />
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate" />
            <span className="flex items-center gap-1">
              <ClockIcon size={12} /> {post.readTimeMinutes} min read
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
