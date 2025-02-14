"use client";
import GuardHero from "@/components/GuardHero";
import { Star } from "lucide-react";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Maps from "@/components/Maps";
function Page() {
  const { id } = useParams(); // Correct way to get dynamic params in App Router

  const [data, setData] = useState<any>({});
  const fetchData = async () => {
    const response = await fetch("/api/agency/guard", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ id: id }),
    });
    const resData = await response.json();
    console.log(resData);
    setData(resData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
        <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 flex">
          <div className="w-1/3 flex flex-col items-center border-r border-gray-300 p-4">
            <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
              <Image
                src={data.image || "/guard.png"}
                alt="Guard"
                width={100}
                height={100}
                className="w-32 h-32 rounded-full"
              />
            </div>
            <p className="font-bold text-lg">{data.name}</p>
            <p className="text-gray-600 font-semibold ">ID: {data.id}</p>
            <p className="text-gray-600 font-semibold ">Shift: Night</p>
            <p className="text-gray-600 font-semibold ">
              Position: {data.role}
            </p>
          </div>

          <div className="w-2/3 p-6">
            <div className="mb-4">
              <label className="text-gray-700 font-semibold">Date:</label>
              <p className="border p-2 rounded-md bg-gray-100">
                {data.checkInDate}
              </p>
            </div>

            <div className="mb-4">
              <label className="text-gray-700 font-semibold">Checked In:</label>
              <p className="border p-2 rounded-md bg-gray-100">
                {data.checkInStatus}
              </p>
            </div>

            <div className="mb-4">
              <label className="text-gray-700 font-semibold">Rating:</label>
              <div className="flex items-center space-x-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(4.5) ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-gray-700 font-semibold">Reviews:</label>
              <div className="space-y-2 mt-2">
                {data?.ratingsReceived?.map((review: any, index: number) => (
                  <div
                    key={index}
                    className="border p-3 rounded-md bg-gray-100"
                  >
                    <p className="italic">"{review.comment}"</p>
                    <div className="flex justify-between mt-2 text-gray-600 text-sm"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-screen px-40 mt-6 mx-10">
          <div className="w-full h-64 border rounded-md shadow-md bg-gray-200 flex items-center justify-center">
            <Maps />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
