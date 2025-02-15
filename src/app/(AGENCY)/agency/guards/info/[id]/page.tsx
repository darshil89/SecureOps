"use client";
import React, { useEffect, useState } from "react";
import { Star, MapPin, Clock, Calendar, Shield, Award } from "lucide-react";
import { StarRating } from "@/components/StarRating";
import { useParams } from "next/navigation";
import Maps from "@/components/Maps";
function App() {
  const [guard, setGuard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchGuardData = async () => {
      try {
        const response = await fetch("/api/agency/guard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: id }), // Replace with actual ID
        });
        const data = await response.json();
        setGuard(data);
      } catch (error) {
        console.error("Failed to fetch guard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!guard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">No guard data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-800">
            <div className="absolute -bottom-20 left-8">
              <div className="relative">
                <img
                  src={
                    guard.image ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop"
                  }
                  alt={guard.name}
                  className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg"
                />
                <div className="absolute bottom-4 right-4 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>
          <div className="pt-24 pb-6 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {guard.name}
                </h1>
                <div className="flex items-center gap-4 mt-2 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>{guard.role}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{guard.shift} Shift</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span>ID: {guard.id}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <StarRating rating={4.5} className="mb-2" />
                <span className="text-sm text-gray-500">
                  {guard.ratingsReceived.length} reviews
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Last Check-in</p>
                    <p className="text-sm text-gray-600">
                      {new Date(guard.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Current Location</p>
                    <p className="text-sm text-gray-600">
                      Main Entrance, Building A
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
              <div className="space-y-4">
                {guard.ratingsReceived.map((review: any, index: number) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <StarRating rating={review.rating} size={16} />
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-1" suppressHydrationWarning>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Maps />
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Map View
                </div>
              </div>
              <div className="mt-4">
                <p className="font-medium">Current Patrol Area</p>
                <p className="text-sm text-gray-600">Building A - Floor 1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
