import React, { useState } from "react";
import { MessageSquare, User } from "lucide-react";
import FeedbackModal from "./FeedbackModal";

interface Guard {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
}

const GuardCard: React.FC<{ guard: Guard }> = ({ guard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 transition-all hover:bg-gray-100">
      <div className="flex items-center gap-4">
        {guard.image ? (
          <img
            src={guard.image}
            alt={guard.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <User className="w-6 h-6 text-indigo-600" />
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold text-gray-800">{guard.name}</h3>
          <p className="text-sm text-gray-600">{guard.email}</p>
          <span className="inline-block mt-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
            {guard.role}
          </span>
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
      >
        <MessageSquare className="w-4 h-4" />
        Feedback
      </button>

      {isModalOpen && (
        <FeedbackModal guard={guard} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default GuardCard;
