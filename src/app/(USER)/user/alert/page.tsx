"use client";
import { useSession } from "next-auth/react";

import { useState } from "react";

const AlertNotification: React.FC = () => {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("Theft Alert");

  const alertOptions = [
    "Theft Alert",
    "Fire Hazard",
    "Medical Emergency",
    "Suspicious Activity",
    "Other",
  ];

  const handleSubmit = async () => {
    if (!session?.user?.email) {
      alert("User not authenticated");
      return;
    }

    const payload = {
      email: session.user.email,
      message,
      name: alertType,
    };

    const response = await fetch("/api/user/alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("Alert sent successfully!");
      setMessage("");
    } else {
      alert("Failed to send alert");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-xl font-semibold mb-4">Send Emergency Alert</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Alert Type
        </label>
        <select
          value={alertType}
          onChange={(e) => setAlertType(e.target.value)}
          className="w-full p-2 mt-1 border rounded-md"
        >
          {alertOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 mt-1 border rounded-md"
          rows={3}
          placeholder="Enter your alert message..."
        ></textarea>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
      >
        Send Alert
      </button>
    </div>
  );
};

export default AlertNotification;
