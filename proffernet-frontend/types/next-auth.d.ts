import "next-auth";
import "next-auth/jwt";
import { User } from "next-auth";

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

export interface AuthenticatedUser extends User {
  accessToken?: string;
  refreshToken?: string;
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    accessToken?: string; // Add accessToken to JWT
  }
}
