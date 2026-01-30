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
 * Zod schema for Sign Up form validation.
 *
 * Handles:
 * - Required fields
 * - Input trimming
 * - Password confirmation matching
 */
const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(50, "Name must be at most 50 characters."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

/**
 * SignUpForm component.
 *
 * Renders a user registration form and handles
 * client-side validation and submission.
 *
 * @author Khant Loon Thu
 * @since  2026-01-28
 */
export function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  /**
   * Handles sign-up form submission.
   *
   * Calls the authentication client to register a new user
   * and provides user feedback based on the result.
   */
  async function onSubmit(data: z.infer<typeof formSchema>) {
    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          toast.success("Signed up successfully.");
        },
        onError: (ctx) => {
          console.error("Sign up error:", ctx.error);
          toast.error(ctx.error.message ?? "Sign up failed.");
        },
      },
    );
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-form-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="sign-up-form-name"
                    aria-invalid={fieldState.invalid}
                    autoComplete="name"
                    placeholder="Enter your name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-form-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="sign-up-form-email"
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
                  <FieldLabel htmlFor="sign-up-form-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="sign-up-form-password"
                    aria-invalid={fieldState.invalid}
                    autoComplete="new-password"
                    type="password"
                    placeholder="Enter your password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-form-confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="sign-up-form-confirm-password"
                    aria-invalid={fieldState.invalid}
                    autoComplete="new-password"
                    type="password"
                    placeholder="Enter your confirm password"
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
            <span>Already have an account?</span>
            <Link
              href={"/sign-in"}
              className="text-blue-500 hover:text-blue-600"
            >
              Sign In
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
              form="sign-up-form"
              disabled={form.formState.isSubmitting}
              aria-busy={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Spinner className="size-6 mr-2" /> Signing up
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </Field>
      </CardFooter>
    </Card>
  );
}
