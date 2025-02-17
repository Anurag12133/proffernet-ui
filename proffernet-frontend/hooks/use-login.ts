import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/features/authApiSlice";
import { setAuth } from "@/redux/features/authSlice";
import { useToast } from "@/hooks/use-toast";

export default function useLogin() {
  const {toast} = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login({ email, password })
      .unwrap()
      .then((response) => {
        // Extract and store tokens
        if (response?.access && response?.refresh) {
          localStorage.setItem("accessToken", response.access);
          localStorage.setItem("refreshToken", response.refresh);
        } else {
          console.warn("Tokens not found in the response");
        }

        dispatch(setAuth());
        toast({
          title: "Success",
          description: "Logged in successfully",
          variant: "default"
        });
        router.push("/pages/category");
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Login failed",
          variant: "default"
        });
      });
  };

  return {
    email,
    password,
    isLoading,
    onChange,
    onSubmit,
  };
}
