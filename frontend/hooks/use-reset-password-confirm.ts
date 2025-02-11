import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useResetPasswordConfirmMutation } from "@/redux/features/authApiSlice";
import { useToast } from "@/hooks/use-toast";

export default function useResetPasswordConfirm(uid: string, token: string) {
  const router = useRouter();
  const { toast } = useToast();

  const [resetPasswordConfirm, { isLoading }] =
    useResetPasswordConfirmMutation();

  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    resetPasswordConfirm({ uid, token, new_password, re_new_password })
      .unwrap()
      .then(() => {
        toast({
          title: "Password reset successful",
          description: "Please login to proceed further",
        });
        router.push("/login");
      })
      .catch(() => {
        toast({title:"Password reset failed",
          description: "Failed to reset password",
        });
        router.push("/login");
      });
  };

  return {
    new_password,
    re_new_password,
    isLoading,
    onChange,
    onSubmit,
  };
}
