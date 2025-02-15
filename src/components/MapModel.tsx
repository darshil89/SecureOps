"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";

// Ensure leaflet-routing-machine loads properly
import "leaflet-routing-machine";
import "leaflet-control-geocoder"; // Optional for geocoding

interface MapModalProps {
    user: {
        name: string;
        lat: number;
        lng: number;
        actualLat: number;
        actualLng: number;
    };
    onClose: () => void;
}

export default function MapModal({ user, onClose }: MapModalProps) {
    const actualPosition: [number, number] = [user.actualLat, user.actualLng];
    const currentPosition: [number, number] = [user.lat, user.lng];
    
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map("map").setView(actualPosition, 15);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapRef.current);
            
            // Define icons
            const actualIcon = new L.Icon({
                iconUrl: "/actual-location.png",
                iconSize: [32, 32],
            });

            const currentIcon = new L.Icon({
                iconUrl: "/current-location.png",
                iconSize: [32, 32],
            });

            import("leaflet-routing-machine").then(() => {
                L.Routing.control({
                    waypoints: [L.latLng(...actualPosition), L.latLng(...currentPosition)],
                    routeWhileDragging: true,
                    plan: new L.Routing.Plan(
                        [L.latLng(...actualPosition), L.latLng(...currentPosition)],
                        {
                            createMarker: (i, waypoint) => {
                                return L.marker(waypoint.latLng, {
                                    icon: i === 0 ? actualIcon : currentIcon,
                                }).bindPopup(i === 0 ? "📍 Expected Location" : "🚨 Current Position");
                            },
                        }
                    ),
                }).addTo(mapRef.current!);
            });
        }
    }, [actualPosition, currentPosition]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-[800px] h-[600px]"> {/* Increased size */}
                <h2 className="text-2xl font-bold mb-4 text-gray-800">User Location</h2>
                <p className="text-gray-600 mb-4">Tracking movement of: {user.name}</p>

                <div id="map" className="w-full h-[450px] mt-2 rounded-lg"></div> {/* Larger map */}

                <button onClick={onClose} className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg">
                    Close
                </button>
            </div>
        </div>
    );
}

