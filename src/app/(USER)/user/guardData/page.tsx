"use client"; // Add this at the top

import React, { useEffect, useState } from "react";
import { Shield, Building2 } from "lucide-react";
import AgencyCard from "@/components/AgencyCard";

function Page() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/user/guardData", {
        headers: { "content-type": "application/json" },
        method: "GET",
      });
      const resData: any[] = await response.json();
      setData(resData);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Security Agencies
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {data.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No agencies found</p>
            </div>
          ) : (
            data.map((agency) => <AgencyCard key={agency.id} agency={agency} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
