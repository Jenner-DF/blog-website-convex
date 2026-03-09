# Blog Project — Learnings & Notes

## Key Takeaways

### Convex
- Always resolve storage URLs in the query — never return raw `storageId` to client
- `ctx.db.get(id)` and `ctx.db.patch(id, fields)` — no table name, just the ID
- `collect()` always returns an array, never `null`
- `map` + `async` returns `Promise[]` — always wrap with `Promise.all`
- Use `"skip"` as args to conditionally skip a query
- `patch` only updates fields you pass — it doesn't wipe other fields

### Auth (Better Auth + Convex)
- Use `v.string()` not `v.id()` for cross-component IDs (Better Auth boundary)
- Never spread `betterAuthTables` in schema — causes duplicate tables
- Never trust `userId` from the client — always get it from `authComponent.getAuthUser(ctx)`
- Use `fetchAuthQuery` not `fetchQuery` for authenticated server queries
- Pass cookies in middleware: `req.headers.get("cookie")`

### Data Fetching
- SSR + realtime → `preloadQuery` + `usePreloadedQuery`
- Infinite scroll → `usePaginatedQuery`
- Search → separate `useQuery` with `"skip"` + debounce
- `undefined` = still loading, `null` = confirmed not found — check separately

### File Upload (3-step Convex pattern)
1. `generateUploadUrl` mutation — get upload URL
2. Client POSTs file directly to that URL
3. `updateImageUrlToDB` mutation — save storageId to DB

### JavaScript
- `break` / `continue` don't work in `forEach` — use `for...of`
- `Set` for deduplication — faster than `Array.includes`
- `map` with `async` returns Promises — wrap with `Promise.all`
- Debounce search inputs — fire query only when user stops typing

### Git
- Commit every time something works
- `git stash` before any reset or experiment
- `git reset --hard` only removes uncommitted changes

---

## Quick Reference — Build Order

```
Schema → Auth → Queries/Mutations → Hooks → UI → Polish
```

---

## Steps to Build This Project Again

1. `pnpm create next-app` — App Router, TypeScript, Tailwind
2. `npx convex dev` — initialize Convex
3. Install Better Auth as Convex component
4. Define schema with `v.string()` for auth IDs
5. Set up `ConvexClientProvider` with Better Auth
6. Build auth pages (login/signup)
7. Build CRUD mutations and queries (resolve image URLs in query)
8. Build hooks (`useCreateBlogPost`, `useUpdateBlogPost`)
9. Build UI with shadcn components
10. Add search with debounce
11. Add infinite scroll with `usePaginatedQuery`
12. Add presence with `@convex-dev/presence`
13. Add middleware for protected routes
14. Deploy to Vercel

---

## Do's and Don'ts

### DO
- Plan schema first — data structure changes break everything
- Set up auth early — everything depends on it
- Build one feature end-to-end before starting the next
- Read error messages fully before asking or googling
- Check docs for exact API syntax
- Commit often — before experiments, before resets

### DON'T
- Don't build UI before data layer works
- Don't copy code you don't understand
- Don't trust client-sent data for security checks
- Don't use `any` to silence TypeScript errors
- Don't use `forEach` when you need `break` or `continue`
- Don't return raw `storageId` — always resolve to URL

---

## Self-Reflection

### Strengths
- Picks things up fast
- Questions everything — leads to real understanding
- Good instincts for UX (debounce, skeletons, presence)
- Thinks about edge cases naturally

### To Improve
- Read error messages more carefully before asking
- Check docs first for exact API syntax
- Commit more often
- Plan architecture before coding

---

## Next Steps

### Week 1–2 — Solidify
- Rebuild this project from scratch without AI — just docs
- If you can do it in 3 days, you're ready to apply

### Month 1 — Fill Gaps
- **TypeScript** — learn it properly, stop guessing types
- **Git** — branching, stashing, rebasing
- **HTTP basics** — requests, status codes, headers, cookies
- **SQL + Prisma** — most PH companies use SQL, build one small project

### After That — Job Ready
- Deploy this project to Vercel
- Clean up GitHub + write README
- Build one more project — simpler stack (Next.js + Prisma + Neon)
- Apply

---

## Environment Variables

```env
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_BETTER_AUTH_URL=
BETTER_AUTH_SECRET=
```

---

> One project you can explain every line of beats five projects you half understand.
