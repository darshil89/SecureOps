import React from 'react'

function page() {
  return (
    const dummyIncident = {
      id: "POL-2023-001",
      threatType: "Suspicious Activity",
      tags: ["Security Concern", "Urgent"],
      description: "I have seen an unidentified person roaming in the society corridors. The person has been observed for the last 30 minutes and seems to be taking pictures of the premises.",
      location: {
        coordinates: "19.0760° N, 72.8777° E",
        area: "Block A, 2nd Floor Corridor"
      }
    };

    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          {/* Header Section */}
          <div className="border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Incident Report</h1>
            <p className="text-gray-600">User ID: {dummyIncident.id}</p>
          </div>

          {/* Threat Classification */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-red-600">Threat Type: {dummyIncident.threatType}</h2>
            <div className="mt-2 flex gap-2">
              {dummyIncident.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Message Content */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Incident Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {dummyIncident.description}
            </p>
          </div>

          {/* Location Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Location Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Coordinates</p>
                <p className="font-medium">{dummyIncident.location.coordinates}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">{dummyIncident.location.area}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default page