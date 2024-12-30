import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { signInSchema } from "./lib/zod";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        // validate credentials
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error("Invalid credentials:", parsedCredentials.error.errors);
          return null;
        }

        const response = await axios.post(
          "http://127.0.0.1:8000/auth/register/",
          {
            email: credentials.email,
            password: credentials.password,
          }
        );

        if (response.data) {
          return response.data;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      if (pathname === "/") {
        return true;
      }

      if (pathname.startsWith("/auth/signin") && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return isLoggedIn;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
