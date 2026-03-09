import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, PenLine, Search, Users, Zap } from "lucide-react";
import Link from "next/link";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { MarqueePost3D } from "./MarqueePost3d";
import { Suspense } from "react";
import Marquee3dSkeleton from "./Marquee3dSkeleton";

export default async function LandingPage() {
  const posts = preloadQuery(api.posts.getBlogPosts, { limit: 10 });
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="grid md:grid-cols-2  gap-12 md:gap-4  py-12">
        <div className="max-w-4xl mx-auto px-6 text-center md:text-left space-y-6">
          <Badge
            variant="outline"
            className="text-xs tracking-widest uppercase"
          >
            Open Publishing Platform
          </Badge>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-tight">
            Where Ideas Find <br />
            <span className="text-muted-foreground">Their Voice.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Write, publish, and share your stories with the world. Real-time
            presence, full-text search, and a community that listens.
          </p>
          <div className="flex gap-3 items-center justify-center md:justify-normal ">
            <Link href="/auth/login">
              <Button size="lg" className="gap-2">
                Start Writing <PenLine className="size-4" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" variant="outline" className="gap-2">
                Browse Stories <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
        <Suspense fallback={<Marquee3dSkeleton />}>
          <MarqueePost3D preloadedPosts={posts} />
        </Suspense>
      </section>

      <Separator />

      {/* Stats */}
      {/* <section className=" max-w-5xl mx-auto">
        <MarqueePosts posts={posts} />
      </section> */}

      <Separator />

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 py-20 space-y-10">
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Why Write Here
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            Everything you need to write.
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: <Users className="size-5" />,
              title: "Real-Time Presence",
              desc: "See who's reading your posts as it happens.",
            },
            {
              icon: <Search className="size-5" />,
              title: "Search & Discover",
              desc: "Full-text search across all stories instantly.",
            },
            {
              icon: <Zap className="size-5" />,
              title: "Rich Media",
              desc: "Upload images and format your story beautifully.",
            },
          ].map((f) => (
            <Card key={f.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3 flex flex-col text-center items-center justify-center md:text-left md:items-start md:justify-normal ">
                <div className="text-primary">{f.icon}</div>
                <h3 className="font-bold">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Mock posts */}
      {/* <section className="max-w-4xl mx-auto px-6 py-20 space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Featured Stories
          </p>
          <Link href="/blog">
            <Button variant="link" size="sm" className="gap-1 text-xs">
              View All <ArrowRight className="size-3" />
            </Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: "The Art of Saying Nothing With Infinite Words",
              author: "María R.",
              category: "Essay",
              big: true,
            },
            {
              title: "What Silicon Valley Got Wrong About Human Connection",
              author: "James P.",
              category: "Tech",
            },
            {
              title: "On Learning to Sit With Discomfort",
              author: "Aisha O.",
              category: "Life",
            },
            {
              title: "Why Your Morning Routine is Lying to You",
              author: "Tom K.",
              category: "Wellness",
            },
          ].map((post) => (
            <Card
              key={post.title}
              className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <CardContent className="p-5 space-y-2">
                <Badge variant="secondary" className="text-xs">
                  {post.category}
                </Badge>
                <h3 className="font-bold leading-snug">{post.title}</h3>
                <p className="text-xs text-muted-foreground">
                  By {post.author}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}
      {/* 
      <Separator /> */}

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center space-y-6">
        <h2 className="text-4xl font-extrabold tracking-tight">
          Ready to share your story?
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Every great writer was once a beginner with nothing but an empty page
          and something to say.
        </p>
        <Link href="/auth/login">
          <Button size="lg" className="gap-2">
            Begin Your Story <ArrowRight className="size-4" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-6 flex justify-between items-center text-xs text-muted-foreground">
        <span className="font-bold text-foreground">The Blog</span>
        <span>© 2024 · All rights reserved</span>
      </footer>
    </div>
  );
}
