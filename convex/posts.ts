import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./betterAuth/auth";
//v is like zod z.string()...

// convex/posts.ts
export const createBlogPost = mutation({
  args: {
    title: v.string(),
    body: v.string(),
    imageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const authUser = await authComponent.getAuthUser(ctx);

    await ctx.db.insert("posts", {
      title: args.title,
      body: args.body,
      authorId: authUser._id,
      authorName: authUser.name,
      imageId: args.imageId ?? undefined,
    });
  },
});

export const getBlogPostById = query({
  args: { postId: v.id("posts") },
  async handler(ctx, args) {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_id", (q) => q.eq("_id", args.postId))
      .unique();
    if (!post) throw new Error("No post found");
    return {
      ...post,
      imageId: post.imageId ? await ctx.storage.getUrl(post.imageId) : null,
    };
  },
});

export const getBlogPosts = query({
  args: {},
  async handler(ctx) {
    const posts = await ctx.db.query("posts").order("desc").collect();

    return Promise.all(
      posts.map(async (post) => ({
        ...post,
        imageId: post.imageId ? await ctx.storage.getUrl(post.imageId) : null,
      })),
    );
    // return {...posts, };
  },
});

//IMAGE upload
//part 1 - generate upload url
export const generateImageUploadUrl = mutation({
  args: {},
  async handler(ctx) {
    await authComponent.getAuthUser(ctx); //auto throws error

    return await ctx.storage.generateUploadUrl();
  },
});

export const getUser = query({
  args: {},
  async handler(ctx) {
    return await authComponent.getAuthUser(ctx);
  },
});
//part 2 - using url in part 1, make a POST req with the file attach, returns storageId (sending req from a client not a server/server actions!)
//part 3 - UPDATE the imgUrl property to the specified doc in db

//in getting the url: after querying, return the doc and await getUrl the storageId

//isolated if want to update image only, but i think not needed if u want to update all parts of doc, include those
export const updateImageIdToDocDB = mutation({
  args: {
    storageId: v.id("_storage"),
    title: v.string(),
    docId: v.id("posts"),
  },
  async handler(ctx, args) {
    await ctx.db.patch("posts", args.docId, { imageId: args.storageId });
  },
});
