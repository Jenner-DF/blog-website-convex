import z from "zod";

export const formLoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(2, "min 2"),
});

export const formSignupSchema = z
  .object({
    username: z.string().min(2, "min 2 chars").max(10, "max 10 chars only"),
    email: z.email("Invalid email address"),
    password: z.string().min(2, "min 2"),
    confirm: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
