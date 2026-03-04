"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";

export default function BlogsList() {
  const posts = useQuery(api.posts.getBlogPosts);
  console.log(posts);

  // if (!posts) return <h1>No blog posts found.</h1>;
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
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ">
        {posts?.map((post) => (
          <Link href={`#`} key={post._id} className="contents">
            <Card className="overflow-hidden py-0">
              <div className="relative w-full h-32">
                <Image
                  src={"https://picsum.photos/id/28/4928/3264"} // your image url here
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4 space-y-2">
                <p className="font-bold text-lg truncate">{post.title}</p>
                <p className="text-sm text-muted-foreground">Author Name</p>
                <p className="text-sm line-clamp-3">{post.body}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
