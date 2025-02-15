import { NextResponse, NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    console.log(data);
    const guardData = await prisma.user.findUnique({
      where: { id: data.id },
      include: { ratingsReceived: true },
    });

    console.log(guardData);
    return new NextResponse(JSON.stringify(guardData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({
        message: "Unexpected Server Error",
        status: 500,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  }
}
