import express from "express";
import ViteExpress from "vite-express";

import mongoose from "mongoose";
import cors from "cors";
import http from "http";

import authRouter from "./routes/auth.js";
import roomsRouter from "./routes/rooms.js";
import chatRouter from "./routes/chat.js";

import { MONGO_URI, PORT, isDev } from "./constants.js";
import { Server } from "socket.io";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose //
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error.message));

// Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  transports: ["websocket", "polling"],
  maxHttpBufferSize: 1e8, // 100 MB we can upload to server (By Default = 1MB)
  pingTimeout: 60000, // increate the ping timeout
  cors: { origin: "*" },
});

// Routes
app.use("/auth", authRouter);
app.use("/room", roomsRouter);
app.use("/chat", chatRouter);

// Start the server
if (!isDev) {
  ViteExpress.bind(app, server);
}

server.listen(PORT, () => console.log(`Running on port ${PORT}`));

export { io };

// Import after exporting io
import("./socket.io/index.js");
