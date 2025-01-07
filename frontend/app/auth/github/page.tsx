"use client";

import { useSocialAuthenticateMutation } from "@/redux/features/authApiSlice";
import { useSocialAuth } from "@/hooks";
import { Spinner } from "@/app/components/common";

export default function Page() {
  const [githubAuthenticate] = useSocialAuthenticateMutation();
  useSocialAuth(githubAuthenticate, "github");

  return (
    <div className="my-8">
      <Spinner lg />
    </div>
  );
}
