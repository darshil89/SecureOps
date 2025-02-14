import React from "react";
import GuardCard from "./GuardCard";
const AgencyCard: React.FC<any> = ({ agency }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
        {agency.name}
      </h2>
      <p className="text-sm text-gray-600">{agency.description}</p>
      <div className="mt-4 space-y-4">
        {agency.users.map((guard: any) => (
          <GuardCard key={guard.id} guard={guard} />
        ))}
      </div>
    </div>
  );
};

export default AgencyCard;
