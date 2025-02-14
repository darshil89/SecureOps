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
        if (profile.email.startsWith("darshil.xic.11") === true) {
          console.log("your user email = ", profile.email);
          profile.role = Role.USER
        }
        else if (profile.email.endsWith("@gmail.com") === true) {
          console.log("your guard email = ", profile.email);
          profile.role = Role.GUARD
        }
        else if (profile.email.endsWith("@dsce.edu.in") === true) {
          console.log("your agency email = ", profile.email);
          profile.role = Role.AGENCY
        }
        // yahoo.com
        else {
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
          verified: profile.verified,
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
        token.verified = user.verified;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.role = token.role;
      session.user.id = token.id;
      session.user.emailVerified = token.emailVerified;
      session.user.verified = token.verified;
      return session;
    },
  },
};
