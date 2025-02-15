"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import Maps from "./Maps";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { checkGeofence, getUserLocation } from "@/helpers/map";
import { markAttendance } from "@/helpers/backendConnect";
import { Attendance } from "@/types/guard";

interface GuardHeroProps {
  guardData: {
    name: string;
    id: string;
    shift: string;
    position: string;
    checkInDate: string;
    checkInStatus: string;
    rating: number;
    reviews: Array<{ text: string; author: string; location: string }>;
  };
}

const GuardHero: React.FC = () => {
  const { data, status } = useSession();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [attendance, setAttendance] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setIsSubmitted(true);

    if (attendance == "absent") {
      setIsSubmitted(true);
      return
    }

    setIsLoading(true)
    try {
      const userLocation = await getUserLocation()

      const isPresent = checkGeofence(userLocation)

      const d: Attendance = {
        checkIn: new Date().toLocaleDateString(),
        checkOut: new Date().setHours(new Date().getHours() + 12).toLocaleString(),
        location: "in position",
        present: isPresent
      }

      console.log(d)

      const response = markAttendance(d)

    } catch (error) {
      console.log("Error", error)
    }
    setIsLoading(false)
  };

  // Dummy Data
  const guardData = {
    shift: "Night",
    checkInDate: new Date().toLocaleDateString(),
    checkInStatus: false,
    rating: 4.5,
    reviews: [
      {
        text: "Very responsible and punctual.",
        author: "Alice",
        location: "Flat 302",
      },
      {
        text: "Great service, very professional.",
        author: "Bob",
        location: "Block A",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      {/* Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 flex">
        {/* Left Side - Guard Details */}
        <div className="w-1/3 flex flex-col items-center border-r border-gray-300 p-4">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
            <Image
              src={data?.user.image || "/guard.png"}
              alt="Guard"
              width={100}
              height={100}
              className="w-32 h-32 rounded-full"
            />
          </div>
          <p className="font-bold text-lg">{data?.user.name}</p>
          <p className="text-gray-600 font-semibold ">ID: {data?.user.id}</p>
          <p className="text-gray-600 font-semibold ">Shift: Night</p>
          <p className="text-gray-600 font-semibold ">
            Position: {data?.user.role}
          </p>
        </div>

        {/* Right Side - Check-in, Ratings, and Reviews */}
        <div className="w-2/3 p-6">
          <form action="submit" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-gray-700 font-semibold">Date:</label>
              <p className="border p-2 rounded-md bg-gray-100">
                {guardData.checkInDate}
              </p>
            </div>

            <div className="mb-4">
              <label className="text-gray-700 font-semibold">Checked In:</label>
              {/* // input the field (dropdown) to mark present or absent */}

              <div className="mb-4 flex items-center gap-2">
                <select
                  id="attendance"
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                  className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-gray-700 bg-white"
                  required
                >
                  <option value="absent">❌ Absent</option>
                  <option value="present">✅ Present</option>
                </select>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`px-4 py-2 rounded-lg font-semibold text-white transition ${isSubmitted ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {isLoading ? "Checking... " : "Submit"}
                </button>
              </div>

            </div>
          </form>

          <div className="mb-4">
            <label className="text-gray-700 font-semibold">Rating:</label>
            <div className="flex items-center space-x-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${i < Math.floor(guardData.rating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-semibold">Reviews:</label>
            <div className="space-y-2 mt-2">
              {guardData.reviews.map((review, index) => (
                <div key={index} className="border p-3 rounded-md bg-gray-100">
                  <p className="italic">"{review.text}"</p>
                  <div className="flex justify-between mt-2 text-gray-600 text-sm">
                    <p>- {review.author}</p>
                    <p>{review.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Map Section */}
      <div className="w-screen px-40 mt-6 mx-10">
        <div className="w-full flex flex-col border rounded-md shadow-md bg-slate-50 items-center justify-center">
          <h2 className="text-center text-lg font-semibold mb-4">Your Location</h2>
          <Maps />
        </div>
      </div>
    </div >
  );
};

export default GuardHero;
