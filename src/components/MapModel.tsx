"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { io, Socket } from "socket.io-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Define types for user locations
interface UserLocation {
    lat: number;
    lng: number;
}

interface OutOfZoneUser extends UserLocation {
    userId: string;
    distance: number;
}

// Define props for the MapModal component
interface MapModalProps {
    user: {
        id: string;
        name: string;
        lat: number;
        lng: number;
        actualLat?: number;
        actualLng?: number;
    };
    onClose: () => void;
}

// Function to calculate distance using Haversine formula
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371000; // Radius of the Earth in meters
    const toRadians = (degree: number) => (degree * Math.PI) / 180;

    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
};

// Initialize socket connection
const socket: Socket = io("http://localhost:5000");

// Default Leaflet marker icon
const defaultMarker = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
});

export default function MapModal({ user, onClose }: MapModalProps) {
    const [userLocations, setUserLocations] = useState<{ [key: string]: UserLocation }>({});
    const [outOfZoneUsers, setOutOfZoneUsers] = useState<OutOfZoneUser[]>([]);
    const [distanceFromActual, setDistanceFromActual] = useState<number | null>(null);

    useEffect(() => {
        console.log("Initializing map for user:", user);

        // Emit location update for the user
        socket.emit("updateLocation", { userId: user.id, lat: user.lat, lng: user.lng });

        // Listen for updated locations
        socket.on("broadcastLocation", (locations: { [key: string]: UserLocation }) => {
            console.log("Received updated locations:", locations);
            setUserLocations(locations);
        });

        // Listen for users who are out of the defined zone
        socket.on("userOutOfZone", ({ userId, lat, lng, distance }: OutOfZoneUser) => {
            console.warn(`User ${userId} is out of zone! Distance: ${distance}m`);
            setOutOfZoneUsers((prev) => [...prev, { userId, lat, lng, distance }]);
        });

        // Calculate distance if actualLat & actualLng are provided
        if (user.actualLat !== undefined && user.actualLng !== undefined) {
            const calculatedDistance = calculateDistance(user.actualLat, user.actualLng, user.lat, user.lng);
            setDistanceFromActual(calculatedDistance);
        }

        // Cleanup socket listeners when component unmounts
        return () => {
            socket.off("broadcastLocation");
            socket.off("userOutOfZone");
        };
    }, [user]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-[800px] h-[600px]">
                <p className="text-gray-600 mb-4">Tracking movement of: {user.name}</p>

                {/* Show Distance from Actual Location */}
                {distanceFromActual !== null && (
                    <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
                        📍 Distance from Actual Location: <strong>{(distanceFromActual / 1000).toFixed(2)} km</strong>
                    </div>
                )}

                {/* Map Display */}
                <MapContainer center={[user.lat, user.lng]} zoom={15} className="w-full h-[450px] mt-2 rounded-lg">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {/* Ensure user marker is placed */}
                    <Marker position={[user.lat, user.lng]} icon={defaultMarker}>
                        <Popup>{user.name} (You)</Popup>
                    </Marker>

                    {/* Render other users */}
                    {Object.entries(userLocations).map(([id, { lat, lng }]) => (
                        <Marker key={id} position={[lat, lng]} icon={defaultMarker}>
                            <Popup>User {id}</Popup>
                        </Marker>
                    ))}

                    {/* Debug: Static marker for Bangalore (to check if markers load) */}
                    <Marker position={[12.9716, 77.5946]} icon={defaultMarker}>
                        <Popup>Static Marker in Bangalore</Popup>
                    </Marker>
                </MapContainer>

                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg">
                    Close
                </button>

                {/* Out of Zone Alert */}
                {outOfZoneUsers.length > 0 && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        <h3 className="font-bold">Users Out of Zone</h3>
                        {outOfZoneUsers.map(({ userId, distance }) => (
                            <p key={userId}>
                                🚨 User {userId} is **{(distance / 1000).toFixed(2)} km** outside the zone!
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
