"use client";
import {
  formBlogPostSchema,
  updateFormBlogPostSchema,
} from "@/app/schemas/blog";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Id } from "../../../convex/_generated/dataModel";
import { useUpdateBlogPost } from "@/lib/hooks/use-update-post";
import { api } from "../../../convex/_generated/api";
import { FunctionReturnType } from "convex/server";

export default function UpdateBlogPostForm({
  post,
}: {
  post: FunctionReturnType<typeof api.posts.getBlogPostById>;
}) {
  const { mutation: updateBlogPost } = useUpdateBlogPost(post);
  const [preview, setPreview] = useState<string | null>(null);
  const [body, setBody] = useState(post.body);
  const [title, setTitle] = useState(post.title);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      postId: post._id,
      title: title,
      body: body,
      image: undefined as File | undefined,
    },

    validators: { onSubmit: updateFormBlogPostSchema },
    onSubmit: ({ value: { title, body, image, postId } }) => {
      const promise = updateBlogPost({
        postId,
        title,
        body,
        image,
      });
      //this will not run twice! but will only listen
      toast.promise(promise, {
        loading: "Updating your blog...",
        success: () => {
          return (
            <span>
              Your blog <strong>{title}</strong> has been updated!
            </span>
          );
        },
        error: () => "Failed to update blog",
      });

      return promise; // waits for the promise to finish = isSubmitting
    },
  });
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);
  // const image = useStore(form.store, (state) => state.values.image);

  return (
    // border border-dashed border-yellow-500
    <>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
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
                    onChange={(e) => {
                      setTitle(e.target.value);
                      field.handleChange(e.target.value);
                    }}
                    aria-invalid={isInvalid}
                    placeholder="Your blog title"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                    onChange={(e) => {
                      setBody(e.target.value);
                      field.handleChange(e.target.value);
                    }}
                    aria-invalid={isInvalid}
                    placeholder={"Your blog content here..."}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          {/* <form.Subscribe selector={(s) => s.values.image}>
                {(image) => {
                  const prevw = image ? URL.createObjectURL(image) : null;
                  return prevw ? (
                    <div className="relative w-full h-48 rounded-md overflow-hidden">
                      <Image
                        src={prevw}
                        alt="preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : null;
                }}
              </form.Subscribe> */}
          <form.Field name="image">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Image (optional)</FieldLabel>

                  {preview && (
                    <div className="relative w-full h-48 rounded-md overflow-hidden">
                      <Image
                        src={preview}
                        alt="preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  {/* {field.state.value && (
                        <div className="relative w-full h-48 rounded-md overflow-hidden">
                          <Image
                            src={URL.createObjectURL(field.state.value)}
                            alt="preview"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )} */}
                  <Input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    // onChange={(e) => {
                    //   const file = e.target.files?.[0];
                    //   console.log("before", e.target.value);
                    //   e.target.value = ""; // reset so same file triggers change
                    //   console.log("after", e.target.value);
                    //   setPreview(file ? URL.createObjectURL(file) : null);
                    //   field.handleChange(file);
                    // }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.handleChange(file);
                      setPreview(file ? URL.createObjectURL(file) : null);
                    }}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="my-4 ml-auto block w-full"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Update Post"
                )}
              </Button>
            )}
          </form.Subscribe>
        </FieldSet>
      </form>
    </>
  );
}
