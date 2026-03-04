import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./betterAuth/auth";
import { Id } from "./betterAuth/_generated/dataModel";
//v is like zod z.string()...

// convex/posts.ts
export const createBlogPost = mutation({
  args: { title: v.string(), body: v.string() },
  handler: async (ctx, args) => {
    const authUser = await authComponent.getAuthUser(ctx);

    await ctx.db.insert("posts", {
      title: args.title,
      body: args.body,
      authorId: authUser._id,
    });
  },
});

export const getBlogPosts = query({
  args: {},
  async handler(ctx) {
    const posts = await ctx.db.query("posts").order("desc").collect();
    return posts;
  },
});
