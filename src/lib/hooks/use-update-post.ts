import {
  formBlogPostSchema,
  updateFormBlogPostSchema,
} from "@/app/schemas/blog";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import z from "zod";
import { Id } from "../../../convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { FunctionReturnType } from "convex/server";
//get data from form
//has image && fetching uploadUrl returns imageId
//createblogpost(..data,imageId)

export function useUpdateBlogPost(
  post: FunctionReturnType<typeof api.posts.getBlogPostById>,
) {
  // ✅ pass post in
  const generateUploadUrl = useMutation(api.posts.generateImageUploadUrl);
  const updatePost = useMutation(api.posts.updateBlogPost);

  const mutation = async (blog: z.infer<typeof updateFormBlogPostSchema>) => {
    // ✅ use from parameter, no query needed

    if ((post.imageId && !blog.image) || !blog.image) {
      return await updatePost({
        postId: blog.postId,
        title: blog.title,
        body: blog.body,
      });
    }
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": blog.image.type },
      body: blog.image,
    });
    if (!result.ok) throw new Error("Failed to upload image");
    const { storageId } = await result.json();
    const imageId = storageId;
    await updatePost({
      postId: blog.postId,
      title: blog.title,
      body: blog.body,
      imageId: imageId ?? undefined,
    });
  };

  return { mutation };
}
