"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Shield,
} from "lucide-react";

interface Guard {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  address: string;
}

const Page = () => {
  const [guardData, setGuardData] = useState<Guard[]>([]);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<{ [key: number]: any }>({});
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchGuardData = async () => {
      try {
        const response = await fetch("/api/agency", {
          headers: { "content-type": "application/json" },
          method: "GET",
        });
        if (!response.ok) throw new Error("Failed to fetch data");
        const resData = await response.json();
        setGuardData(resData);
      } catch (error) {
        console.error("Error fetching guard data:", error);
      }
    };
    fetchGuardData();
  }, []);

  const generateSuggestion = async (guardId: number) => {
    if (suggestions[guardId]) {
      setExpandedCard(expandedCard === guardId ? null : guardId);
      return;
    }

    setLoading((prev) => ({ ...prev, [guardId]: true }));

    // Simulate a brief loading delay
    const response = await fetch("/api/agency/suggestions", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ id: guardData[guardId] }),
    });

    const resData = await response.json();

    setSuggestions((prev) => ({ ...prev, [guardId]: resData }));
    setExpandedCard(guardId);
    setLoading((prev) => ({ ...prev, [guardId]: false }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Security Guards</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guardData.map((guard) => (
            <div
              key={guard.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {guard.name}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      ID: {guard.id}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{guard.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{guard.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Age: {guard.age} • {guard.gender}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{guard.address}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => generateSuggestion(guard.id)}
                    className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                  >
                    {loading[guard.id] ? (
                      <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Briefcase className="w-4 h-4" />
                    )}
                    <span>View Suggested Position</span>
                    {expandedCard === guard.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {expandedCard === guard.id && suggestions[guard.id] && (
                    <div className="mt-4">
                      <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                        <div className="flex items-center gap-2 text-indigo-800">
                          <Briefcase className="w-5 h-5" />
                          <p className="font-medium">
                            {suggestions[guard.id].predicted_bestSuitedFor}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Link href={`/agency/guards/info/${guard.id}`}>
                      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                        Details
                      </button>
                    </Link>
                    <Link href={`/agency/guards/attendance/${guard.id}`}>
                      <button className="w-full px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors">
                        Attendance
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
