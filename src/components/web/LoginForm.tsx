"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm, useStore } from "@tanstack/react-form";
import z from "zod";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { formLoginSchema } from "@/app/schemas/auth";

export default function LoginForm() {
  const router = useRouter();
  // Get the callbackUrl, or default to home "/"
  const callbackUrl = useSearchParams().get("callbackUrl") || "/";

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: { onSubmit: formLoginSchema },
    onSubmit: async ({ value }: { value: z.infer<typeof formLoginSchema> }) => {
      await new Promise((resolve) => setTimeout(resolve, 5000));

      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
          rememberMe: true,
        },
        {
          onSuccess: (ctx) => {
            toast.success(`Welcome back ${ctx.data.user.name}!`);
            router.push(callbackUrl);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to sign in");
          },
        },
      );
    },
  });
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);

  return (
    <Card className="w-full max-w-md p-4 md:p-6">
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* Header */}
        <FieldLegend>Sign in</FieldLegend>
        <FieldDescription className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="font-medium text-primary underline-offset-4 hover:underline transition-all"
          >
            Sign up
          </Link>
        </FieldDescription>
        <FieldGroup>
          {/* Email Field */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Enter email"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Password Field */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="••••••••"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>

        <Button className="w-full " disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </Card>
  );
}
