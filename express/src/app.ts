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

let users: { [key: string]: { lat: number; lng: number } } = {};

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("updateLocation", (data) => {
    console.log("Received location update:", data);
    users[socket.id] = data;
    io.emit("broadcastLocation", users);
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("broadcastLocation", users);
  });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

// ✅ FIX: Use server.listen instead of app.listen
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
