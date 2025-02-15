"use client";
import Link from "next/link";
import Maps from "@/components/Maps";
import React, { useState } from "react";
import { useEffect } from "react";

const page = () => {
  const [guardData, setGuardData] = useState<
    Array<{
      id: number;
      name: string;
      email: string;
      phone: string;
      age: number;
      gender: string;
      address: string;
    }>
  >([]);
  const fetchGuardData = async () => {
    const response = await fetch("/api/agency", {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    });
    const resData = await response.json();

    setGuardData(resData);
  };
  useEffect(() => {
    fetchGuardData();
  }, []);
  const dummyGuardData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1-555-0123",
      age: 28,
      gender: "Male",
      address: "123 Main St, City",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1-555-0124",
      age: 32,
      gender: "Female",
      address: "456 Park Ave, Town",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1-555-0125",
      age: 35,
      gender: "Male",
      address: "789 Oak Rd, Village",
    },
  ];

  useEffect(() => {
    setGuardData(!guardData ? guardData : dummyGuardData);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Guard List</h2>
        <div className="bg-white shadow-lg rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Age
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Gender
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Address
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {guardData.map((guard: any) => (
                  <tr
                    key={guard.id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700 cursor-pointer">
                      <Link href={`/agency/guards/info/${guard.id.toString()}`}>
                        {" "}
                        {guard.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium cursor-pointer">
                      {guard.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 cursor-pointer">
                      {guard.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 cursor-pointer">
                      {guard.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 cursor-pointer">
                      {guard.age}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 cursor-pointer">
                      {guard.gender}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 cursor-pointer">
                      {guard.address}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 cursor-pointer">
                      <button className="px-2 py-1 text-sm text-white rounded-md bg-blue-500">
                        <Link href={`/agency/guards/attendance/${guard.id}`}>
                          Attendance
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Location Map</h2>
        <div className="h-[400px] w-full rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <Maps />
        </div>
      </div>
    </div>
  );
};

export default page;
