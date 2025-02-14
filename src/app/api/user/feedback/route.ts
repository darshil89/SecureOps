import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  try {
    const { feedback, mail, guard } = await req.json();

    // Find the guard (receiver of the rating) using email
    const guardUser = await prisma.user.findUnique({
      where: { email: guard },
    });

    if (!guardUser) {
      return NextResponse.json({ error: "Guard not found" }, { status: 404 });
    }

    // Find the reviewer (user giving the feedback) using email
    const reviewerUser = await prisma.user.findUnique({
      where: { email: mail },
    });

    if (!reviewerUser) {
      return NextResponse.json(
        { error: "Reviewer not found" },
        { status: 404 }
      );
    }

    // Create a rating entry
    const rating = await prisma.rating.create({
      data: {
        guardId: guardUser.id,
        reviewerId: reviewerUser.id,
        rating: 5, // Assuming default rating, modify as needed
        comment: feedback,
      },
    });

    return NextResponse.json({ success: true, rating });
  } catch (error) {
    console.error("Error creating rating:", error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
