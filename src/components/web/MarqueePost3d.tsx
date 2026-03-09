"use client";
import Link from "next/link";
import { FunctionReturnType } from "convex/server";
import { api } from "../../../convex/_generated/api";
import { Marquee } from "../ui/marquee";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { use } from "react";

interface PostMarqueeProps {
  preloadedPosts: Promise<Preloaded<typeof api.posts.getBlogPosts>>;
}

function PostCard({
  title,
  body,
  authorName,
  _id,
}: {
  title: string;
  body: string;
  authorName: string;
  _id: string;
}) {
  return (
    <Link
      href={`/blog/${_id}`}
      className="relative h-fit w-64 cursor-pointer overflow-hidden rounded-xl border p-4
      border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]
      dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-[10px] uppercase">
          <span className="font-bold text-primary">Latest Story</span>
          <span className="text-muted-foreground">{authorName}</span>
        </div>

        <h3 className="line-clamp-1 text-sm font-semibold">{title}</h3>

        <p className="line-clamp-3 text-xs text-muted-foreground">{body}</p>

        <span className="text-xs font-medium text-primary pt-2">
          Read More →
        </span>
      </div>
    </Link>
  );
}

export function MarqueePost3D({ preloadedPosts }: PostMarqueeProps) {
  const posts = usePreloadedQuery(use(preloadedPosts));

  if (!posts || posts.length === 0) return null;

  const firstRow = posts.slice(0, posts.length / 2);
  const secondRow = posts.slice(posts.length / 2);
  const thirdRow = posts.slice(0, posts.length / 2);
  const fourthRow = posts.slice(posts.length / 2);

  return (
    <div className="relative flex h-[500px] w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px] py-20">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:30s]">
          {firstRow.map((post) => (
            <PostCard key={post._id} {...post} />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover vertical className="[--duration:30s]">
          {secondRow.map((post) => (
            <PostCard key={post._id} {...post} />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover vertical className="[--duration:30s]">
          {thirdRow.map((post) => (
            <PostCard key={post._id} {...post} />
          ))}
        </Marquee>

        <Marquee pauseOnHover vertical className="[--duration:30s]">
          {fourthRow.map((post) => (
            <PostCard key={post._id} {...post} />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
