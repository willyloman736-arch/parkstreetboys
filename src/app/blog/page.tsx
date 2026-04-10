import type { Metadata } from "next";
import { BlogContent } from "@/components/blog/BlogContent";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Expert insights on wholesale buying, product education, industry trends, and business strategies for buyers.",
};

export default function BlogPage() {
  return <BlogContent />;
}
