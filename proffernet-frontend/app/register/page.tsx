import Link from "next/link";
import { RegisterForm } from "@/app/components/forms";
import type { Metadata } from "next";
import { RiVercelFill } from "react-icons/ri";

export const metadata: Metadata = {
  title: "Proffernet",
  description: "Welcome to proffernet",
};

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center px-6 lg:px-8 bg-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <RiVercelFill className="mx-auto h-10 w-auto text-white mb-5" />
        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign up for your account
        </h2>
      </div>

      <div className="relative flex justify-center items-center w-full mt-2">
        <div className="h-px w-[30%] bg-gradient-to-r from-transparent via-gray-600 to-transparent dark:via-white/[0.2] border-0 z-0" />
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm text-white">
        <RegisterForm />
       

        <p className="mt-5 text-center text-sm text-white">
          Already have an account?{" "}
          <Link
            href="/login"
            className="leading-6 text-white font-bold hover:text-blue-500"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
