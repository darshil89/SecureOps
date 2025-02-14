import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client/";
import { authOptions } from "@/libs/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const sessions = await getServerSession(authOptions);

  const email = sessions?.user.email;

  const agency = await prisma.agency.findFirst({
    where: { email },
    include: { users: true },
  });

  if (!agency) {
    return NextResponse.json({
      message: "Error in finding agency",
      status: 500,
    });
  }
  return NextResponse.json(agency.users);
}
