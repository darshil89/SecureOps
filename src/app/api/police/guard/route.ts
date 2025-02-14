import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/index";

export async function GET() {
  try {
    const sessions = await getServerSession(authOptions);

    if (!sessions) {
      return NextResponse.json({
        message: "Unauthorized",
        status: 401,
      });
    }

    const guards = await prisma.user.findMany({
      where: { role: "GUARD" },
    });

    return NextResponse.json(guards);
  } catch (error) {
    return NextResponse.json({
      message: "Error in finding guards",
      status: 500,
    });
  }
}
