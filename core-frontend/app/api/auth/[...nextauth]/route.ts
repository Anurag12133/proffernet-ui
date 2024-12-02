import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import "@/app/constants/envConfig";

const clientId = process.env.GITHUB_CLIENT_ID || "Ov23liHT4Mrz0DOyBt4a";
const clientSecret =
  process.env.GITHUB_SECRET_KEY || "d4c675dc084f6ba600f9b65d5e743a34c8acbfb3";
const jwtSecret = process.env.JWT_SECRET || "your_security_key";
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: clientId as string,
      clientSecret: clientSecret as string,
    }),
  ],

  secret: jwtSecret,
};
const handler = NextAuth(authOptions);
console.log("GITHUB_CLIENT_ID:", process.env.GITHUB_CLIENT_ID);

export { handler as GET, handler as POST };
