import mongoose from "mongoose";


const roomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    default: [],
  },
});

export default mongoose.model('Room', roomSchema);
