import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  const id = await req.json();
  try {
    const attendance = await prisma.attendance.findMany();
    console.log(attendance);
    console.log("bruh");
    return NextResponse.json(attendance);
  } catch (error) {
    return NextResponse.json({
      message: "Unexpected Server Error",
      status: 500,
    });
  }
}
