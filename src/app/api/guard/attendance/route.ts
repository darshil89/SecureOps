import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/index";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Gender } from "@prisma/client";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({
        error: "You must be signed in to call this route",
      });
    }

    const body = (await req.json())

    console.log(body)

    // const user = await prisma.attendance.create({
    //     checkIn : body.checkIn
    // })
    return NextResponse.json({
      message: "Attendance Marked",
    });
  } catch (error) {
    return NextResponse.json({
      error: "Something went wrong in updating the user",
    });
  }
}
