"use client";

import { useState } from "react";
import { FiGithub } from "react-icons/fi";
import { FaGitlab } from "react-icons/fa6";
import { FaBitbucket } from "react-icons/fa";
import { VerificationCode } from "./Authverificationcomponent";
import { signIn } from "next-auth/react";

export function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSocialLogin = async (provider: string) => {
    try {
      await signIn(provider, {
        callbackUrl: window.location.origin,
      });
    } catch (error) {
      console.error("Social login error:", error);
      setError("Failed to authenticate. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP. Please try again.");
      }

      const data = await response.json();
      setSuccessMessage("OTP sent to your email!");
      setError("");
      setOtpSent(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
      setSuccessMessage("");
    }
  };

  const handleVerify = (code: string) => {
    console.log("OTP entered:", code);
  };

  const handleBack = () => {
    setOtpSent(false);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full max-w-[400px] rounded-lg border border-neutral-800 bg-neutral-950/50 text-white shadow-lg">
      {otpSent ? (
        <VerificationCode
          email={email}
          onVerify={handleVerify}
          onBack={handleBack}
        />
      ) : (
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-center">
              {isSignIn ? "Sign in to continue" : "Continue with Vercel"}
            </h2>
            {!isSignIn && (
              <p className="text-sm text-neutral-400 text-center">
                Create a Vercel account to sign up for v0.
              </p>
            )}
          </div>
          <form className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-white text-black rounded-md font-medium hover:bg-neutral-200 transition-colors"
              onClick={handleSubmit}
            >
              Continue with Email
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-neutral-950 px-2 text-neutral-400">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <SocialButton
              icon={
                <FiGithub
                  className="h-5 w-5"
                  onClick={() => {
                    handleSocialLogin("github");
                  }}
                />
              }
            />
            <SocialButton
              icon={<FaGitlab className="h-5 w-5 " />}
              className="bg-violet-400"
            />
            <SocialButton
              icon={<FaBitbucket className="h-5 w-5" />}
              className="bg-blue-600"
            />
          </div>
        </div>
      )}
      <div className="p-6 border-t border-neutral-800">
        <p className="w-full text-center text-sm text-neutral-400">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-white underline hover:text-neutral-200"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

function SocialButton({
  icon,
  className,
}: {
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`flex items-center justify-center p-2 border border-neutral-800 rounded-md bg-neutral-900 hover:bg-neutral-800 transition-colors ${
        className || ""
      }`}
    >
      {icon}
    </button>
  );
}
