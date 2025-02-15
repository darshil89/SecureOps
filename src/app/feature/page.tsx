import React from "react";
import { Shield, MapPin, Activity, Lock, CheckCircle, Clock, AlertTriangle, Star, Bell, Map, LayoutDashboard } from 'lucide-react';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
      {/* Hero Section with Animated Background */}
      <div className="relative pt-20 pb-32 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[length:20px_20px]"></div>
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-blue-600 bg-blue-50 rounded-full ring-1 ring-inset ring-blue-600/20">
            Security Management System
          </span>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Efficient Security Solutions
          </h1>
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300/70"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-br from-indigo-50 via-blue-50 to-white px-4 text-lg text-blue-600/90 font-medium">
                Secure • Reliable • Efficient
              </span>
            </div>
          </div>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            Revolutionizing urban security management with cutting-edge tracking,
            verification, and response mechanisms.
          </p>
        </div>
      </div>

      {/* Features Grid with Enhanced Design */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 transform skew-y-3"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
              Ready to Transform Your Security Management?
            </h2>
            <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
              Experience the next generation of security management solutions.
            </p>
            <div className="mt-10 flex justify-center gap-6">
              <button className="group relative px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl">
                Request Demo
                <div className="absolute inset-0 rounded-full border-2 border-white transform scale-110 opacity-0 group-hover:scale-105 group-hover:opacity-30 transition-all duration-300"></div>
              </button>
              <button className="px-8 py-4 text-white font-semibold border-2 border-white/20 rounded-full hover:bg-white/10 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: "Security Guard Database",
    description: "Maintain structured records of all security personnel, including details and deployment history.",
    icon: <Shield className="w-7 h-7" />,
  },
  {
    title: "Live Location Tracking",
    description: "Real-time GPS tracking of on-duty security personnel.",
    icon: <MapPin className="w-7 h-7" />,
  },
  {
    title: "Movement Tracking",
    description: "Monitor guards' actual movement and status changes on an interactive map.",
    icon: <Activity className="w-7 h-7" />,
  },
  {
    title: "Access Control",
    description: "Different roles with distinct permissions: Admin, Police, Society Owners, and Field Users.",
    icon: <Lock className="w-7 h-7" />,
  },
  {
    title: "Guard Verification",
    description: "Request and approve guard background verification to ensure safety.",
    icon: <CheckCircle className="w-7 h-7" />,
  },
  {
    title: "Attendance Monitoring",
    description: "Automated check-in/check-out tracking for better shift compliance.",
    icon: <Clock className="w-7 h-7" />,
  },
  {
    title: "Incident Reporting",
    description: "Instantly report security issues and notify the nearest available security personnel.",
    icon: <AlertTriangle className="w-7 h-7" />,
  },
  {
    title: "Performance System",
    description: "Rate security guards based on past performance for better duty assignments.",
    icon: <Star className="w-7 h-7" />,
  },
  {
    title: "Attendance Alerts",
    description: "Notify supervisors when a guard fails to check in or out.",
    icon: <Bell className="w-7 h-7" />,
  },
  {
    title: "Geo-Fencing",
    description: "Supervisors get alerts when a guard moves out of an assigned security zone.",
    icon: <Map className="w-7 h-7" />,
  },
  {
    title: "Live Dashboard",
    description: "A real-time dashboard that integrates security alerts and guard tracking in one view.",
    icon: <LayoutDashboard className="w-7 h-7" />,
  },
];

export default FeaturesPage;