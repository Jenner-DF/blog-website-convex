import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import BlogsList from "@/components/web/BlogsList";

export default function BlogPage() {
  fetchQuery(api.posts.getBlogPosts); //prefetch
  // useQuery(api.posts)
  return (
    <div>
      <BlogsList />
    </div>
  );
}
