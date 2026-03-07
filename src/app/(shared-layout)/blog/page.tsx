import type { Metadata } from "next";
import { api } from "../../../../convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import BlogsList from "@/components/web/BlogsList";
import { Suspense } from "react";
import { BlogsListSkeleton } from "@/components/web/BlogsListSkeleton";

export const metadata: Metadata = {
  title: "Blog | Using Convex",
  description: "Read our latest articles and updates",
  category: "Web development",
  authors: [{ name: "Jdefta" }],
};

export default function BlogPage() {
  // await new Promise((res) => setTimeout(res, 2200));
  //prefetch returns a promise, dont await so the page display it will be handled in suspense
  //passing the post as a prop inside the suspense
  const posts = preloadQuery(api.posts.getBlogPosts);
  // useQuery(api.posts)

  return (
    <div className=" py-8">
      <div className="text-center space-y-2 mb-12 ">
        <h1 className="text-4xl font-extrabold sm:text-5xl tracking-tight">
          Our Blog
        </h1>
        <p className="text-muted-foreground max-w-2xl  mx-auto text-xl">
          Insights, thoughts, and trends from our team.
        </p>
      </div>
      <div>
        <Suspense fallback={<BlogsListSkeleton />}>
          {/* <Delay /> */}
          <BlogsList preloadedPosts={posts} />
        </Suspense>
      </div>
    </div>
  );
}
async function Delay() {
  await new Promise((res) => setTimeout(() => res(null), 2000));
  return null;
}
