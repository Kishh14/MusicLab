import jwt from "jsonwebtoken";
import User from "../models/User.js";

import { Router } from "express";
import { authMiddleware } from "../lib/utils.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../constants.js";

const router = Router();

// Verify the user
router.get("/verify", authMiddleware, (req, res) => {
  return res.send({ success: true });
});

// Register
router.post("/register", async (req, res) => {
  console.log("/register =>", req.body);
  const { email, username, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(400)
      .send({ error: true, message: "User already exists" });
  }

  const newUser = new User({ email, username, password });
  await newUser.save();
  res.status(201).send({ message: "User registered successfully" });
});

// Login
router.post("/login", async (req, res) => {
  console.log("/login =>", req.body);
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res
      .status(404)
      .send({ error: true, message: "The user does not exist" });
  }

  if (existingUser.password !== password) {
    return res.status(401).send({ error: true, message: "Invalid Password" });
  }

  const accessToken = jwt.sign(
    { email, userId: existingUser._id },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return res.send({
    id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
    token: accessToken,
  });
});

export default router;
