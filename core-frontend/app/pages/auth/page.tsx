"use client";

import { useState } from "react";
import { AuthForm } from "@/app/components/AuthComponent";
import { VerificationCode } from "@/app/components/Authverificationcomponent";
import logoSrc from "@/public/authlogo.svg";
import Image from "next/image";

export default function Home() {
  const [step, setStep] = useState<"email" | "verify">("email");
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep("verify");
  };

  const handleVerify = async (code: string) => {
    // TODO: Implement verification logic
    console.log("Verifying code:", code);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-black">
      <div className="w-full max-w-[400px] space-y-6">
        <div className="flex justify-center">
          <Image src={logoSrc} alt="Logo" width={100} height={100} />
        </div>
        {step === "email" ? (
          <AuthForm onSubmit={handleEmailSubmit} />
        ) : (
          <VerificationCode
            email={email}
            onVerify={handleVerify}
            onBack={() => setStep("email")}
          />
        )}
      </div>
    </main>
  );
}
