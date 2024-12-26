"use client";

import { useEffect, useRef, useState } from "react";

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
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent pasting multiple characters

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if value is entered
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // If all digits are filled, trigger verification
    if (
      newCode.every((digit) => digit !== "") &&
      newCode.join("").length === 6
    ) {
      onVerify(newCode.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      // Move to previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...code];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/[0-9]/.test(pastedData[i])) {
        newCode[i] = pastedData[i];
      }
    }

    setCode(newCode);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newCode.findIndex((digit) => digit === "");
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
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
            {`If you don't have an account yet, we have sent a code to ${email}. Enter it below.`}
          </p>
        </div>

        <div className="flex justify-center gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-10 h-12 text-center bg-neutral-900 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600"
              pattern="[0-9]*"
              inputMode="numeric"
            />
          ))}
        </div>

        <button
          onClick={onBack}
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
        >
          ← Back
        </button>
      </div>

      <div className="p-6 border-t border-neutral-800">
        <p className="w-full text-center text-sm text-neutral-400">
          Already have a Vercel account?{" "}
          <button className="text-white underline hover:text-neutral-200">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
