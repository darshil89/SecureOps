import express from "express";
import { Server } from "socket.io"; // Fix import
import cors from "cors";
import http from "http";

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const port = 5000;
app.use(cors());

let users: { [userId: string]: { lat: number; lng: number } } = {};

io.on("connection", (socket) => {  
    socket.on("updateLocation", ({ userId, lat, lng }) => {
      if (!userId) return; // Ignore if no userId provided
  
      console.log(`User ${userId} connected.`);
      users[userId] = { lat, lng }; // Update user location
      console.log(users);
      io.emit("broadcastLocation", users); // Broadcast updated locations
    });
  
    socket.on("disconnect", () => {
      // Optional: Remove user data on disconnect
      const disconnectedUser = Object.keys(users).find((id) => users[id].lat === null);
      if (disconnectedUser) delete users[disconnectedUser];
  
      io.emit("broadcastLocation", users); // Update clients
    });
  });

app.get("/", (req, res) => {
  res.send("Server is running");
});

// ✅ FIX: Use server.listen instead of app.listen
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
