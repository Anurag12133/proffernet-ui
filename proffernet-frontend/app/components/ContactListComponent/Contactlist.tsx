"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaWhatsapp, FaPhone } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import axios from "axios";
import { useState, useEffect } from "react";
import { useToast } from "@/lib/use-toast";
import { ToastProvider } from "../ui/toast";
import { Toaster } from "../ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface SocialLinkProps {
  href?: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isButton?: boolean;
}

interface SocialDetails {
  username?: string;
  whatsapp_group_url?: string;
  linkedin_url?: string;
  github_url?: string;
  whatsapp_number?: string;
}

const ContactListComponent = ({ projectTitle }: { projectTitle: string }) => {
  const [socialDetails, setSocialDetails] = useState<SocialDetails | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false); // Track submission state
  const { toast } = useToast();

  const items = [
    { id: "code", label: "Code" },
    { id: "ui/ux", label: "UI/UX" },
    { id: "testing", label: "Testing" },
    { id: "design", label: "Design" },
    { id: "devops", label: "Devops" },
    { id: "non-code", label: "Non-code" },
  ] as const;

  const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  const handleCopyWhatsApp = async (number: string) => {
    if (number) {
      try {
        await navigator.clipboard.writeText(number);
        toast({
          title: "Copied",
          description: "WhatsApp number copied to clipboard",
          variant: "default",
        });
      } catch {
        toast({
          title: "Failed to copy",
          description: "Could not copy the WhatsApp number to clipboard.",
          variant: "default",
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!projectTitle) {
        setError("Project ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.BACKEND_URI}/app/social-details/project/?project_title=${encodeURIComponent(projectTitle)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        console.log("API Response:", response.data);
        setSocialDetails(response.data);
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.detail || "Error fetching social details");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectTitle]);

  const onSubmit = async () => {
    try {
      const data = await axios.post(
        `${process.env.BACKEND_URI}/project/contributions/create/`,
        {
          project_title: projectTitle,
          contribution_type: form.getValues("items"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setHasSubmitted(true); // Mark submission as complete
      setIsSheetOpen(true); // Open the sheet
    } catch (error) {
      console.error("Error submitting contribution:", error);
      toast({
        title: "Error",
        description: "Failed to submit contribution.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (error || !socialDetails) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-white">{error || "No social details found for this project."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full dark:bg-black to-background dark:bg-grid-small-white/[0.3] bg-grid-small-black/[0.3] text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-gray-500/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-gray-600/30 to-transparent rounded-full blur-3xl" />
      <div className="relative z-10">
        <main className="flex justify-center items-center min-h-screen">
          <div className="space-y-12 p-6 mb-[10rem] max-w-xl w-full">
            <h1 className="text-7xl font-sans font-bold text-start">
              {projectTitle}
            </h1>
            <h1 className="font-sans font-bold text-start text-m">Get in touch just click on the links below.</h1>
            {hasSubmitted ? (
              // After submission, show only the project title and a button to reopen the sheet
              <div className="grid grid-cols-2 gap-2 mt-10">
            {socialDetails.whatsapp_group_url && (
              <SocialLink
                href={socialDetails.whatsapp_group_url}
                icon={<FaWhatsapp className="w-6 h-6 text-green-500" />}
                label="WhatsApp"
              />
            )}
            {socialDetails.whatsapp_number && (
              <SocialLink
                icon={<FaPhone className="w-6 h-6 text-green-500" />}
                label="Phone"
                onClick={() => handleCopyWhatsApp(socialDetails.whatsapp_number!)}
                isButton={true}
              />
            )}
            {socialDetails.github_url && (
              <SocialLink
                href={socialDetails.github_url}
                icon={<FaGithub className="w-6 h-6" />}
                label="GitHub"
              />
            )}
            {socialDetails.linkedin_url && (
              <SocialLink
                href={socialDetails.linkedin_url}
                icon={<FaLinkedin className="w-6 h-6 text-blue-500" />}
                label="LinkedIn"
              />
            )}
          </div>
            ) : (
              // Before submission, show the contribution form
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Contribution</FormLabel>
                          <FormDescription>
                            Select the type of contribution you are interested in.
                          </FormDescription>
                        </div>
                        {items.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="items"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            )}
          </div>
        </main>
      </div>

      {/* Social Details Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="text-white">
          <SheetHeader>
            <SheetTitle>
              <div className="flex items-start gap-2 justify-start">
                <IoShareSocialSharp className="mt-1.5" size={25} />
                <div>
                  <p className="text-2xl font-bold ">Socials</p>
                </div>
              </div>
            </SheetTitle>
            <SheetDescription className="mt-10">
              Get in touch just click on the links below.
            </SheetDescription>
          </SheetHeader>
          <div className="grid grid-cols-2 gap-2 mt-10">
            {socialDetails.whatsapp_group_url && (
              <SocialLink
                href={socialDetails.whatsapp_group_url}
                icon={<FaWhatsapp className="w-6 h-6 text-green-500" />}
                label="WhatsApp"
              />
            )}
            {socialDetails.whatsapp_number && (
              <SocialLink
                icon={<FaPhone className="w-6 h-6 text-green-500" />}
                label="Phone"
                onClick={() => handleCopyWhatsApp(socialDetails.whatsapp_number!)}
                isButton={true}
              />
            )}
            {socialDetails.github_url && (
              <SocialLink
                href={socialDetails.github_url}
                icon={<FaGithub className="w-6 h-6" />}
                label="GitHub"
              />
            )}
            {socialDetails.linkedin_url && (
              <SocialLink
                href={socialDetails.linkedin_url}
                icon={<FaLinkedin className="w-6 h-6 text-blue-500" />}
                label="LinkedIn"
              />
            )}
          </div>
        </SheetContent>
      </Sheet>

      <ToastProvider>
        <Toaster />
      </ToastProvider>
    </div>
  );
};

// SocialLink Component
function SocialLink({ href, icon, label, onClick, isButton = false }: SocialLinkProps) {
  const commonClasses =
    "flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 ease-in-out dark:border-white/[0.2] border-transparent border transform hover:scale-105 bg-background cursor-pointer";

  if (isButton) {
    return (
      <button onClick={onClick} className={commonClasses}>
        <div className="rounded-full w-[1rem]">{icon}</div>
        <span className="text-white font-semibold">{label}</span>
      </button>
    );
  }

  return (
    <Link href={href || "#"} className={commonClasses}>
      <div className="rounded-full w-[1rem]">{icon}</div>
      <span className="text-white font-semibold">{label}</span>
    </Link>
  );
}

export default ContactListComponent;