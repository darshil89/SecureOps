import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const user = await prisma.user.findFirst({
      where: { id: data.id },
    });

    const attendance = await prisma.attendance.findMany({
      where: { userId: data.id },
    });
    console.log({ user: user, attendance: attendance });
    return NextResponse.json({ user: user, attendance: attendance });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Unexpected Server Error",
      status: 500,
    });
  }
}
