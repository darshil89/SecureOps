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

    const user = await prisma.user.update({
        where: {
            email: session.user.email as string,
        },
        data: {
            phone: body.phone as string,
            address: body.address as string,
            adhar: body.adhar as string,
            gender: body.gender as Gender,
            age: body.age as string,
        }
    })
    return NextResponse.json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      error: "Something went wrong in updating the user",
    });
  }
}
