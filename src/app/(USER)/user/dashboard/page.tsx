"use client";
import React from "react";
import Link from "next/link";
import Maps from "@/components/ChatMap";

import { Bell, Building2, ArrowRight } from "lucide-react";

const User = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Alert Bento Box */}
          <Link
            href="/user/alert"
            className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-red-600" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Create Alert
              </h2>
              <p className="text-gray-600">
                Report incidents and create emergency alerts
              </p>
            </div>
            <div className="h-2 bg-gradient-to-r from-red-500 to-red-600" />
          </Link>

          {/* Agencies Bento Box */}
          <Link
            href="/user/agency"
            className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-indigo-600" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Agencies
              </h2>
              <p className="text-gray-600">View and manage security agencies</p>
            </div>
            <div className="h-2 bg-gradient-to-r from-indigo-500 to-indigo-600" />
          </Link>
        </div>
      </div>
      <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">🛡️ Guards Nearby 🚶‍♂️</h2>
              <div className="h-[400px] w-full rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <Maps />
              </div>
            </div>
    </div>
  );
};

export default User;
