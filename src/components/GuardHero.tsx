import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import Image from 'next/image';
import { SpotLight } from 'three';
import SpotlightCard from './SpotlioghtCard';

interface GuardHeroProps {
  guardData: {
    name: string;
    id: string;
    shift: string;
    position: string;
    checkInDate: string;
    checkInStatus: string;
    lastSevenDays: boolean[];
    rating: number;
    reviews: Array<{
      text: string;
      author: string;
      location: string;
    }>;
  };
}

const GuardHero = () => {
  // Dummy data
  const guardData = {
    name: "Manjunath bkl",
    id: "911",
    shift: "night",
    position: "ganna",
    checkInDate: "14 Feb",
    checkInStatus: "yes",
    lastSevenDays: [true, true, false, true, true, true, false],
    rating: 4.5,
    reviews: [
      {
        text: "omg, this sucker is the goat!!!",
        author: "koushik",
        location: "flat 212"
      }
    ]
  };

  return (
    <div className="bg-white p-6 text-black min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="col-span-2 space-y-6">
          {/* Top Boxes */}
          <div className="grid grid-cols-2 gap-6">
            {/* Date and Check-in Box */}
            <div className="border border-gray-700 rounded-lg p-4 ">
              <div className="space-y-2 text-xl font-bold">
                <p>Date: {guardData.checkInDate}</p>
                <p>Checked in: {guardData.checkInStatus}</p>
              </div>
            </div>
            
            {/* Past 7 Days Box */}
            <div className="border border-gray-700 rounded-lg p-4 ">
              <p className="mb-2">past 7 days</p>
              <div className="flex space-x-2">
                {guardData.lastSevenDays.map((day, index) => (
                  <span key={index}>
                    {day ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="border border-gray-700 rounded-lg p-4  h-64">
            <p className="text-center mb-2">MAP</p>
            <p className="text-center text-sm text-gray-500">(realtime ye boka kidhar hai)</p>
          </div>

          {/* Bottom Boxes */}
          <div className="grid grid-cols-2 gap-6">
            {/* Rating Box */}
            <div className="border border-gray-700 rounded-lg p-4 ">
              <p className="text-lg mb-1">RATING</p>
              <p className="text-sm text-gray-500">(out of 5, not raat ka 6k)</p>
            </div>

            {/* Reviews Box */}
            <div className="border border-gray-700 rounded-lg p-4 ">
             
              <div className="space-y-2">
                <SpotlightCard />
              </div>
              <div className="flex justify-end mt-2">
                <span className="text-gray-500">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Guard Info */}
        <div className="space-y-4">
          <div className="border border-gray-700 rounded-full w-48 h-48 mx-auto overflow-hidden">
            <img 
              src="https://5.imimg.com/data5/SELLER/Default/2021/8/WE/EZ/TG/124413545/35181dc7-5f52-42ab-8d73-7d5caa9f7609-500x500.jpg" 
              alt="guard" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="items-center px-20 text-xl font-bold space-y-3">
            <p>name: {guardData.name}</p>
            <p>id: {guardData.id}</p>
            <p>shift: {guardData.shift}</p>
            <p>position: {guardData.position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardHero;