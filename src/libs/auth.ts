import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Role } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../prisma/index";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        console.log("profile", profile);
        if (profile.email.endsWith("@outlook.com") === true) {
          console.log("your agency email = ", profile.email);
          profile.role = Role.AGENCY
        }
        if (profile.email.endsWith("@gmail.com") === true) {
          console.log("your guard email = ", profile.email);
          profile.role = Role.GUARD
        }
        if (profile.email.endsWith("@dsce.edu.in") === true) {
          console.log("your police email = ", profile.email);
          profile.role = Role.POLICE
        }
        if (profile.email.endsWith("@dsce.edu.in") === true) {
            console.log("your police email = ", profile.email);
            profile.role = Role.POLICE
          }
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified,
          role: profile.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, account, user, session }) {
      if (account) {
        token.accessToken = account.accessToken as string;
        token.id = user.id;
        token.emailVerified = user.emailVerified;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.role = token.role;
      session.user.id = token.id;
      session.user.emailVerified = token.emailVerified;
      return session;
    },
  },
};
