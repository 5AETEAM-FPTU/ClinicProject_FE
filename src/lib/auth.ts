// lib/auth/authOptions.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    idToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
          // response_type: "id_token token"
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", 
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  },
  
  callbacks: {
    async signIn({ account, profile }) {
        if (!profile?.email) {
          throw new Error('No profile');
        }
        return true;
      },
      async jwt({ token, account }) {
        if (account?.provider === "google") {
          token.idToken = account.id_token as string;
        }
        return token;
      },
      async session({ session, token }) {
        if (token?.idToken) {
          session.idToken = token.idToken as string;
        }
        return session;
      },
      
  },
};
