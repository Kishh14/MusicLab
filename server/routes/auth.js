import jwt from "jsonwebtoken";
import { Router } from "express";
import { authMiddleware } from "../lib/utils.js";
import Room from "../models/Room.js";
import User from "../models/User.js";
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
    username: existingUser.username,
    email: existingUser.email,
    token: accessToken,
  });
});

// routes.js
router.post("/createroom", async (req, res) => {
  const { roomName, ownerName } = req.body;

  try {
    const newRoom = await Room.create({ roomName, ownerName, members: [ownerName] });
    return res.status(201).json(newRoom);
  } catch (error) {
    console.error("Error creating room:", error);
    return res.status(500).json({ error: "Failed to create room" });
  }
});

router.post("/rooms/:id/join", async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).send({ error: "Room not found" });
    }

    if (!room.members.includes(username)) {
      room.members.push(username);
      await room.save();
    }
    return res.send({ message: "Joined the room successfully" });
  } catch (error) {
    console.error("Error joining room:", error);
    return res.status(500).send({ error: "Failed to join room" });
  }
});



// Get all rooms
router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    return res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return res.status(500).json({ error: "Failed to fetch rooms" });
  }
});


// Update Room Name
// router.put("/rooms/:id", async (req, res) => {
//   const { id } = req.params;
//   const { newRoomName } = req.body;

//   try {
//     const room = await Room.findById(id);
//     if (!room) {
//       return res.status(404).json({ error: "Room not found" });
//     }

//     room.roomName = newRoomName;
//     await room.save();

//     return res.status(200).json({ message: "Room name updated successfully" });
//   } catch (error) {
//     console.error("Error updating room name:", error);
//     return res.status(500).json({ error: "Failed to update room name" });
//   }
// });


// to display the username of member who joined 
// router.get("/joinedmembers", async (req, res) => {
//   try {
//     // Find the room where the current user is the owner
//     const room = await Room.findOne({ ownerName: req.user.username });
    
//     if (!room) {
//       return res.status(404).json({ error: "Room not found" });
//     }

//     // Extract joined members from the room and prepare the response
//     const joinedMembers = room.members.map((mem) => ({
//       username: mem, 
      
//     }));

//     // Send the response with the joined members
//     return res.status(200).json(joinedMembers);
//   } catch (error) {
//     console.error("Error fetching joined members:", error);
//     return res.status(500).json({ error: "Failed to fetch joined members" });
//   }
// });


export default router;
