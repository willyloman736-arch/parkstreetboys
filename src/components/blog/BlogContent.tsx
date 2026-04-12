"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Container } from "@/components/shared/Container";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { BlogCard } from "@/components/blog/BlogCard";
import { CategoryTags } from "@/components/blog/CategoryTags";
import { blogPosts } from "@/data/blog-posts";
import type { BlogCategory } from "@/types";

export function BlogContent() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">(
    "all"
  );

  const featuredPost = blogPosts.find((p) => p.featured);
  const otherPosts = blogPosts.filter((p) => !p.featured);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return otherPosts;
    return otherPosts.filter((p) => p.category === activeCategory);
  }, [activeCategory, otherPosts]);

  return (
    <div className="pt-24 pb-24">
      <Container>
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            Insights & Education
          </span>
          <h1 className="font-display text-3xl font-bold text-ivory sm:text-4xl lg:text-5xl">
            Industry Blog
          </h1>
          <p className="mt-3 max-w-2xl text-base text-silver">
            Expert insights on wholesale buying, product education, industry
            trends, and business strategies for licensed buyers.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <CategoryTags active={activeCategory} onChange={setActiveCategory} />
        </motion.div>

        {/* Featured Post */}
        {featuredPost && activeCategory === "all" && (
          <div className="mb-10">
            <FeaturedPost post={featuredPost} />
          </div>
        )}

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="mb-3 text-4xl">📝</span>
            <h3 className="font-display text-xl font-semibold text-ivory">
              No Posts Found
            </h3>
            <p className="mt-2 text-sm text-silver">
              No articles in this category yet. Check back soon.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
