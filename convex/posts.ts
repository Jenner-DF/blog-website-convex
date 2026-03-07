import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./betterAuth/auth";
import { Doc } from "./_generated/dataModel";
import { title } from "process";
//v is like zod z.string()...

// interface SearchResultType {
//   _id: string;
//   title: string;
//   body: string;
// }

//search
export const searchPosts = query({
  args: { query: v.string(), limit: v.number() },
  handler: async (ctx, { query, limit }) => {
    // accumulates final results
    // const result: SearchResultType[] = [];
    const result: Doc<"posts">[] = [];

    // tracks which post IDs we've already added (avoids duplicates)
    // e.g. a post matches both title AND body — only add it once
    const seen = new Set();

    // helper function — adds docs to result, skipping duplicates and stopping at limit
    const pushDocs = async (docs: Doc<"posts">[]) => {
      for (const doc of docs) {
        if (seen.has(doc._id)) continue; // already added this post, skip
        seen.add(doc._id); // mark as seen
        result.push({ ...doc });
        if (result.length > limit) break; // reached limit, stop
      }
    };

    // PASS 1 — search by title first (more relevant matches)
    const titleMatches = await ctx.db
      .query("posts")
      .withSearchIndex("search_title", (q) => q.search("title", query))
      .take(limit);
    await pushDocs(titleMatches);

    // PASS 2 — only search body if we still need more results
    // e.g. limit=10, found 6 title matches → search body for 4 more
    if (result.length < limit) {
      const bodyMatches = await ctx.db
        .query("posts")
        .withSearchIndex("search_body", (q) => q.search("body", query))
        .take(limit);
      await pushDocs(bodyMatches); // seen set prevents duplicates
    }

    return await Promise.all(
      result.map(async (post) => ({
        ...post,
        imageId: post.imageId ? await ctx.storage.getUrl(post.imageId) : null,
      })),
    ); // ✅
  },
});

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
