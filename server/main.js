import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";

import authRouter from "./routes/auth.js";
import { MONGO_URI, PORT } from "./constants.js";
import { Server } from "socket.io";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Start the server
server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

export { io };

import("./socket.io/index.js");
