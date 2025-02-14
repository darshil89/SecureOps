import { Gender } from "@prisma/client";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;
type CustomType = Date | null;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    emailVerified: CustomType;
    accessToken: string!;
    role: string;
    verified: boolean;
    // optionals for other custom fields
    age?: number;
    address?: string;
    adhar?: string;
    phone?: string;
    gender?: Gender;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      emailVerified: CustomType;
      role: string;
      verified: boolean;
      // optionals for other custom fields
      age?: number;
      address?: string;
      adhar?: string;
      phone?: string;
      gender?: Gender;
    };
  }

  interface User {
    emailVerified: CustomType;
    role: string;
    verified: boolean;
    // optionals for other custom fields
    age?: number;
    address?: string;
    adhar?: string;
    phone?: string;
    gender?: Gender;
  }
}
