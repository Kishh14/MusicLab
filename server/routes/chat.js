import express from 'express';
import Chat from '../models/Chat.js';
import User from "../models/User.js"
import Room from '../models/Room.js'

import { io } from "../main.js"

const router = express.Router();

router.post('/send' , async (req, res) => {
    try {
      const { roomId, text, senderId } = req.body;
      
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
      const sender = await User.findById(senderId);
      if (!sender) {
        return res.status(404).json({ message: 'Sender not found' });
      }
      const newMessage = {
        text,
        roomId,
        sender: senderId,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      //room.messages.(newMessage);
      const chat = new Chat(newMessage);
      await chat.save();
      //room.messages.push(newMessage);

      const result = await chat.populate('sender', 'username');

      // Broadcast the received message to all connected clients in the same room
      io.to(roomId).emit('message', result)
      
      res.json(result);
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ message: 'Failed to send message' });
    }
  });
  
 
router.get('/room/:roomId', async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const chat = await Chat.find({ roomId }).populate('sender', 'username'); // Populate sender's username
    if (!chat) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    res.json(chat);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});
  
  
export default router;
