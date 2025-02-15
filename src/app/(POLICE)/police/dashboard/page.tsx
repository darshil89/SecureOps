
"use client";
import React from 'react'
import Logout from "../../../../components/auth/Logout"
import Link from 'next/link'


const Police = () => {
  const [incidents, setIncidents] = React.useState([
    {
      from: "darshilmahraur3@email.com",
      subject: "Theft Report",
      status: "Pending",
      received: "2024-01-15",
      time: "09:30:00"
    },
    {
      from: "devesh12@email.com",
      subject: "Vandalism",
      status: "Resolved",
      received: "2024-01-14",
      time: "14:15:00"
    },
    {
      from: "raqeebhaider23@email.com",
      subject: "Traffic Incident",
      status: "Pending",
      received: "2024-01-13",
      time: "16:45:00"
    }
    ]);

  return (
    <div className="min-h-screen bg-gray-100">
    
      {/* Main Content */}
      <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        {/* Table Header */}
        <div className="border-b px-6 py-4">
        <h2 className="text-xl font-medium">Incident Reports</h2>
        </div>

        {/* Table */}
        <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50">
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {incidents.map((incident, index) => (
          <tr key={index} className="hover:bg-gray-50 cursor-pointer">
            <td className="px-6 py-4 whitespace-nowrap"><Link href="/police/dashboard/incident">{incident.from}</Link></td>
            <td className="px-6 py-4">{incident.subject}</td>
            
            <td className="px-6 py-4 text-sm text-gray-500">{incident.received}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{incident.time}</td>
          </tr>
          ))}
        </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

export default Police