'use client';

import React from 'react';
import { Star } from 'lucide-react';
import Maps from './Maps';

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
  // Dummy Data
  const guardData = {
    name:'Raju Chaurasia',
    id: '1234',
    shift: 'Night',
    position: 'Security Guard',
    checkInDate: '14 Feb',
    checkInStatus: 'Yes',
    rating: 4.5,
    reviews: [
      { text: 'Very responsible and punctual.', author: 'Alice', location: 'Flat 302' },
      { text: 'Great service, very professional.', author: 'Bob', location: 'Block A' },
    ],
  };

  return (
   
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      {/* Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 flex">
        {/* Left Side - Guard Details */}
        <div className="w-1/3 flex flex-col items-center border-r border-gray-300 p-4">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
            <img
              src="https://5.imimg.com/data5/SELLER/Default/2024/3/403143967/ZD/QN/SL/48639671/security-guard-uniform-1000x1000.jpg"
              alt="Guard"
              className="w-32 h-32 rounded-full"
            />
          </div>
          <p className="font-bold text-lg">{guardData.name}</p>
          <p className="text-gray-600 font-semibold ">ID: {guardData.id}</p>
          <p className="text-gray-600 font-semibold ">Shift: {guardData.shift}</p>
          <p className="text-gray-600 font-semibold ">Position: {guardData.position}</p>
        </div>

        {/* Right Side - Check-in, Ratings, and Reviews */}
        <div className="w-2/3 p-6">
          <div className="mb-4">
            <label className="text-gray-700 font-semibold">Date:</label>
            <p className="border p-2 rounded-md bg-gray-100">{guardData.checkInDate}</p>
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-semibold">Checked In:</label>
            <p className="border p-2 rounded-md bg-gray-100">{guardData.checkInStatus}</p>
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-semibold">Rating:</label>
            <div className="flex items-center space-x-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${i < Math.floor(guardData.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
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
      <div className="w-screen px-40 mt-6 mx-10">
        <div className="w-full h-64 border rounded-md shadow-md bg-gray-200 flex items-center justify-center">
          <Maps />
        </div>
      </div>

      {/* Map Section */}
     
    </div>
  );
};

export default GuardHero;
