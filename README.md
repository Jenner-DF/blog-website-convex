# 📝 The Blog

A full-stack blogging platform built with Next.js, Convex, and Better Auth.

## Stack

- **Next.js 16** — App Router, Server Components, Turbopack
- **Convex** — Realtime NoSQL database + file storage
- **Better Auth** — Authentication (as Convex component)
- **TanStack Form + Zod** — Form validation
- **Shadcn UI + Tailwind** — UI components

## Features

- 📖 Create, read, update, delete blog posts
- 🖼️ Image upload via Convex storage
- 💬 Comments with realtime updates
- 👀 Live presence — see who's reading a post
- 🔍 Full-text search with debounce
- ♾️ Infinite scroll pagination
- 🔒 Protected routes via middleware

## Getting Started

```bash
# Install dependencies
pnpm install

# Start Convex dev server
npx convex dev

# Start Next.js
pnpm dev
```

## Environment Variables

```env
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_BETTER_AUTH_URL=
BETTER_AUTH_SECRET=
```

## Project Structure

```
app/                  # Next.js pages
components/           # UI components
  web/blog/           # Blog-specific components
convex/               # Convex functions + schema
lib/                  # Auth client/server helpers + hooks
```
