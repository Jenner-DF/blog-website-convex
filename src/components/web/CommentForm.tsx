"use client";

import { Skeleton } from "../ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "@tanstack/react-form";
import z from "zod";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";
import { Field, FieldError } from "../ui/field";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

//TanStack requires defaultValues for every field — it's the source of truth for types, not the schema. React Hook Form's resolver pattern is cleaner for this.

const commentSchema = z.object({
  body: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(200, "Maximum 200 characters allowed"),
});
export default function CommentForm() {
  const { postId } = useParams<{ postId: Id<"posts"> }>();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const createComment = useMutation(api.comments.createComment);

  const form = useForm({
    defaultValues: {
      body: "",
    },
    validators: {
      onSubmit: commentSchema,
    },
    onSubmit({ value }) {
      const promise = createComment({ body: value.body, postId });
      toast.promise(promise, {
        loading: "Posting comment...",
        success: "Comment posted!",
        error: "Failed to post comment",
      });
      return promise; // ✅ isSubmitting stays true until done
    },
  });

  if (isPending)
    return (
      <div className="flex gap-3">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-8 flex-1" />
      </div>
    );

  if (!user) return null; //add a button redirect to login

  return (
    <div className="flex gap-3 items-start mt-8">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold shrink-0">
        {user.name[0].toUpperCase()}
      </div>

      <div className="w-full">
        {/* Comment input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="body">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <Textarea
                    className=" leading-relaxed w-full py-4  wrap-break-word resize-y"
                    // className="h-auto py-4 text-4xl md:text-5xl font-bold border-none shadow-none focus-visible:ring-0 px-0"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur} // Required for isTouched to work!
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder={"Your blog content here..."}
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
                className="my-4 ml-auto block"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}
