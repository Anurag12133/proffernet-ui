"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Github, Linkedin, PhoneIcon as WhatsApp } from "lucide-react";
import { useToast } from "@/lib/use-toast";
import { Toaster } from "../ui/toaster";
import { ToastProvider } from "@/app/components/ui/toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  whatsappGroupUrl: z.string().url({ message: "Please enter a valid URL" }),
  linkedinUrl: z.string().url({ message: "*" }),
  githubUrl: z.string().url({ message: "*" }),
  whatsappNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid phone number",
  }),
});

const API_URL = process.env.NEXT_PUBLIC_HOST;

export default function SocialDetailsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [existingData, setExistingData] = useState(null);
  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      whatsappGroupUrl: "",
      linkedinUrl: "",
      githubUrl: "",
      whatsappNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast({
          title: "Error",
          description: "Please login to save your social details",
          variant: "destructive",
        });
        return;
      }

      const payload = {
        whatsapp_group_url: values.whatsappGroupUrl,
        linkedin_url: values.linkedinUrl,
        github_url: values.githubUrl,
        whatsapp_number: values.whatsappNumber,
      };

      const method = existingData ? "PUT" : "POST";

      const response = await fetch(`${API_URL}/app/social-details/create/`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save social details");
      }

      const savedData = await response.json();
      setExistingData(savedData);

      toast({
        title: "Success",
        description: `Social details ${
          existingData ? "updated" : "created"
        } successfully`,
      });
      route.push("/pages/projectlist");
    } catch (error) {
      console.error("Error saving social details:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to save social details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-black to-background dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]">
      <div className="w-full max-w-md space-y-8 rounded-lg p-8">
        <div className="text-center">
          <h2 className="mt-6 text-6xl font-bold font-sans tracking-tight text-white mr-[12rem]">
            Socials
          </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="whatsappGroupUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-m font-medium text-white">
                    WhatsApp Group URL
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <WhatsApp className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="https://chat.whatsapp.com/..."
                        {...field}
                        className="pl-10 bg-background text-white dark:border-white/[0.2] border-transparent border"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-m font-medium text-white">
                    LinkedIn URL
                  </FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <div className="relative w-full">
                        <Linkedin className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="https://www.linkedin.com/in/..."
                          {...field}
                          className="pl-10 bg-background text-white dark:border-white/[0.2] border-transparent border"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-m font-medium text-white">
                    GitHub URL
                  </FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <div className="relative w-full">
                        <Github className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="https://github.com/..."
                          {...field}
                          className="pl-10 bg-background text-white dark:border-white/[0.2] border-transparent border"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsappNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-m font-medium text-white">
                    WhatsApp Number
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <WhatsApp className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="+1234567890"
                        {...field}
                        className="pl-10 bg-background text-white dark:border-white/[0.2] border-transparent border"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-background to-black dark:border-white/[0.2] border-transparent border text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </form>
        </Form>
        <ToastProvider>
          <Toaster/>
        </ToastProvider>
      </div>
    </div>
  );
}
