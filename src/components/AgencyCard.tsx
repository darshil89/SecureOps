import React from "react";
import { Building2 } from "lucide-react";
import GuardCard from "./GuardCard";

interface Agency {
  id: string;
  name: string;
  description: string;
  users: any[];
}

const AgencyCard: React.FC<{ agency: Agency }> = ({ agency }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Building2 className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">{agency.name}</h2>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {agency.description}
        </p>

        <div className="space-y-4">
          {agency.users.map((guard) => (
            <GuardCard key={guard.id} guard={guard} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgencyCard;
