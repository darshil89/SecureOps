import { Bodoni_Moda } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";
import { cache } from "react";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const emails = [
    "1ds23ic027@dsce.edu.in",
    "ashabkhan2000@gmai.com",
    "edgeshot2000@gmail.com",
  ];
  try {
    emails.map(async (email) => {
      const response = await fetch(
        "https://mailingservice-latest.onrender.com/api/sendEmail",
        {
          headers: { "content-type": "application/json" },
          method: "POST",

          body: JSON.stringify({
            email: email,
            message: data.message,
            name: data.name,
            cache: "no-cache",
          }),
        }
      );

      const resData = await response.json();
    });

    return NextResponse.json({
      message: "Email sent succesfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Unexpected Server Error",
      status: 500,
    });
  }
}
