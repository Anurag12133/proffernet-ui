"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FiGithub } from "react-icons/fi";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signInSchema } from "@/lib/zod";
import LoadingButton from "@/components/loading-button";
import {
  handleCredentialsSignin,
  handleGithubSignin,
} from "@/app/actions/authActions";
import { useState } from "react";
import ErrorMessage from "@/components/error-message";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const [globalError, setGlobalError] = useState<string>("");
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      const result = await handleCredentialsSignin(values);
      if (result?.message) {
        setGlobalError(result.message);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-black">
      <Card className="w-full max-w-md bg-background dark:border-white/[0.2] border-transparent border  ">
        <CardHeader>
          <div className="mb-10 items-center justify-center flex">
            <svg aria-label="Logo" fill="white" viewBox="0 0 75 65" height="50">
              <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
            </svg>
          </div>

          <CardTitle className="text-3xl font-bold text-center text-white ">
            Continue with Proffernet
          </CardTitle>
          <p className="text-white text-sm font-bold text-center">
            Create a Proffernet account to continue.
          </p>
        </CardHeader>
        <CardContent>
          {globalError && <ErrorMessage error={globalError} />}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 text-white"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="dark:border-white/[0.2] border-transparent border "
                        type="email"
                        placeholder="Enter email"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="dark:border-white/[0.2] border-transparent border "
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingButton pending={form.formState.isSubmitting} />
            </form>
          </Form>

          <span className="text-sm text-gray-500 text-center block my-2">
            or
          </span>
          <form className="w-full" action={handleGithubSignin}>
            <Button
              variant="outline"
              className="w-full bg-background text-white"
              type="submit"
            >
              <FiGithub className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
