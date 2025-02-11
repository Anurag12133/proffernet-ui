"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActivationMutation } from "@/redux/features/authApiSlice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"
import { Button } from "@/components/ui/button";
interface Props {
  params: {
    uid: string;
    token: string;
  };
}

export default function Page({ params }: Props) {
  const router = useRouter();
  const {toast} = useToast();
  const [activation] = useActivationMutation();

  useEffect(() => {
    const { uid, token } = params;

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
          description:"Failed to activate account",
          variant: "destructive",
        action: <ToastAction altText="Try again"><Button onClick={() => router.push("/login")}>Try again</Button></ToastAction> });
      })
      .finally(() => {
        router.push("/login");
      });
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black" >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Activating your account...
        </h1>
      </div>
    </div>
  );
}
