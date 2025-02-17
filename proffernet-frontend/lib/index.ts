import continueWithSocialAuth from "./social-auth";

export const continueWithGoogle = () =>
  continueWithSocialAuth("google-oauth2", "google");
export const continueWithGithub = () =>
  continueWithSocialAuth("github", "github");
