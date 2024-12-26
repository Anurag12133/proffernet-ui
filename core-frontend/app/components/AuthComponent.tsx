"use client";

import { useState } from "react";
import { FiGithub } from "react-icons/fi";

interface AuthFormProps {
  onSubmit: (email: string) => void;
}

export function AuthForm({ onSubmit }: AuthFormProps) {
  const [isSignIn, setIsSignIn] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="w-full max-w-[400px] rounded-lg border border-neutral-800 bg-neutral-950/50 text-white shadow-lg">
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-white text-black rounded-md font-medium hover:bg-neutral-200 transition-colors"
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
          <SocialButton icon={<FiGithub className="h-5 w-5" />} />
          <SocialButton icon={<GitlabIcon />} />
          <SocialButton icon={<BitbucketIcon />} />
        </div>
      </div>
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

function SocialButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="flex items-center justify-center p-2 border border-neutral-800 rounded-md bg-neutral-900 hover:bg-neutral-800 transition-colors">
      {icon}
    </button>
  );
}

function GitlabIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.94 13.11c-.5.48-.5 1.31 0 1.79l1.78 1.78c.13.13.22.29.24.47.03.47-.39.85-.85.85h-3.39c-.44 0-.85-.24-1.08-.62l-1.73-2.87c-.36-.6-1.07-.89-1.75-.89h-2.58c-.68 0-1.39.29-1.75.89l-1.73 2.87c-.23.38-.64.62-1.08.62h-3.39c-.46 0-.88-.38-.85-.85.02-.18.11-.34.24-.47l1.78-1.78c.5-.48.5-1.31 0-1.79l-1.78-1.78c-.13-.13-.22-.29-.24-.47-.03-.47.39-.85.85-.85h3.39c.44 0 .85.24 1.08.62l1.73 2.87c.36.6 1.07.89 1.75.89h2.58c.68 0 1.39-.29 1.75-.89l1.73-2.87c.23-.38.64-.62 1.08-.62h3.39c.46 0 .88.38.85.85-.02.18-.11.34-.24.47l-1.78 1.78z" />
    </svg>
  );
}

function BitbucketIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.92 2H3.08C2.48 2 2 2.48 2 3.08v17.84c0 .6.48 1.08 1.08 1.08h17.84c.6 0 1.08-.48 1.08-1.08V3.08C22 2.48 21.52 2 20.92 2zM7 17.5h-2v-7h2v7zm-1-8.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zM19 17.5h-2v-3.75c0-.69-.56-1.25-1.25-1.25s-1.25.56-1.25 1.25v3.75h-2v-7h2v1.09c.42-.63 1.15-1.09 2-1.09 1.66 0 3 1.34 3 3v3.91z" />
    </svg>
  );
}
