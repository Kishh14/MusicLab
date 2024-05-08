import { Router } from "express";
import Room from "../models/Room.js";
import { authMiddleware } from "../lib/utils.js";

const router = Router();

// Route for getting messages for a specific room
router.get('/messages/:roomId', authMiddleware, async (req, res) => {
    try {
        const room = await Room.find({ room: req.params.roomId }).populate('sender');
        res.json(room);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route for sending a new message to a room
router.post('/messages/:roomId', authMiddleware, async (req, res) => {
    const { content } = req.body;
    const { roomId } = req.params;
    
    try {
        // Check if the room exists
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Create a new message
        const newRoom = new Room({
            room: roomId,
            sender: req.user.id, 
            content
        });

        // Save the message
        const savedMessage = await newRoom.save();

        res.status(201).json(savedMessage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
