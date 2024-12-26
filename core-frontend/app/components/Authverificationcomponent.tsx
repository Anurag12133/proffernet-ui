"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface VerificationCodeProps {
  email: string;
  onVerify: (code: string) => void;
  onBack: () => void;
}

export function VerificationCode({
  email,
  onVerify,
  onBack,
}: VerificationCodeProps) {
  const [otp, setOtp] = useState(["", "", "", ""]); // Changed back to 4 digits
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...otp];
    newCode[index] = value;
    setOtp(newCode);

    // Move to next input if value is entered
    if (value !== "" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const newCode = [...otp];
      newCode[index - 1] = "";
      setOtp(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyCode = async () => {
    const otpString = otp.join("");
    // Check if all digits are filled
    if (otp.some((digit) => digit === "")) {
      alert("Please fill in all digits");
      return;
    }

    try {
      console.log("Verifying OTP:", otpString);
      const response = await fetch("http://127.0.0.1:8000/auth/verify/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: otpString,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Verification failed. Please try again."
        );
      }

      router.push("/pages/selection");
      console.log("Verification response:", data);
      onVerify(otpString);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="w-full max-w-[400px] rounded-lg border border-neutral-800 bg-neutral-950/50 text-white shadow-lg">
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-center">
            Continue with Vercel
          </h2>
          <p className="text-sm text-neutral-400 text-center">
            Create a Vercel account to sign up for v0.
          </p>
          <p className="text-sm text-neutral-400 text-center mt-4">
            {`If you don't have an account yet, we have sent a code to ${email}. Enter it below`}
          </p>
        </div>
        <div className="flex space-x-2 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className="w-12 h-12 text-center text-2xl border border-neutral-600 bg-neutral-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        <div className="flex justify-between space-x-4">
          <button
            onClick={onBack}
            className="px-4 py-2 text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 "
          >
            ← Back
          </button>
          <button
            onClick={verifyCode}
            className="px-4  bg-white text-black h-6 font-bold mt-2 text-sm  rounded hover:bg-gray-200 transition-colors"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
