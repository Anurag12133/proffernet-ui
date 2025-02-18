"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useActivationMutation } from "@/redux/features/authApiSlice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const { uid, token } = useParams() as { uid?: string; token?: string };
  const [activation] = useActivationMutation();

  useEffect(() => {
    if (!uid || !token) {
      router.push("/login");
      return;
    }

    activation({ uid, token })
      .unwrap()
      .then(() => {
        toast({
          title: "Activation Complete",
          description: "Please login to proceed further",
        });
      })
      .catch(() => {
        toast({
          title: "Activation Failed",
          description: "Failed to activate account",
          variant: "destructive",
          action: (
            <ToastAction altText="Try again">
              <Button onClick={() => router.push("/login")}>Try again</Button>
            </ToastAction>
          ),
        });
      })
      .finally(() => {
        router.push("/login");
      });
  }, [activation, uid, token, router, toast]);

  return (
    <div className="flex min-h-[calc(100vh-50px)] flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Activating your account...
        </h1>
      </div>
    </div>
  );
}
