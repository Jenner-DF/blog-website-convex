"use client";
import {
  Preloaded,
  usePaginatedQuery,
  usePreloadedQuery,
  useQuery,
} from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import { useDebounce } from "use-debounce";
import { BlogsListSkeleton } from "./BlogsListSkeleton";
import { ArrowBigUp, ArrowUp, ArrowUpNarrowWide } from "lucide-react";

export default function BlogsList({
  userId = undefined,
  // preloadedPosts,
}: {
  userId: string | undefined;
  // preloadedPosts: Promise<Preloaded<typeof api.posts.getBlogPosts>>;
}) {
  //using use() can bypass using await, as it unwraps a promise, needs <suspense>!
  // const posts = usePreloadedQuery(use(preloadedPosts));

  //using paginated query for infinite scroll instead of preload
  const {
    results: posts,
    status,
    loadMore,
    isLoading,
  } = usePaginatedQuery(
    api.posts.getBlogPaginatedPosts,
    { userId },
    { initialNumItems: 8 },
  );

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1500);
  // ✅ search = separate, "skip" when empty
  const searchResults = useQuery(
    api.posts.searchPosts,
    search ? { query: debouncedSearch, limit: 10 } : "skip",
  );

  //for infinite scrolling
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && status === "CanLoadMore") {
          loadMore(8); // ✅ load more when bottom is visible
        }
      },
      { threshold: 0.1 },
    );

    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [status, loadMore]);

  // ✅ switch between them search results and current posts
  const isSearching = !!debouncedSearch && searchResults === undefined;
  const displayPosts = debouncedSearch ? searchResults : posts;
  if (posts.length === 0 && !isLoading)
    return (
      <div className="text-center space-y-4 py-12">
        <p>No posts found.</p>
        <Link
          href={"/create"}
          className={buttonVariants({ variant: "outline" })}
        >
          Create a new blog
        </Link>
      </div>
    );

  return (
    <>
      {/* search */}
      <div className="w-sm md:w-md mx-auto">
        <Input
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isSearching ? (
        <BlogsListSkeleton /> // ✅ show while searching
      ) : displayPosts?.length === 0 ? (
        <div className="text-center space-y-4 py-12">
          <p>No posts found</p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ">
            {displayPosts?.map((post) => (
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
                  <p className="text-xs text-muted-foreground">
                    {post.authorName}
                  </p>
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
          {/* invisible div at bottom — triggers loadMore when visible */}

          <div ref={bottomRef} className="h-1" />
          {status === "LoadingMore" && !isSearching && <BlogsListSkeleton />}
          {status === "Exhausted" && !isSearching && (
            <div className="flex items-center justify-center gap-4">
              <p className="text-center">No more posts. </p>
              <div className="flex items-center justify-center">
                <Link
                  href={"#top"}
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ smooth scroll to top
                  }}
                  className={`${buttonVariants({ variant: "outline" })}`}
                >
                  Go up <ArrowBigUp className="size-6 border rounded-full" />
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
