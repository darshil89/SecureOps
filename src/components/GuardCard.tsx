import React, { useState } from "react";
import FeedbackModal from "./FeedbackModal";

const GuardCard: React.FC<any> = ({ guard }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-between gap-4 p-3 border rounded-md shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={guard.image}
          alt={guard.name}
          className="w-12 h-12 rounded-full border"
        />
        <div>
          <h3 className="text-lg font-medium">{guard.name}</h3>
          <p className="text-sm text-gray-600">{guard.email}</p>
          <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded-md">
            {guard.role}
          </span>
        </div>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
      >
        Feedback
      </button>

      {isModalOpen && (
        <FeedbackModal guard={guard} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default GuardCard;
