import { PasswordResetConfirmForm } from "@/app/components/forms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proffernet | Password Reset Confirm",
  description: "Proffernet password reset confirm page",
};

interface Props {
  params: {
    uid: string;
    token: string;
  };
}

export default function Page({ params: { uid, token } }: Props) {
  return (
    <div className="flex min-h-[calc(100vh-50px)] flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black">


      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="/vercel.svg"
          alt="Proffernet"
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
