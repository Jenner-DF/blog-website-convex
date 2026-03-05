import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const formBlogPostSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(10),
  image: z
    .instanceof(File)
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, "Max size is 5MB")
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .png, and .webp formats are supported",
    )
    .or(z.undefined()),
});
