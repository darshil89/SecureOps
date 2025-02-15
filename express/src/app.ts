import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const port = 5000;
app.use(cors());

let users: { [userId: string]: { lat: number; lng: number } } = {};

const centralZone = { lat: 22.7757952, lng: 86.1468294 };
const ZONE_RADIUS = 1000; // 2 km

// Helper function to calculate distance (Haversine formula)
const getDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => {
  const R = 6371e3; // Earth radius in meters
  const toRad = (degree: number) => (degree * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

io.on("connection", (socket) => {
  socket.on("sendMessage", ({ userId , guardId, message }) => {
    console.log(`user id - ${userId} , guard id - ${guardId}: ${JSON.stringify(message, null, 2)}`);
    io.emit(`${userId}-chat-${guardId}`, message);
  });
  socket.on("updateLocation", ({ userId, lat, lng }) => {
    if (!userId) return;

    users[userId] = { lat, lng };
    console.log(`User ${userId} updated location: ${lat}, ${lng}`);

    // Calculate distance from the central zone
    const distance = getDistance(lat, lng, centralZone.lat, centralZone.lng);

    if (distance > ZONE_RADIUS) {
      io.emit("userOutOfZone", { userId, lat, lng, distance });
    }

    io.emit("broadcastLocation", users);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
