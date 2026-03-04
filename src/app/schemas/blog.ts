import z from "zod";

export const formBlogPostSchema = z.object({
  title: z.string().min(3).max(50),
  body: z.string().min(10),
});
