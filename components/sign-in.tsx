"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

/**
 * Zod schema for Sign In form validation.
 *
 * Handles:
 * - Required fields
 * - Input trimming
 * - Password confirmation matching
 */
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

/**
 * SignInForm component.
 *
 * Renders a user log in form and handles
 * client-side validation and submission.
 *
 * @author Khant Loon Thu
 * @since  2026-01-28
 */
export function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Handles sign-in form submission.
   *
   * Calls the authentication client to sign in a user
   * and provides user feedback based on the result.
   */
  async function onSubmit(data: z.infer<typeof formSchema>) {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          toast.success("Signed in successfully.");
        },
        onError: (ctx) => {
          console.error("Sign in error:", ctx.error);
          toast.error(ctx.error.message ?? "Sign in failed.");
        },
      },
    );
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-in-form-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="sign-in-form-email"
                    aria-invalid={fieldState.invalid}
                    autoComplete="email"
                    placeholder="Enter your email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-in-form-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="sign-in-form-password"
                    aria-invalid={fieldState.invalid}
                    autoComplete="current-password"
                    type="password"
                    placeholder="Enter your password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field
          orientation="horizontal"
          className="flex flex-col items-start gap-4"
        >
          <div className="flex gap-4 items-center text-sm">
            <span>Do not have an account?</span>
            <Link
              href={"/sign-up"}
              className="text-blue-500 hover:text-blue-600"
            >
              Sign Up
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="sign-in-form"
              disabled={form.formState.isSubmitting}
              aria-busy={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Spinner className="size-6 mr-2" /> Signing in
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </Field>
      </CardFooter>
    </Card>
  );
}
