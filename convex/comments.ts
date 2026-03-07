import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";

export const getCommentsByPost = query({
  args: { postId: v.id("posts") },
  async handler(ctx, args) {
    const posts = await ctx.db
      .query("comments")
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .order("desc")
      .collect();
    //then i want the updated auth name and pic (in case he changed) by just posts.author.img but this does not work because nosql
    //we need to have the reference ONLY in a separate table but in convex ('users' table)
    //then we again query and filter only the USERS WHO COMMENTED
    //we now have the array of posts, and users
    //join the 2 array where post.authorId = user.id
    //const addAuthorToPost = posts.map(post => {...post,  {...users.find(user => user.id === post.id)} })
    //return the new array
    //then I found its  NoSQL, read the docs!, no joins, must create  users table if u want to
    return posts;
  },
});

export const createComment = mutation({
  args: {
    body: v.string(),
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const authUser = await authComponent.getAuthUser(ctx);
    if (!authUser) throw new Error("User not authenticated"); //not needed as it throws error; ill use it standard
    await ctx.db.insert("comments", {
      authorId: authUser._id,
      authorName: authUser.name,
      body: args.body,
      postId: args.postId,
    });
  },
});
