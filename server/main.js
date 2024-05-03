import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRouter from "./routes/auth.js";
import { MONGO_URI, PORT } from "./constants.js";

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

// Routes
app.use("/auth", authRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
