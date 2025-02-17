import { useState, ChangeEvent, FormEvent } from "react";
import { useResetPasswordMutation } from "@/redux/features/authApiSlice";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
export default function useResetPassword() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    resetPassword(email)
      .unwrap()
      .then(() => {
        toast( { title:"Request sent",
          description: "check your email for reset link",
        });
      })
      .catch(() => {
        toast({
          title:"Uh oh! Something went wrong",
          description: "Please try again",
          variant: "destructive",
        });
        router.push("/login");
      });
  };

  return {
    email,
    isLoading,
    onChange,
    onSubmit,
  };
}
