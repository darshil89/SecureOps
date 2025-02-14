import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const agenciesWithUsers = await prisma.agency.findMany({
      include: {
        users: true,
      },
    });

    return NextResponse.json(agenciesWithUsers);
  } catch (error) {
    return NextResponse.json({
      message: "Unexpected Server Error",
      status: 500,
    });
  }
}
