import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    accessToken?: string; // Add accessToken to User
  }

  interface Session {
    user: User;
    accessToken?: string; // Add accessToken to Session
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    accessToken?: string; // Add accessToken to JWT
  }
}
