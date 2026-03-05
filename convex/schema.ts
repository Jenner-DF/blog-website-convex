//this is now the tables/schema in the db!
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { tables as betterAuthTables } from "./betterAuth/schema";
export default defineSchema({
  posts: defineTable({
    title: v.string(),
    body: v.string(),
    authorId: v.string(), // ✅ matches what getAuthUser() actually returns
    authorName: v.string(),
    imageId: v.optional(v.id("_storage")),
  }).index("by_author", ["authorId"]),
  comments: defineTable({
    postId: v.id("posts"),
    authorId: v.string(),
    authorName: v.string(),
    body: v.string(),
  }),
});
