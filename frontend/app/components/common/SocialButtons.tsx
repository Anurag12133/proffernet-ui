"use client";

import { ImGoogle, ImGithub } from "react-icons/im";
import { SocialButton } from "@/app/components/common";
import { continueWithGoogle, continueWithGithub } from "@/lib";

export default function SocialButtons() {
  return (
    <div className="flex justify-between items-center gap-2 ">
      <SocialButton provider="google" onClick={continueWithGoogle}>
        <ImGoogle className="ml-40" />
      </SocialButton>
      <SocialButton provider="github" onClick={continueWithGithub}>
        <ImGithub className="mr-3" />
      </SocialButton>
    </div>
  );
}
