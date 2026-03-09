import type { Metadata } from "next";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import BlogPost from "@/components/web/BlogPost";
import CommentsSection from "@/components/web/Comments";
import { Separator } from "@/components/ui/separator";
import { fetchAuthQuery } from "@/lib/auth-server";
import { redirect } from "next/navigation";
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ postId: Id<"posts"> }>;
}): Promise<Metadata> => {
  const { postId } = await params;
  const post = await fetchQuery(api.posts.getBlogPostById, { postId });
  return { title: `Blog | ${post.title}` };
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ postId: Id<"posts"> }>;
}) {
  const { postId } = await params;
  //preload can promise.all
  const [preloadedComments, userId] = await Promise.all([
    preloadQuery(api.comments.getCommentsByPost, {
      postId: postId,
    }),
    fetchAuthQuery(api.presence.getUserId),
  ]);
  //in ts it shows Id<'user'> but its Id<'account'> fuck this shit, idk anymore ,but there is no user table its a betterauth! update: ITS THE CONVEX PROBLEM FUCK THAT SHIT IM NOT USING CONVEX AGAIN(or maybe i will)
  if (!userId) return redirect("/auth/login");
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div>
        <BlogPost userId={userId} />
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
