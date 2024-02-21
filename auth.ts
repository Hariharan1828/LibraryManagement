import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
export const authOptions: NextAuthOptions= {
    // Configure one or more authentication providers
    providers: [
    //   GithubProvider({
    //     clientId: process.env.GITHUB_ID,
    //     clientSecret: process.env.GITHUB_SECRET,
    //   }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
} satisfies NextAuthOptions