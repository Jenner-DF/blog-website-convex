import CreateBlogPostForm from "@/components/web/CreateBlogPostForm";

export default function CreatePage() {
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
        <CreateBlogPostForm />
      </div>
    </div>
  );
}
