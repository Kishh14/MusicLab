import Room from "../models/Room.js";
import { Router } from "express";
import User from "../models/User.js";
import { authMiddleware } from "../lib/utils.js";

const router = Router();

// routes.js
router.post("/create", authMiddleware, async (req, res) => {
  const { roomName } = req.body;

  console.log("🚀 /room/create =>", req.body);

  try {
    const newRoom = new Room({
      name: roomName,
      owner: req.userId,
    });

    newRoom.members.push(req.userId);

    await newRoom.save();
    return res.status(201).json(await newRoom.populate("members", "-password"));
  } catch (error) {
    console.error("❌ Error creating room:", error);
    return res
      .status(500)
      .json({ error: true, message: "Failed to create room" });
  }
});

router.post("/:id/join", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.findById(id);
    if (!room) {
      return res //
        .status(404)
        .send({ error: true, message: "Room not found" });
    }

    if (!room.members.includes(req.userId)) {
      room.members.push(req.userId);
      await room.save();
    }

    return res.json(await room.populate("members", "-password"));
  } catch (error) {
    console.error("❌ Error joining room:", error);
    return res
      .status(500)
      .send({ error: true, message: "Failed to join room" });
  }
});

// Get all rooms
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const rooms = await Room.find().populate("members", "-password");
    return res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

// Update Room Name
// Only owner has the right to update the room name
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
