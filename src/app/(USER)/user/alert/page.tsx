"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  AlertTriangle,
  Send,
  AlertCircle,
  Flame,
  Heart,
  Shield,
  HelpCircle,
} from "lucide-react";

const AlertNotification: React.FC = () => {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("Theft Alert");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const alertOptions = [
    {
      value: "Theft Alert",
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "text-amber-600",
    },
    {
      value: "Fire Hazard",
      icon: <Flame className="w-5 h-5" />,
      color: "text-red-600",
    },
    {
      value: "Medical Emergency",
      icon: <Heart className="w-5 h-5" />,
      color: "text-rose-600",
    },
    {
      value: "Suspicious Activity",
      icon: <Shield className="w-5 h-5" />,
      color: "text-indigo-600",
    },
    {
      value: "Other",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "text-gray-600",
    },
  ];

  const currentAlert = alertOptions.find(
    (option) => option.value === alertType
  );

  const handleSubmit = async () => {
    if (!session?.user?.email) {
      alert("User not authenticated");
      return;
    }

    setIsSubmitting(true);

    try {
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
        // Show success message
        const successDiv = document.createElement("div");
        successDiv.className =
          "fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg transition-all duration-500";
        successDiv.innerHTML = `
          <div class="flex items-center">
            <AlertCircle class="w-5 h-5 mr-2" />
            <p>Alert sent successfully!</p>
          </div>
        `;
        document.body.appendChild(successDiv);
        setTimeout(() => {
          successDiv.remove();
        }, 3000);

        setMessage("");
      } else {
        throw new Error("Failed to send alert");
      }
    } catch (error) {
      alert("Failed to send alert");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Emergency Alert
              </h2>
            </div>

            <div className="space-y-6">
              {/* Alert Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alert Type
                </label>
                <div className="relative">
                  <select
                    value={alertType}
                    onChange={(e) => setAlertType(e.target.value)}
                    className="w-full p-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  >
                    {alertOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    {currentAlert?.icon}
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                  rows={4}
                  placeholder="Describe the emergency situation..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !message.trim()}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Alert</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Bottom Warning */}
          <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
            <div className="flex items-center gap-2 text-amber-700 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p>
                Please only use this form for genuine emergencies. False alerts
                may result in penalties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertNotification;
