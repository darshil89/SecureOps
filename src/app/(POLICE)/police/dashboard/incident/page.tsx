import React from "react";

const page = () => {
  const alertData = {
    location: "Kadma sonari link road",
    time: "February 15, 2025 | 02:45 AM IST",
    status: "Active",
    suspectDescription: "Male, approximately 5'9, wearing a black hoodie and jeans.",
    alertMessage: "Unauthorized access detected at SBI Bank ATM.",
    incidentID: "BRCH-9578-2025",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="bg-white p-6 rounded-lg shadow-xl border border-red-500 w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">🚨 Security Breach Alert 🚨</h1>
        <p className="text-gray-700 text-lg font-semibold">{alertData.alertMessage}</p>

        <div className="mt-4 p-4 border border-gray-300 rounded-lg text-gray-800 bg-gray-100 text-left">
          <p><strong>📍 Location:</strong> {alertData.location}</p>
          <p><strong>⏰ Time:</strong> {alertData.time}</p>
          <p><strong>🆔 Incident ID:</strong> {alertData.incidentID}</p>
          <p><strong>🚨 Status:</strong> <span className="text-red-600 font-bold">{alertData.status}</span></p>
          <p><strong>🕵️‍♂️ Suspect Description:</strong> {alertData.suspectDescription}</p>
        </div>

        <button className="mt-5 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
          Acknowledge Alert
        </button>
      </div>
    </div>
  );
};

export default page;
