import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/index";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Gender } from "@prisma/client";

export async function GET() {
  try {
    const response = await prisma.user.findMany({
      where: {
        role: "GUARD",
      },
    });

    return NextResponse.json({
      response,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Something went wrong in finding the guard",
    });
  }
}
