import { fetchQuery, preloadQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import BlogPost from "@/components/web/BlogPost";
import CommentsSection from "@/components/web/Comments";
import { Separator } from "@/components/ui/separator";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ postId: Id<"posts"> }>;
}) {
  const { postId } = await params;
  //preload can promise.all
  const [post, preloadedComments] = await Promise.all([
    fetchQuery(api.posts.getBlogPostById, { postId }),
    preloadQuery(api.comments.getCommentsByPost, {
      postId: postId,
    }),
  ]);

  if (!post) return <div>No post found. go back</div>;
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div>
        <BlogPost post={post}></BlogPost>
      </div>
      <Separator className="my-8" />
      <div>
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">
            Comments
          </h1>
        </div>
        <div>
          <CommentsSection preloadedComments={preloadedComments} />
        </div>
      </div>
    </div>
  );
}
