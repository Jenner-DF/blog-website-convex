import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FunctionReturnType } from "convex/server";
import { api } from "../../../convex/_generated/api";
import { Marquee } from "../ui/marquee";

interface Post {
  _id: string;
  title: string;
  body: string;
  authorName: string;
  imageId: string | null;
}

interface PostMarqueeProps {
  posts: FunctionReturnType<typeof api.posts.getBlogPosts>;
}

export function MarqueePosts({ posts }: PostMarqueeProps) {
  if (!posts || posts.length === 0) return null;

  const displayPosts = posts.length < 5 ? [...posts, ...posts] : posts;

  return (
    // ADD THIS WRAPPER CONTAINER
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden border-y bg-background py-12">
      <Marquee pauseOnHover className="[--duration:40s]">
        {displayPosts.map((post, idx) => (
          <Link
            key={`${post._id}-${idx}`}
            href={`/blog/${post._id}`}
            className="group/card mx-4 flex w-[350px] flex-col justify-between rounded-xl border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md "
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  Latest Story
                </span>
                <span className="text-[10px] text-muted-foreground uppercase">
                  {post.authorName}
                </span>
              </div>

              <h3 className="line-clamp-1 text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
                {post.title}
              </h3>

              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {post.body}
              </p>
            </div>

            <div className="mt-4 flex items-center text-xs font-medium text-primary opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
              Read More →
            </div>
          </Link>
        ))}
      </Marquee>

      {/* Edge Fades - Ensure pointer-events-none is working */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background z-10"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background z-10"></div>
    </div>
  );
}
