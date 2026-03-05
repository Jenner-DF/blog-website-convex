import { formBlogPostSchema } from "@/app/schemas/blog";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import z from "zod";
//get data from form
//has image && fetching uploadUrl returns imageId
//createblogpost(..data,imageId)
export function useCreateBlogPost() {
  const generateUploadUrl = useMutation(api.posts.generateImageUploadUrl);
  const savePost = useMutation(api.posts.createBlogPost);

  const mutation = async (blog: z.infer<typeof formBlogPostSchema>) => {
    let imageId;
    if (blog.image) {
      // 1. get upload url
      const postUrl = await generateUploadUrl();
      // 2. direct upload using the url
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": blog.image.type },
        body: blog.image,
      });
      if (!result.ok) throw new Error("Failed to upload image");
      //returns the storageId, references your image path
      const { storageId } = await result.json();
      imageId = storageId;
    }
    //add to posts db
    await savePost({
      title: blog.title,
      body: blog.body,
      imageId: imageId ?? undefined,
    });
  };
  return { mutation };
}
