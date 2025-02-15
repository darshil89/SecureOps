import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/index";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const requestUrl = String(req.url);

    const id = requestUrl.replace(
      `http://localhost:3000/api/police/guard/`,
      ""
    );

    const guard = await prisma.user.update({
      where: {
        id,
      },
      data: {
        verified: true,
      },
    });

    return NextResponse.json({
      status: 200,
      data: guard,
      message: "Guard verified successfully",
    });
  } catch (error) {
    return NextResponse.json({
      error: "Something went wrong in verifying the guard",
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const requestUrl = String(req.url);

    const id = requestUrl.replace(
      `http://localhost:3000/api/police/guard/`,
      ""
    );

    const guard = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json({
      guard,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Something went wrong in finding the guard",
    });
  }
}
