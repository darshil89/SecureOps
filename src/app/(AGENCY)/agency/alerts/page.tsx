"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lazy load Leaflet to prevent SSR issues
const Map = dynamic(() => import("../../../../components/MapModel"), { ssr: false });

// Define User type
type User = {
    id: string;
    name: string;
    actualLat?: number;
    actualLng?: number;
    lat: number;
    lng: number;
};

const dummyOutOfZoneUsers: User[] = [
    { id: "1", name: "John Doe", actualLat: 22.7757952, actualLng: 86.1468294, lat: 22.7600000, lng: 86.1400000 },
];

export default function RadarScanner() {
    const [outOfZoneUsers, setOutOfZoneUsers] = useState<User[]>(dummyOutOfZoneUsers);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        // Simulate real-time updates
        const interval = setInterval(() => {
            setOutOfZoneUsers((prevUsers) => [...prevUsers]);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center pt-5 min-h-screen bg-gray-900 text-white">
            <h1 className="text-2xl font-bold mb-4">Scanning Location</h1>

            <RadarUI />
            <SecurityLog outOfZoneUsers={outOfZoneUsers} onUserSelect={setSelectedUser} />
            {selectedUser && <Map user={selectedUser} onClose={() => setSelectedUser(null)} />}
        </div>
    );
}

// Radar UI Component
const RadarUI = () => (
    <div className="relative w-80 h-80 flex items-center justify-center">
        <div className="absolute w-48 h-48 bg-green-500 rounded-full animate-drop1"></div>
        <div className="absolute w-48 h-48 bg-green-500 rounded-full animate-drop2"></div>
        <div className="absolute w-48 h-48 bg-green-500 rounded-full animate-drop3"></div>
        <style>{`
      @keyframes drop {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
      }
      .animate-drop1 { animation: drop 2s ease-out infinite; }
      .animate-drop2 { animation: drop 2s ease-out infinite 0.5s; }
      .animate-drop3 { animation: drop 2s ease-out infinite 1s; }
    `}</style>
    </div>
);

// Security Log Component
const SecurityLog = ({ outOfZoneUsers, onUserSelect }: { outOfZoneUsers: User[], onUserSelect: (user: User) => void }) => (
    <div className="mt-6 w-full max-w-xl bg-gray-800 p-4 rounded-lg border border-gray-700 text-green-400 font-mono text-sm h-80 overflow-y-auto">
        <h2 className="text-lg font-semibold text-white mb-2">📜 Security Log</h2>
        <div className="h-[1px] bg-gray-600 mb-2"></div>
        <ul>
            {outOfZoneUsers.length > 0 ? (
                outOfZoneUsers.map((user) => {
                    if (!user.actualLat || !user.actualLng) return null;
                    const distance = calculateDistance(user.actualLat, user.actualLng, user.lat, user.lng).toFixed(2);
                    return (
                        <li key={user.id} className="mb-2 cursor-pointer hover:text-green-300" onClick={() => onUserSelect(user)}>
                            [{new Date().toLocaleTimeString()}] ALERT: {user.name} moved **out of zone** (Lat: {user.lat}, Lng: {user.lng}) 🔴 **Distance Moved: {distance} km**
                        </li>
                    );
                })
            ) : (
                <p className="text-green-400">[{new Date().toLocaleTimeString()}] ✅ All users are within the zone.</p>
            )}
        </ul>
    </div>
);

// Function to calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
