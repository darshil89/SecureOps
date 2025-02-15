import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/index";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Gender } from "@prisma/client";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({
        error: "You must be signed in to call this route",
      });
    }

    const body = await req.json();

    console.log(body);

    const attendance = await prisma.attendance.create({
      data: {
        checkIn: body.checkIn,
        checkOut: body.checkOut || null,
        location: body.location,
        present: body.present,
        userId: session.user.id,
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Attendance Marked",
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      error: error,
    });
  }
}
