"use client";
import React, { useEffect, useState } from "react";
import AgencyCard from "@/components/AgencyCard";
const Page: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const response = await fetch("/api/user/guardData", {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    const resData: any[] = await response.json();
    setData(resData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Security Agencies</h1>
      <div className="grid grid-cols-1 gap-6">
        {data.map((agency) => (
          <AgencyCard key={agency.id} agency={agency} />
        ))}
      </div>
    </div>
  );
};

export default Page;
