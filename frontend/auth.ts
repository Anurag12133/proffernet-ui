import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { signInSchema } from "./lib/zod";
import axios from "axios";
import { AuthenticatedUser } from "./types/next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt", // Use JWT for sessions
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        // Validate the provided credentials
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error("Invalid credentials:", parsedCredentials.error.errors);
          return null;
        }

        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/auth/register/",
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          if (response.data) {
            // Assume `response.data` contains `user` and `accessToken`
            return {
              ...response.data.user, // Spread user details
              accessToken: response.data.accessToken, // Include accessToken
            };
          }
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: AuthenticatedUser;
      account: any;
      profile?: any;
    }) {
      if (account?.provider === "google") {
        const { accessToken, idToken } = account;

        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/social/login/google/",
            {
              access_token: accessToken,
              id_token: idToken,
            }
          );
          const { access_token } = response.data;
          user.accessToken = access_token;
          return true;
        } catch (error) {
          return false;
        }
      }
      return false;
    },
    async jwt({
      token,
      user,
      account,
      profile,
    }: {
      token: any;
      user: AuthenticatedUser;
      account: any;
      profile?: any;
    }) {
      if (user) {
        const { accessToken } = user;
        token.accessToken = accessToken;
      }
      return token;
    },
    async session({ session, user }) {
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
