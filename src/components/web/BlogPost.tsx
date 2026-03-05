import { FunctionReturnType } from "convex/server";
import Image from "next/image";
import { api } from "../../../convex/_generated/api";

type BlogPostType = FunctionReturnType<typeof api.posts.getBlogPostById>;

export default async function BlogPost({ post }: { post: BlogPostType }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
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
            <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">
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

        {/* Body */}
        <div className="px-4 ">
          <p className="leading-7 not-first:mt-6">{post.body}</p>
        </div>
      </article>
    </div>
  );
}
