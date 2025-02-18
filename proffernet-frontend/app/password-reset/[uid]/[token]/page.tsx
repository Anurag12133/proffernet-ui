"use client";

import { PasswordResetConfirmForm } from "@/app/components/forms";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Page() {
  const { uid, token } = useParams() as { uid?: string; token?: string };

  if (!uid || !token) {
    return <p className="text-white text-center">Invalid reset link</p>;
  }

  return (
    <div className="flex min-h-[calc(100vh-50px)] flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          src="/vercel.svg"
          alt="Proffernet"
          width={40} 
          height={40}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Reset your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <PasswordResetConfirmForm uid={uid} token={token} />
      </div>
    </div>
  );
}
