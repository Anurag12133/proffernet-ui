import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { signInSchema } from "./lib/zod";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt", // Use JWT for sessions
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
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
    async jwt({ token, user, account }) {
      if (user) {
        // Add user details and access token to the JWT token
        if (user.id) {
          token.id = user.id;
        }

        // For Credentials provider
        if (user.accessToken) {
          token.accessToken = user.accessToken;
          console.log("Credentials Access Token:", user.accessToken);
        }

        // For GitHub provider
        if (account?.access_token) {
          token.accessToken = account.access_token;
          console.log("GitHub Access Token:", account.access_token);
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Add access token to the session object
      session.accessToken = token.accessToken;

      // Log the access token for debugging
      console.log("Session Access Token:", token.accessToken);

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
