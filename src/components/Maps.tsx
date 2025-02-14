"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useSession } from "next-auth/react";

const socket = io("ws://localhost:5000", {
  transports: ["websocket"],
});

// Custom Marker Icon (Fixes Missing Marker Issue)
const customIcon = new L.Icon({
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Auto-center component
const MapAutoCenter = ({ location }: { location: { lat: number | null; lng: number | null } }) => {
  const map = useMap();

  useEffect(() => {
    if (location.lat !== null && location.lng !== null) {
      map.setView([location.lat, location.lng], map.getZoom(), { animate: true });
    }
  }, [location, map]);

  return null;
};

export default function LiveLocation() {
  const { data, status } = useSession(); // Get user session
  const userId = data?.user?.id; // Extract user ID

  const [location, setLocation] = useState<{ lat: number | null; lng: number | null }>({
    lat: null,
    lng: null,
  });

  const [users, setUsers] = useState<{ [key: string]: { lat: number; lng: number } }>({});

  useEffect(() => {
    if (!userId) return; // Do nothing if user is not logged in

    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          // Send userId with location update
          socket.emit("updateLocation", { userId, lat: latitude, lng: longitude });
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true, maximumAge: 0 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [userId]); // Ensure effect runs only when userId is available

  useEffect(() => {
    const handleBroadcast = (data: { [key: string]: { lat: number; lng: number } }) => {
      setUsers(data);
    };

    socket.on("broadcastLocation", handleBroadcast);

    return () => {
      socket.off("broadcastLocation", handleBroadcast);
    };
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-center text-lg font-semibold mb-4">Live Location Tracking</h2>
      <MapContainer
        center={location.lat !== null && location.lng !== null ? [location.lat, location.lng] : [20, 78]}
        zoom={15}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Auto-center map when location updates */}
        <MapAutoCenter location={location} />

        {/* Display user's own location */}
        {location.lat !== null && location.lng !== null && (
          <Marker position={[location.lat, location.lng]} icon={customIcon}>
            <Popup>You are here!</Popup>
          </Marker>
        )}

        {/* Display other users' locations */}
        {Object.entries(users).map(([id, user]) => (
          <Marker key={id} position={[user.lat, user.lng]} icon={customIcon}>
            <Popup>Guard: {data?.user.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
