"use client";
import { formBlogPostSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FieldLabel,
  FieldError,
  Field,
  FieldSet,
  FieldLegend,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, useStore } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { api } from "../../../convex/_generated/api";

export default function CreateBlogPostForm() {
  const createBlogPost = useMutation(api.posts.createBlogPost);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
    validators: { onSubmit: formBlogPostSchema },
    onSubmit: ({ value: { title, body } }) => {
      const promise = createBlogPost({ title, body });
      //this will not run twice! but will only listen
      toast.promise(promise, {
        loading: "Creating blog...",
        success: () => {
          router.push("/blog");
          return (
            <span>
              Your blog <strong>{title}</strong> has been created!
            </span>
          );
        },
        error: () => "Failed to create blog",
      });

      return promise; // ✅ THIS IS THE KEY
    },
  });
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);

  return (
    // border border-dashed border-yellow-500
    <>
      <Card className="max-w-xl mx-auto p-8">
        <CardContent className="px-0">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldSet>
              <FieldLegend>Create Blog Article </FieldLegend>
              <FieldDescription> Create a new blog article</FieldDescription>
            </FieldSet>
            <FieldSet>
              <form.Field name="title">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                      <Input
                        className="h-auto  py-4 text-4xl font-bold md:text-xl"
                        // className="h-auto py-4 text-4xl md:text-5xl font-bold border-none shadow-none focus-visible:ring-0 px-0"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur} // Required for isTouched to work!
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Your blog title"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              <form.Field name="body">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                      <Textarea
                        className="min-h-[300px] leading-relaxed w-full py-4 text-4xl wrap-break-word resize-y"
                        // className="h-auto py-4 text-4xl md:text-5xl font-bold border-none shadow-none focus-visible:ring-0 px-0"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur} // Required for isTouched to work!
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder={"Your blog content here..."}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              <Button className="w-full " disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating
                    Blog Post...
                  </>
                ) : (
                  "Create Post"
                )}
              </Button>
            </FieldSet>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
