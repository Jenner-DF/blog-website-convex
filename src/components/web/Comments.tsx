"use client";
import { useParams } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import CommentForm from "./CommentForm";
import { Preloaded, usePreloadedQuery, useQuery } from "convex/react";

export default function CommentsSection({
  preloadedComments,
}: {
  preloadedComments: Preloaded<typeof api.comments.getCommentsByPost>;
}) {
  const { postId } = useParams<{ postId: Id<"posts"> }>();
  // const postComments = useQuery(api.comments.getCommentsByPost, {
  //   postId,
  // });
  const postComments = usePreloadedQuery(preloadedComments);
  return (
    <div className="flex flex-col w-full">
      <div>
        <CommentForm />
      </div>
      <div>
        {postComments &&
          postComments.map((comment) => (
            <div
              key={comment._id}
              className="flex gap-3 py-4 border-b last:border-0"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold shrink-0">
                {comment.authorName[0].toUpperCase()}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">
                    {comment.authorName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment._creationTime).toLocaleDateString(
                      undefined,
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.body}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
