import { Card, CardContent } from "@/components/ui/card";
import CreateBlogPostForm from "@/components/web/CreateBlogPostForm";
import { isAuthenticated } from "@/lib/auth-server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Create Post",
};
export default async function CreatePage() {
  const isLogin = await isAuthenticated();

  if (!isLogin) {
    redirect("/auth/login");
  }
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Create Post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Share your thoughts with the big world
        </p>
      </div>
      <div>
        <Card className="max-w-xl mx-auto p-8">
          <CardContent className="px-0">
            <CreateBlogPostForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
