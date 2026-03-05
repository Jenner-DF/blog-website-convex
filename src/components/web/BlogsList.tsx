"use client";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { Button, buttonVariants } from "../ui/button";
export default function BlogsList({
  preloadedPosts,
}: {
  preloadedPosts: Promise<Preloaded<typeof api.posts.getBlogPosts>>;
}) {
  //using use() can bypass using await, as it unwraps a promise, needs <suspense>!
  const posts = usePreloadedQuery(use(preloadedPosts));
  console.log("tite", posts);
  if (posts.length === 0)
    return (
      <div className="text-center space-y-4">
        <p>No posts found.</p>
        <Link
          href={"/create"}
          className={buttonVariants({ variant: "outline" })}
        >
          Create a new blog
        </Link>
      </div>
    );
  // if (!posts) return <h1>No blog posts found.</h1>;
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ">
      {posts?.map((post) => (
        <Card
          key={post._id}
          className="overflow-hidden py-0 gap-0 hover:scale-102 transition-all"
        >
          <div className="relative w-full h-48">
            <Image
              src={post.imageId ?? "/bloglist-placeholder.svg"} // your image url here
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="p-4 space-y-2">
            <p className="text-xs text-muted-foreground">{post.authorName}</p>
            <p className="font-bold text-lg truncate">{post.title}</p>

            <Button
              variant={"link"}
              className="w-full bg-blue-500 text-gray-200  text-xs"
              asChild
            >
              <Link href={`/blog/${post._id}`}>Read more</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
