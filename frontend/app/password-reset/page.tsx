import { PasswordResetForm } from "@/app/components/forms";
import type { Metadata } from "next";
import { RiVercelFill } from "react-icons/ri";

export const metadata: Metadata = {
  title: "Proffernet | Password Reset",
  description: "Proffernet password reset page",
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6  lg:px-8 bg-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <RiVercelFill className="mx-auto h-10 w-auto text-white mb-5" />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Reset your password
        </h2>
      </div>

      <div className="relative flex justify-center items-center w-full mt-2">
        <div className="h-px w-[30%] bg-gradient-to-r from-transparent via-gray-600 to-transparent dark:via-white/[0.2] border-0 z-0" />
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <PasswordResetForm />
      </div>
    </div>
  );
}
