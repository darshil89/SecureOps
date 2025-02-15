import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const requestBody = {
      id: "65b1234567890abcde123456",
      totalExperienceYears: 3,
      averageRating: 1.2,
      prevExperience: [{ workPlace: "XYZ Security Services" }],
    };

    const response = await fetch(
      "https://2dc9-34-125-110-148.ngrok-free.app/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from external API");
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
