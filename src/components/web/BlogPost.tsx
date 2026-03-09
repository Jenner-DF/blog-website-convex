"use client";
import Image from "next/image";
import { api } from "../../../convex/_generated/api";
import PostPresence from "./PostPresence";
import { Button, buttonVariants } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UpdateBlogPostForm from "./UpdateBlogPostForm";
import { Edit3 } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";
import BlogPostSkeleton from "./BlogPostSkeleton";
import Link from "next/link";

export default function BlogPost({
  userId,
}: {
  // post: FunctionReturnType<typeof api.posts.getBlogPostById>;
  userId: string;
}) {
  const { postId } = useParams<{ postId: Id<"posts"> }>();

  const post = useQuery(api.posts.getBlogPostById, { postId });
  const isOwner = post?.authorId === userId;

  if (post === undefined) return <BlogPostSkeleton />; // loading
  if (post === null)
    return (
      // not found
      <div className="text-center space-y-4 py-12">
        <p>No posts found.</p>
        <Link href="/create" className={buttonVariants({ variant: "outline" })}>
          Create a new blog
        </Link>
      </div>
    );
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {isOwner && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto mb-4 flex items-center gap-2 transition-all hover:bg-accent"
            >
              <Edit3 className="h-4 w-4" />
              Edit Post
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl h-[80vh] flex flex-col p-0 gap-0">
            <div className="p-6 ">
              <DialogTitle className="text-xl font-semibold tracking-tight">
                Edit Blog Post
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Update your post content and metadata. Changes will be reflected
                immediately.
              </DialogDescription>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <UpdateBlogPostForm post={post} />
            </div>
          </DialogContent>
        </Dialog>
      )}

      <article>
        {/* Hero Image */}
        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden mb-10 shadow-xl">
          <Image
            src={post.imageId ?? "/bloglist-placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Title overlay on image */}
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl break-all  font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">
              {post.title}
            </h1>
            <p className="text-white/70 text-sm mt-2">
              By{" "}
              <span className="text-white font-medium">{post.authorName}</span>
              {" · "}
              {new Date(post._creationTime).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <PostPresence postId={post._id} userId={userId} />

        {/* Body */}
        <div className="px-4 ">
          <p className="leading-7 not-first:mt-6">{post.body}</p>
        </div>
      </article>
    </div>
  );
}
