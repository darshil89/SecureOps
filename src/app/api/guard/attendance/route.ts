import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/index";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";


export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  try {
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
      data: attendance,
      message: "Attendance Marked",
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      error: error,
    });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      return NextResponse.json({
        error: "You must be signed in to call this route",
      });
    }

    const attendance = await prisma.attendance.findFirst({
      where: {
        userId: session.user.id,
      },
    });
    return NextResponse.json({
      status: 200,
      data: attendance,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      error: error,
    });
  }
}
